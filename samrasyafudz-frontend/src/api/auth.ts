import { api } from "./client";
import type { AuthResponse, LoginPayload, RegisterPayload } from "./types";

export async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/api/auth/register", payload);
  return data;
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/api/auth/login", payload);
  return data;
}

// --- OTP-based mobile login (backend endpoints not built yet — see note in LoginModal) ---

export async function sendOtp(phone: string): Promise<void> {
  await api.post("/api/auth/otp/send", { phone });
}

export async function verifyOtp(phone: string, otp: string): Promise<AuthResponse> {
  const { data } = await api.post<AuthResponse>("/api/auth/otp/verify", { phone, otp });
  return data;
}
