import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { fetchCart, addToCart as apiAddToCart, updateCartItemQuantity, removeCartItem } from "../api/cart";
import type { Cart } from "../api/types";
import { useAuth } from "./AuthContext";

interface CartContextValue {
  cart: Cart | null;
  itemCount: number;
  loading: boolean;
  refreshCart: () => Promise<void>;
  addItem: (productId: number, variantId: number, quantity: number) => Promise<void>;
  updateQuantity: (productId: number, variantId: number, quantity: number) => Promise<void>;
  removeItem: (productId: number, variantId:number) => Promise<void>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const refreshCart = useCallback(async () => {
    if (!user) {
      setCart(null);
      return;
    }
    setLoading(true);
    try {
      const data = await fetchCart();
      setCart(data);
    } finally {
      setLoading(false);
    }
  }, [user]);

  async function addItem(productId: number, variantId: number, quantity: number) {
    const updated = await apiAddToCart({ productId, variantId, quantity });
    setCart(updated);
  }

  async function updateQuantity(productId: number, variantId: number , quantity: number) {
    const updated = await updateCartItemQuantity(productId , variantId, quantity);
    setCart(updated);
  }

  async function removeItem(productId: number , variantId: number) {
    const updated = await removeCartItem(productId, variantId);
    setCart(updated);
  }

  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0) ?? 0;

  return (
    <CartContext.Provider value={{ cart, itemCount, loading, refreshCart, addItem, updateQuantity, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}