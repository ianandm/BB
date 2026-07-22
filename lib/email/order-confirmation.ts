import { Resend } from "resend";
import type { getOrderForCustomer } from "@/lib/queries/checkout";

type CustomerOrder = NonNullable<Awaited<ReturnType<typeof getOrderForCustomer>>>;

function formatUsd(amount: number) {
  return `$${amount.toFixed(2)}`;
}

function orderEmailHtml(order: CustomerOrder, appUrl: string) {
  const address = order.shippingAddress as Record<string, string | null>;
  const rows = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 0;color:#ffffff;">${item.title}
            <span style="color:#8a90b8;"> × ${item.quantity}</span></td>
          <td style="padding:8px 0;color:#ffffff;text-align:right;">${formatUsd(item.totalPrice)}</td>
        </tr>`,
    )
    .join("");

  return `
  <div style="background:#0A0E27;padding:32px 16px;font-family:Georgia,serif;">
    <div style="max-width:560px;margin:0 auto;background:#12173a;border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:32px;">
      <h1 style="color:#F5B84B;font-size:24px;margin:0 0 4px;">BluishBoy</h1>
      <p style="color:#8a90b8;margin:0 0 24px;">Ancient wisdom for the modern mind</p>
      <h2 style="color:#ffffff;font-size:20px;margin:0 0 8px;">Thank you, ${order.customerName}!</h2>
      <p style="color:#c6cae6;margin:0 0 24px;">
        Your order <strong style="color:#3AA7FF;">${order.orderNumber}</strong> is confirmed.
      </p>
      <table style="width:100%;border-collapse:collapse;border-top:1px solid rgba(255,255,255,0.1);">
        ${rows}
        <tr><td style="padding:12px 0 4px;color:#8a90b8;border-top:1px solid rgba(255,255,255,0.1);">Subtotal</td>
            <td style="padding:12px 0 4px;color:#ffffff;text-align:right;border-top:1px solid rgba(255,255,255,0.1);">${formatUsd(order.subtotalAmount)}</td></tr>
        <tr><td style="padding:4px 0;color:#8a90b8;">Shipping</td>
            <td style="padding:4px 0;color:#ffffff;text-align:right;">${order.shippingAmount === 0 ? "Free" : formatUsd(order.shippingAmount)}</td></tr>
        <tr><td style="padding:8px 0;color:#F5B84B;font-size:18px;">Total</td>
            <td style="padding:8px 0;color:#F5B84B;text-align:right;font-size:18px;">${formatUsd(order.totalAmount)}</td></tr>
      </table>
      <p style="color:#8a90b8;margin:24px 0 4px;">Shipping to:</p>
      <p style="color:#ffffff;margin:0 0 24px;line-height:1.5;">
        ${address.name}<br/>${address.line1}${address.line2 ? `<br/>${address.line2}` : ""}<br/>
        ${address.city}, ${address.state} ${address.zip}
      </p>
      <a href="${appUrl}/orders/lookup"
         style="display:inline-block;background:#3AA7FF;color:#0A0E27;text-decoration:none;padding:12px 24px;border-radius:999px;">
        Track your order
      </a>
      <p style="color:#5a6089;font-size:12px;margin:24px 0 0;">
        Keep your order number and this email to look up your order anytime.
      </p>
    </div>
  </div>`;
}

/**
 * Send the order confirmation email. Never throws — a failed email must
 * not fail order creation.
 */
export async function sendOrderConfirmationEmail(order: CustomerOrder) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY not set — skipping confirmation email");
      return;
    }
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: process.env.EMAIL_FROM ?? "BluishBoy <onboarding@resend.dev>",
      to: order.customerEmail,
      subject: `Order confirmed — ${order.orderNumber}`,
      html: orderEmailHtml(order, appUrl),
    });
  } catch (error) {
    console.error("Confirmation email failed (order unaffected):", error);
  }
}
