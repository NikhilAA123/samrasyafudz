import { api } from "./client";
import type { Order } from "./types";

export async function checkout(addressId: number): Promise<Order> {
  const { data } = await api.post<Order>("/api/orders/checkout", { addressId });
  return data;
}

export async function fetchOrders(): Promise<Order[]> {
  const { data } = await api.get<Order[]>("/api/orders");
  return data;
}

export async function fetchOrder(orderId: number): Promise<Order> {
  const { data } = await api.get<Order>(`/api/orders/${orderId}`);
  return data;
}

export async function cancelOrder(orderId: number): Promise<Order> {
  const { data } = await api.post<Order>(`/api/orders/${orderId}/cancel`);
  return data;
}