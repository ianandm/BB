export type CartItem = {
  bookId: string;
  slug: string;
  title: string;
  author: string;
  price: number;
  image: string;
  quantity: number;
};

export type CheckoutDetails = {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
};

export type Order = {
  id: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  customer: CheckoutDetails;
  createdAt: string;
  status: "confirmed";
};

export const CART_STORAGE_KEY = "bluish-cart";
export const ORDERS_STORAGE_KEY = "bluish-orders";
export const SHIPPING_COST = 4.99;
