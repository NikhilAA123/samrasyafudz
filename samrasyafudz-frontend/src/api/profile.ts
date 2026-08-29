import { api } from "./client";
import type { UserProfile, UpdateProfilePayload } from "./types";

export async function fetchProfile(): Promise<UserProfile> {
  const { data } = await api.get<UserProfile>("/api/users/me");
  return data;
}

export async function updateProfile(payload: UpdateProfilePayload): Promise<UserProfile> {
  const { data } = await api.put<UserProfile>("/api/users/me", payload);
  return data;
}