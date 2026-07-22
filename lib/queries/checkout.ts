import type Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { getCartWithItems } from "@/lib/queries/cart";
import type { CheckoutInput } from "@/lib/validations/checkout";

type LoadedCart = NonNullable<Awaited<ReturnType<typeof getCartWithItems>>>;

export type SnapshotItem = {
  bookId: string;
  title: string;
  author: string;
  coverImageUrl: string;
  quantity: number;
  unitPrice: number;
};

/** Returns titles of cart items with insufficient stock (empty = all good). */
export async function findOutOfStockItems(cart: LoadedCart) {
  const bookIds = cart.items.map((item) => item.book.id);
  const inventories = await prisma.inventory.findMany({
    where: { bookId: { in: bookIds } },
    select: { bookId: true, quantityAvailable: true },
  });
  const availableById = new Map(
    inventories.map((inv) => [inv.bookId, inv.quantityAvailable]),
  );

  return cart.items
    .filter(
      (item) => (availableById.get(item.book.id) ?? 0) < item.quantity,
    )
    .map((item) => item.book.title);
}

/**
 * Create the CheckoutSession row snapshotting items and amounts.
 * The id is generated first so it can be embedded in Stripe metadata,
 * and the Stripe session id (required + unique) is written in one go.
 */
export async function createCheckoutSessionRecord(params: {
  id: string;
  stripeSessionId: string;
  cart: LoadedCart;
  userId: string | null;
  input: CheckoutInput;
}) {
  const { id, stripeSessionId, cart, userId, input } = params;

  const itemsSnapshot: SnapshotItem[] = cart.items.map((item) => ({
    bookId: item.book.id,
    title: item.book.title,
    author: item.book.author,
    coverImageUrl: item.book.image,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
  }));

  return prisma.checkoutSession.create({
    data: {
      id,
      stripeSessionId,
      cartId: cart.id,
      userId,
      status: "PENDING",
      subtotalAmount: cart.subtotal,
      totalAmount: cart.subtotal, // updated with shipping at fulfillment
      currency: "USD",
      itemsSnapshot: JSON.parse(JSON.stringify({
        items: itemsSnapshot,
        contact: {
          email: input.email,
          phone: input.phone ?? null,
          name: input.name,
        },
        shippingAddress: {
          name: input.name,
          line1: input.line1,
          line2: input.line2 || null,
          city: input.city,
          state: input.state,
          zip: input.zip,
          country: "US",
        },
      })),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h
    },
  });
}

async function generateOrderNumber() {
  const year = new Date().getFullYear();
  for (let attempt = 0; attempt < 5; attempt++) {
    const suffix = String(Math.floor(Math.random() * 100000)).padStart(5, "0");
    const orderNumber = `BB-${year}-${suffix}`;
    const existing = await prisma.order.findUnique({
      where: { orderNumber },
      select: { id: true },
    });
    if (!existing) return orderNumber;
  }
  // Practically unreachable at this store's volume.
  return `BB-${year}-${Date.now().toString().slice(-8)}`;
}

/**
 * Convert a paid Stripe Checkout Session into an Order.
 * Idempotent: safe to call multiple times for the same Stripe session.
 * Returns the order (created now or previously).
 */
