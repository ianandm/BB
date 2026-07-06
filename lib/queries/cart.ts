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
