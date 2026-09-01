import { api } from "./client";
import type { Cart, AddToCartPayload } from "./types";

export async function fetchCart(): Promise<Cart> {
  const { data } = await api.get<Cart>("/api/cart");
  return data;
}

export async function addToCart(payload: AddToCartPayload): Promise<Cart> {
  const { data } = await api.post<Cart>("/api/cart", payload);
  return data;
}

export async function updateCartItemQuantity(productId: number, variantId: number, quantity: number): Promise<Cart> {
  const { data } = await api.put<Cart>(`/api/cart/product/${productId}/variant/${variantId}`, { quantity });
  return data;
}

export async function removeCartItem(productId: number,variantId: number): Promise<Cart> {
  const { data } = await api.delete<Cart>(`/api/cart/product/${productId}/variant/${variantId}`);
  return data;
}