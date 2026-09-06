import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
} from "firebase/auth";
import { auth } from "../firebase-config";

let confirmationResult: ConfirmationResult | null = null;

export function setupRecaptcha(containerId: string) {
  return new RecaptchaVerifier(auth, containerId, { size: "invisible" });
}

export async function sendOtp(
  phone: string,
  recaptchaVerifier: RecaptchaVerifier,
) {
  await recaptchaVerifier.render();
  confirmationResult = await signInWithPhoneNumber(
    auth,
    phone,
    recaptchaVerifier,
  );
}

export async function verifyOtp(code: string): Promise<string> {
  if (!confirmationResult) throw new Error("No OTP was requested");
  const result = await confirmationResult.confirm(code);
  return result.user.getIdToken();
}
