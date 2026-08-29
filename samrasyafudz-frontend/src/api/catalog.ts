import { api } from "./client";
import type { Product, Category } from "./types";

export async function fetchProducts(categoryId?: number): Promise<Product[]> {
  const url = categoryId ? `/api/products/category/${categoryId}` : "/api/products";
  const { data } = await api.get<Product[]>(url);
  return data;
}

export async function fetchProductById(id: number): Promise<Product> {
  const { data } = await api.get<Product>(`/api/products/${id}`);
  return data;
}

export async function fetchCategories(): Promise<Category[]> {
  const { data } = await api.get<Category[]>("/api/categories");
  return data;
}
