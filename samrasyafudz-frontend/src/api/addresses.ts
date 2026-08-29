import { api } from "./client";
import type { Address, AddAddressPayload } from "./types";

export async function fetchAddresses(): Promise<Address[]> {
  const { data } = await api.get<Address[]>("/api/users/me/addresses");
  return data;
}

export async function createAddress(payload: AddAddressPayload): Promise<Address> {
  const { data } = await api.post<Address>("/api/users/me/addresses", payload);
  return data;
}

export async function deleteAddress(id: number): Promise<void> {
  await api.delete(`/api/users/me/addresses/${id}`);
}