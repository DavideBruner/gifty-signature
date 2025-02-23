"use client";

import React from "react";
import { createContext, useContext, useReducer, useEffect } from "react";
import { SelectedVariants } from "../types/product";

// Types
type CartItem = {
  productId: string;
  quantity: number;
  selectedVariants?: SelectedVariants;
  customization?: Record<string, string>;
};

type CartState = {
  items: CartItem[];
  total: number;
};

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: string } }
  | {
      type: "UPDATE_QUANTITY";
      payload: { productId: string; quantity: number };
    }
  | { type: "CLEAR_CART" }
  | { type: "SET_CART"; payload: CartState };

// Commerce fetcher interface
interface CommerceFetcher {
  getCart: () => Promise<CartState>;
  addItem: (item: CartItem) => Promise<CartState>;
  removeItem: (productId: string) => Promise<CartState>;
  updateQuantity: (productId: string, quantity: number) => Promise<CartState>;
  clearCart: () => Promise<CartState>;
}

// Local storage implementation of CommerceFetcher
class LocalStorageFetcher implements CommerceFetcher {
  private readonly storageKey = "commerce-cart";

  private async getStoredCart(): Promise<CartState> {
    if (typeof window === "undefined") return { items: [], total: 0 };
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : { items: [], total: 0 };
  }

  private async updateStoredCart(cart: CartState): Promise<CartState> {
    if (typeof window === "undefined") return cart;
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
    return cart;
  }

  async getCart(): Promise<CartState> {
    return this.getStoredCart();
  }

  async addItem(item: CartItem): Promise<CartState> {
    const cart = await this.getStoredCart();
    const existingItem = cart.items.find((i) => i.productId === item.productId);

    if (existingItem) {
      cart.items = cart.items.map((i) =>
        i.productId === item.productId
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
    } else {
      cart.items = [...cart.items, item];
    }

    return this.updateStoredCart(cart);
  }

  async removeItem(productId: string): Promise<CartState> {
    const cart = await this.getStoredCart();
    cart.items = cart.items.filter((item) => item.productId !== productId);
    return this.updateStoredCart(cart);
  }

  async updateQuantity(
    productId: string,
    quantity: number
  ): Promise<CartState> {
    const cart = await this.getStoredCart();
    cart.items = cart.items.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
    return this.updateStoredCart(cart);
  }

  async clearCart(): Promise<CartState> {
    const emptyCart = { items: [], total: 0 };
    return this.updateStoredCart(emptyCart);
  }
}

// Commerce context
type CommerceContextType = {
  cart: CartState;
  addItem: (item: CartItem) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  isLoading: boolean;
};

const CommerceContext = createContext<CommerceContextType | null>(null);

// Commerce provider props
type CommerceProviderProps = {
  children: React.ReactNode;
  fetcher?: CommerceFetcher;
};

// Commerce provider component
export function CommerceProvider({
  children,
  fetcher = new LocalStorageFetcher(),
}: CommerceProviderProps) {
  const [cart, setCart] = useReducer(
    (state: CartState, action: CartAction): CartState => {
      switch (action.type) {
        case "SET_CART":
          return action.payload;
        default:
          return state;
      }
    },
    { items: [], total: 0 }
  );
  const [isLoading, setIsLoading] = React.useState(true);

  // Initialize cart
  useEffect(() => {
    const initCart = async () => {
      try {
        const initialCart = await fetcher.getCart();
        setCart({ type: "SET_CART", payload: initialCart });
      } finally {
        setIsLoading(false);
      }
    };
    initCart();
  }, []);

  // Commerce operations
  const commerceOperations: CommerceContextType = {
    cart,
    isLoading,
    async addItem(item) {
      setIsLoading(true);
      try {
        const updatedCart = await fetcher.addItem(item);
        setCart({ type: "SET_CART", payload: updatedCart });
      } finally {
        setIsLoading(false);
      }
    },
    async removeItem(productId) {
      setIsLoading(true);
      try {
        const updatedCart = await fetcher.removeItem(productId);
        setCart({ type: "SET_CART", payload: updatedCart });
      } finally {
        setIsLoading(false);
      }
    },
    async updateQuantity(productId, quantity) {
      setIsLoading(true);
      try {
        const updatedCart = await fetcher.updateQuantity(productId, quantity);
        setCart({ type: "SET_CART", payload: updatedCart });
      } finally {
        setIsLoading(false);
      }
    },
    async clearCart() {
      setIsLoading(true);
      try {
        const updatedCart = await fetcher.clearCart();
        setCart({ type: "SET_CART", payload: updatedCart });
      } finally {
        setIsLoading(false);
      }
    },
  };

  return (
    <CommerceContext.Provider value={commerceOperations}>
      {children}
    </CommerceContext.Provider>
  );
}

// Hook for using commerce context
export function useCommerce() {
  const context = useContext(CommerceContext);
  if (!context) {
    throw new Error("useCommerce must be used within a CommerceProvider");
  }
  return context;
}
