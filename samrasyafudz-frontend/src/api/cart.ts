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

export async function updateCartItemQuantity(cartItemId: number, quantity: number): Promise<Cart> {
  const { data } = await api.put<Cart>(`/api/cart/${cartItemId}`, { quantity });
  return data;
}

export async function removeCartItem(cartItemId: number): Promise<Cart> {
  const { data } = await api.delete<Cart>(`/api/cart/${cartItemId}`);
  return data;
}