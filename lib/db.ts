import { prisma } from "@/lib/prisma";

export async function isDatabaseConnected(): Promise<boolean> {
  if (!process.env.DATABASE_URL) return false;

  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}