export async function fulfillCheckoutSession(
  stripeSession: Stripe.Checkout.Session,
) {
  const stripeSessionId = stripeSession.id;

  // Idempotency guard — Stripe retries webhooks.
  const session = await prisma.checkoutSession.findUnique({
    where: { stripeSessionId },
    include: { order: true },
  });
  if (!session) {
    throw new Error(`No CheckoutSession for Stripe session ${stripeSessionId}`);
  }
  if (session.order) {
    return { order: session.order, created: false };
  }

  const snapshot = session.itemsSnapshot as unknown as {
    items: SnapshotItem[];
    contact: { email: string; phone: string | null; name: string };
    shippingAddress: Record<string, string | null>;
  };

  const shippingAmount = (stripeSession.shipping_cost?.amount_total ?? 0) / 100;
  const totalAmount =
    (stripeSession.amount_total ?? Math.round(Number(session.subtotalAmount) * 100)) /
    100;
  const orderNumber = await generateOrderNumber();

  const order = await prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        orderNumber,
        userId: session.userId,
        checkoutSessionId: session.id,
        status: "PAID",
        subtotalAmount: session.subtotalAmount,
        shippingAmount,
        totalAmount,
        currency: "USD",
        customerEmail: snapshot.contact.email,
        customerName: snapshot.contact.name,
        customerPhone: snapshot.contact.phone,
        shippingAddressSnapshot: snapshot.shippingAddress,
        billingAddressSnapshot: snapshot.shippingAddress,
        placedAt: new Date(),
        items: {
          create: snapshot.items.map((item) => ({
            bookId: item.bookId,
            bookTitle: item.title,
            bookAuthor: item.author,
            coverImageUrl: item.coverImageUrl,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            totalPrice: item.unitPrice * item.quantity,
          })),
        },
      },
    });

    await tx.payment.create({
      data: {
        orderId: createdOrder.id,
        checkoutSessionId: session.id,
        provider: "STRIPE",
        providerPaymentIntentId:
          typeof stripeSession.payment_intent === "string"
            ? stripeSession.payment_intent
            : stripeSession.payment_intent?.id ?? null,
        amount: totalAmount,
        currency: "USD",
        status: "PAID",
        paidAt: new Date(),
      },
    });

    for (const item of snapshot.items) {
      await tx.inventory.update({
        where: { bookId: item.bookId },
        data: { quantityAvailable: { decrement: item.quantity } },
      });
    }

    await tx.orderStatusHistory.create({
      data: {
        orderId: createdOrder.id,
        fromStatus: null,
        toStatus: "PAID",
        note: "Payment completed via Stripe Checkout",
      },
    });

    await tx.checkoutSession.update({
      where: { id: session.id },
      data: { status: "COMPLETED", shippingAmount, totalAmount },
    });

    await tx.cart.update({
      where: { id: session.cartId },
      data: { status: "CONVERTED" },
    });

    return createdOrder;
  });

  return { order, created: true };
}

/** Record a Stripe webhook event exactly once; returns false if seen before. */
export async function recordPaymentEvent(event: Stripe.Event) {
  try {
    await prisma.paymentEvent.create({
      data: {
        provider: "STRIPE",
        providerEventId: event.id,
        eventType: event.type,
        payload: JSON.parse(JSON.stringify(event.data.object)),
        processedAt: new Date(),
      },
    });
    return true;
  } catch {
    // Unique violation on providerEventId → duplicate delivery.
    return false;
  }
}

/** Minimal safe order shape for the confirmation and lookup pages. */
export async function getOrderForCustomer(where: {
  stripeSessionId?: string;
  orderNumber?: string;
  email?: string;
}) {
  const order = await prisma.order.findFirst({
    where: where.stripeSessionId
      ? { checkoutSession: { stripeSessionId: where.stripeSessionId } }
      : {
          orderNumber: where.orderNumber,
          customerEmail: { equals: where.email, mode: "insensitive" },
        },
    include: {
      items: true,
      statusHistory: { orderBy: { createdAt: "asc" } },
    },
  });

  if (!order) return null;

  return {
    orderNumber: order.orderNumber,
    status: order.status,
    placedAt: order.placedAt,
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    subtotalAmount: Number(order.subtotalAmount),
    shippingAmount: Number(order.shippingAmount),
    totalAmount: Number(order.totalAmount),
    shippingAddress: order.shippingAddressSnapshot,
    items: order.items.map((item) => ({
      title: item.bookTitle,
      author: item.bookAuthor,
      coverImageUrl: item.coverImageUrl,
      quantity: item.quantity,
      unitPrice: Number(item.unitPrice),
      totalPrice: Number(item.totalPrice),
    })),
    history: order.statusHistory.map((entry) => ({
      status: entry.toStatus,
      at: entry.createdAt,
    })),
  };
}
