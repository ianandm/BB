import type { CartItem, Order } from "./types";
import { CART_STORAGE_KEY, ORDERS_STORAGE_KEY } from "./types";

export function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

export function saveOrder(order: Order): void {
  const orders = loadOrders();
  orders.unshift(order);
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
}

export function getOrderById(id: string): Order | undefined {
  return loadOrders().find((order) => order.id === id);
}

export function generateOrderId(): string {
  return `BB-${Date.now().toString(36).toUpperCase()}`;
}
