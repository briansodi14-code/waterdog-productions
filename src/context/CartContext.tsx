"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface CartItem {
  id: string;
  imageUrl: string;
  location?: string;
  date?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  isInCart: (id: string) => boolean;
  itemCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("waterdog-cart");
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch {
        // ignore corrupt data
      }
    }
    setIsLoaded(true);
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("waterdog-cart", JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = (item: CartItem) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      return [...prev, item];
    });
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setItems([]);

  const isInCart = (id: string) => items.some((item) => item.id === id);

  const itemCount = items.length;

  // $5 each or 5 for $20
  const totalPrice = (() => {
    const bundles = Math.floor(itemCount / 5);
    const remainder = itemCount % 5;
    return bundles * 20 + remainder * 5;
  })();

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, isInCart, itemCount, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
