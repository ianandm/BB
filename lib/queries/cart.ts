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
  items: { bookId: string; quantity: number }[],
) {
  const bookIds = items.map((item) => item.bookId);
  const books = bookIds.length
    ? await prisma.book.findMany({
        where: { id: { in: bookIds }, status: "ACTIVE" },
        select: { id: true, price: true },
      })
    : [];

  const priceById = new Map(books.map((book) => [book.id, book.price]));
  const validItems = items.filter((item) => priceById.has(item.bookId));

  await prisma.$transaction([
    prisma.cartItem.deleteMany({ where: { cartId } }),
    ...(validItems.length
      ? [
          prisma.cartItem.createMany({
            data: validItems.map((item) => ({
              cartId,
              bookId: item.bookId,
              quantity: item.quantity,
              unitPrice: priceById.get(item.bookId)!,
            })),
          }),
        ]
      : []),
  ]);
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
