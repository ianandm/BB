import { prisma } from "@/lib/prisma";

export type AdminAnalytics = {
  books: { total: number; active: number; draft: number; archived: number };
  categories: { total: number; active: number };
  blogs: { total: number; published: number };
  orders: { total: number; pending: number; revenue: number };
};

export async function getAdminAnalytics(): Promise<AdminAnalytics> {
  const [
    booksTotal,
    booksActive,
    booksDraft,
    booksArchived,
    categoriesTotal,
    categoriesActive,
    blogsTotal,
    blogsPublished,
    ordersTotal,
    ordersPending,
    revenueAggregate,
  ] = await Promise.all([
    prisma.book.count(),
    prisma.book.count({ where: { status: "ACTIVE" } }),
    prisma.book.count({ where: { status: "DRAFT" } }),
    prisma.book.count({ where: { status: "ARCHIVED" } }),
    prisma.category.count(),
    prisma.category.count({ where: { isActive: true } }),
    prisma.blog.count(),
    prisma.blog.count({ where: { status: "PUBLISHED" } }),
    prisma.order.count(),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.aggregate({
      _sum: { totalAmount: true },
      where: { status: { notIn: ["CANCELLED", "REFUNDED"] } },
    }),
  ]);

  return {
    books: {
      total: booksTotal,
      active: booksActive,
      draft: booksDraft,
      archived: booksArchived,
    },
    categories: { total: categoriesTotal, active: categoriesActive },
    blogs: { total: blogsTotal, published: blogsPublished },
    orders: {
      total: ordersTotal,
      pending: ordersPending,
      revenue: Number(revenueAggregate._sum.totalAmount ?? 0),
    },
  };
}
