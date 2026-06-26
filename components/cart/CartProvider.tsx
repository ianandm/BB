"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Book } from "@/lib/data/catalog";
import { loadCart, saveCart } from "@/lib/cart/storage";
import type { CartItem } from "@/lib/cart/types";
import { AddedToLibraryToast } from "@/components/cart/AddedToLibraryToast";

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (book: Book, quantity?: number) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (bookId: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

function bookToCartItem(book: Book, quantity: number): CartItem {
  return {
    bookId: book.id,
    slug: book.slug,
    title: book.title,
    author: book.author,
    price: book.price,
    image: book.image,
    quantity,
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [toastBook, setToastBook] = useState<string | null>(null);

  useEffect(() => {
    setItems(loadCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      saveCart(items);
    }
  }, [items, hydrated]);

  const addItem = useCallback((book: Book, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.bookId === book.id);
      if (existing) {
        return current.map((item) =>
          item.bookId === book.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...current, bookToCartItem(book, quantity)];
    });
    setToastBook(book.title);
  }, []);

  const removeItem = useCallback((bookId: string) => {
    setItems((current) => current.filter((item) => item.bookId !== bookId));
  }, []);

  const updateQuantity = useCallback((bookId: string, quantity: number) => {
    if (quantity < 1) return;
    setItems((current) =>
      current.map((item) =>
        item.bookId === bookId ? { ...item, quantity } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = useCallback(
    (bookId: string) => items.some((item) => item.bookId === bookId),
    [items],
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isInCart,
    }),
    [
      items,
      itemCount,
      subtotal,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isInCart,
    ],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <AddedToLibraryToast
        bookTitle={toastBook}
        onDismiss={() => setToastBook(null)}
      />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
