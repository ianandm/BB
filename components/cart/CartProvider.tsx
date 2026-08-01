"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useUser } from "@clerk/nextjs";

export type CartItem = {
  id: string;
  title: string;
  author: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
  format: string;
  insight?: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  syncNow: () => Promise<void>;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);
const CART_STORAGE_KEY = "bluish-cart";
const SYNC_DEBOUNCE_MS = 800;

/** Only DB-backed books (uuid ids) are synced; static fallback ids like "bk-1" stay local-only. */
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

type ServerCartItem = {
  id: string;
  quantity: number;
  unitPrice: number;
  book: {
    id: string;
    title: string;
    author: string;
    image: string;
    category: string;
    format: string;
    insight?: string;
  };
};

function loadItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function mapServerItem(item: ServerCartItem): CartItem {
  return {
    id: item.book.id,
    title: item.book.title,
    author: item.book.author,
    price: item.unitPrice,
    image: item.book.image,
    category: item.book.category,
    format: item.book.format,
    insight: item.book.insight,
    quantity: item.quantity,
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Server sync bookkeeping. Sync is best-effort: if the API is down the
  // cart keeps working from localStorage exactly as before.
  const serverReadyRef = useRef(false);
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mergedRef = useRef(false);
  const { isSignedIn } = useUser();

  // When a Clerk session appears, merge the guest cart into the user cart
  // once, then adopt any server-side items the user had from before.
  useEffect(() => {
    if (!isSignedIn || mergedRef.current) return;
    mergedRef.current = true;

    (async () => {
      try {
        const res = await fetch("/api/cart/merge", { method: "POST" });
        if (!res.ok) return;
        const data = (await res.json()) as {
          cart: { items: ServerCartItem[] } | null;
        };
        const serverItems = data.cart?.items ?? [];
        if (serverItems.length > 0) {
          setItems((prev) => {
            const localIds = new Set(prev.map((item) => item.id));
            const additions = serverItems
              .filter((item) => !localIds.has(item.book.id))
              .map(mapServerItem);
            return additions.length > 0 ? [...prev, ...additions] : prev;
          });
        }
      } catch {
        // Best-effort; guest cart keeps working.
      }
    })();
  }, [isSignedIn]);

  useEffect(() => {
    setItems(loadItems());
    setHydrated(true);
  }, []);

  // One-time reconcile with the server cart after hydration.
  // Rule: local wins on conflicts; server-only items are added locally.
  useEffect(() => {
    if (!hydrated) return;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch("/api/cart", { cache: "no-store" });
        if (!res.ok) throw new Error(`GET /api/cart ${res.status}`);
        const data = (await res.json()) as {
          cart: { items: ServerCartItem[] } | null;
        };

        if (cancelled) return;

        const serverItems = data.cart?.items ?? [];
        if (serverItems.length > 0) {
          setItems((prev) => {
            const localIds = new Set(prev.map((item) => item.id));
            const additions = serverItems
              .filter((item) => !localIds.has(item.book.id))
              .map(mapServerItem);
            return additions.length > 0 ? [...prev, ...additions] : prev;
          });
        }
      } catch {
        // Server unavailable — keep working from localStorage.
      } finally {
        if (!cancelled) serverReadyRef.current = true;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [hydrated]);

  // Persist to localStorage (unchanged) and debounce a push to the server.
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));

    if (!serverReadyRef.current) return;

    // Debounce: replace any pending push with one carrying the latest items.
    // NOTE: the timer is deliberately NOT cleared in this effect's cleanup —
    // cleanup runs on every items change, which would cancel each scheduled
    // sync and leave the server cart stuck on an early snapshot.
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    syncTimerRef.current = setTimeout(() => {
      const payload = {
        items: items
          .filter((item) => UUID_RE.test(item.id))
          .map((item) => ({ bookId: item.id, quantity: item.quantity })),
      };

      void fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).catch(() => {
        // Best-effort sync; localStorage remains the source of truth.
      });
    }, SYNC_DEBOUNCE_MS);
  }, [items, hydrated]);

  // Cancel any pending sync only when the provider itself unmounts.
  useEffect(() => {
    return () => {
      if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    };
  }, []);

  const addToCart = useCallback((item: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback(
    (id: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(id);
        return;
      }
      setItems((prevItems) =>
        prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
      );
    },
    [removeFromCart],
  );

  const clearCart = useCallback(() => setItems([]), []);

  /** Push the cart to the server immediately, bypassing the debounce. */
  const syncNow = useCallback(async () => {
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    try {
      await fetch("/api/cart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items
            .filter((item) => UUID_RE.test(item.id))
            .map((item) => ({ bookId: item.id, quantity: item.quantity })),
        }),
      });
    } catch {
      // Checkout will surface any resulting mismatch.
    }
  }, [items]);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      syncNow,
      totalItems,
      totalPrice,
      isCartOpen,
      openCart,
      closeCart,
    }),
    [
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      syncNow,
      totalItems,
      totalPrice,
      isCartOpen,
      openCart,
      closeCart,
    ],
  );

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
