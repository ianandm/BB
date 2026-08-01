import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const sessions = await prisma.checkoutSession.findMany({
  orderBy: { createdAt: 'desc' },
  take: 5,
  include: { order: true },
});
console.log('--- Recent CheckoutSessions ---');
for (const s of sessions) {
  console.log({
    id: s.id,
    stripeSessionId: s.stripeSessionId,
    status: s.status,
    createdAt: s.createdAt,
    hasOrder: !!s.order,
  });
}

const events = await prisma.paymentEvent.findMany({
  orderBy: { processedAt: 'desc' },
  take: 10,
});
console.log('--- Recent PaymentEvents ---');
for (const e of events) {
  console.log({ eventType: e.eventType, providerEventId: e.providerEventId, processedAt: e.processedAt });
}

const orders = await prisma.order.findMany({
  orderBy: { placedAt: 'desc' },
  take: 5,
});
console.log('--- Recent Orders ---');
for (const o of orders) {
  console.log({ orderNumber: o.orderNumber, status: o.status, placedAt: o.placedAt, email: o.customerEmail });
}

await prisma.$disconnect();
