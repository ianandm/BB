import { prisma } from "@/lib/prisma";
import { bookListInclude, mapBookToCatalog } from "@/lib/queries/mappers";

export async function getCartWithItems(cartId: string) {
  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    include: {
      items: {
        include: {
          book: { include: bookListInclude },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!cart) return null;

  const subtotal = cart.items.reduce(
    (sum, item) => sum + Number(item.unitPrice) * item.quantity,
    0,
  );

  return {
    ...cart,
    items: cart.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      unitPrice: Number(item.unitPrice),
      lineTotal: Number(item.unitPrice) * item.quantity,
      book: mapBookToCatalog(item.book),
    })),
    subtotal,
    itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
  };
}

export async function getOrCreateUserCart(userId: string) {
  let cart = await prisma.cart.findFirst({
    where: { userId, status: "ACTIVE" },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId, status: "ACTIVE", currency: "USD" },
    });
  }

  return cart;
}

export async function getOrCreateGuestCart(guestSessionId: string) {
  let cart = await prisma.cart.findFirst({
    where: { guestSessionId, status: "ACTIVE" },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { guestSessionId, status: "ACTIVE", currency: "USD" },
    });
  }

  return cart;
}

export async function addBookToCart(
  cartId: string,
  bookId: string,
  quantity = 1,
) {
  const book = await prisma.book.findUnique({
    where: { id: bookId, status: "ACTIVE" },
    select: { price: true },
  });

  if (!book) throw new Error("Book not found");

  return prisma.cartItem.upsert({
    where: { cartId_bookId: { cartId, bookId } },
    create: {
      cartId,
      bookId,
      quantity,
      unitPrice: book.price,
    },
    update: { quantity: { increment: quantity } },
  });
}

export async function findActiveGuestCart(guestSessionId: string) {
  return prisma.cart.findFirst({
    where: { guestSessionId, status: "ACTIVE" },
  });
}

/**
 * Replace the full contents of a cart in one transaction.
 * Prices are always re-read from the Book table — client prices are never trusted.
 * Unknown or non-ACTIVE book ids are silently dropped.
 */
export async function replaceCartItems(
  cartId: string,
  items: { bookId?: string; slug?: string; quantity: number }[],
) {
  const ids = items.map((i) => i.bookId).filter((v): v is string => Boolean(v));
  const slugs = items.map((i) => i.slug).filter((v): v is string => Boolean(v));

  const books =
    ids.length || slugs.length
      ? await prisma.book.findMany({
          where: {
            status: "ACTIVE",
            OR: [
              ...(ids.length ? [{ id: { in: ids } }] : []),
              ...(slugs.length ? [{ slug: { in: slugs } }] : []),
            ],
          },
          select: { id: true, slug: true, price: true },
        })
      : [];

  const byId = new Map(books.map((b) => [b.id, b]));
  const bySlug = new Map(books.map((b) => [b.slug, b]));

  // Resolve each client item to a real book, merging duplicates that resolve
  // to the same book (added by id on one page, by slug on another).
  const resolved = new Map<
    string,
    { bookId: string; unitPrice: number; quantity: number }
  >();
  for (const item of items) {
    const book =
      (item.bookId ? byId.get(item.bookId) : undefined) ??
      (item.slug ? bySlug.get(item.slug) : undefined);
    if (!book) continue;
    const existing = resolved.get(book.id);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      resolved.set(book.id, {
        bookId: book.id,
        unitPrice: book.price,
        quantity: item.quantity,
      });
    }
  }

  const validItems = [...resolved.values()];

  await prisma.$transaction([
    prisma.cartItem.deleteMany({ where: { cartId } }),
    ...(validItems.length
      ? [
          prisma.cartItem.createMany({
            data: validItems.map((item) => ({
              cartId,
              bookId: item.bookId,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
            })),
          }),
        ]
      : []),
  ]);

  return validItems.length;
}

export async function clearCart(cartId: string) {
  await prisma.cartItem.deleteMany({ where: { cartId } });
}

/**
 * Merge a guest cart into a user's cart (call after Clerk sign-in).
 * Quantities are summed for books present in both carts; the guest cart
 * is deleted afterwards (CartItem rows cascade).
 */
export async function mergeGuestCartIntoUserCart(
  guestSessionId: string,
  userId: string,
) {
  const guestCart = await prisma.cart.findFirst({
    where: { guestSessionId, status: "ACTIVE" },
    include: { items: true },
  });

  if (!guestCart) return getOrCreateUserCart(userId);

  const userCart = await getOrCreateUserCart(userId);

  for (const item of guestCart.items) {
    await prisma.cartItem.upsert({
      where: { cartId_bookId: { cartId: userCart.id, bookId: item.bookId } },
      create: {
        cartId: userCart.id,
        bookId: item.bookId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      },
      update: { quantity: { increment: item.quantity } },
    });
  }

  await prisma.cart.delete({ where: { id: guestCart.id } });

  return userCart;
}

export async function findActiveUserCart(userId: string) {
  return prisma.cart.findFirst({
    where: { userId, status: "ACTIVE" },
  });
}
