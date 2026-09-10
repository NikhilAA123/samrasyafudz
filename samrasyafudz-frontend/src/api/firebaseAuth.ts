import {
  signInWithPhoneNumber,
  RecaptchaVerifier,
  type ConfirmationResult,
} from "firebase/auth";
import { auth } from "../firebase-config";

let confirmationResult: ConfirmationResult | null = null;
let recaptchaVerifier: RecaptchaVerifier | null = null;

const RECAPTCHA_CONTAINER_ID = "recaptcha-container";

function getRecaptchaVerifier(): RecaptchaVerifier {
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(auth, RECAPTCHA_CONTAINER_ID, {
      size: "invisible",
    });
  }
  return recaptchaVerifier;
}

export async function sendOtp(phone: string) {
  const verifier = getRecaptchaVerifier();
  await verifier.render();
  confirmationResult = await signInWithPhoneNumber(auth, phone, verifier);
}

export async function verifyOtp(code: string): Promise<string> {
  if (!confirmationResult) throw new Error("No OTP was requested");
  const result = await confirmationResult.confirm(code);
  return result.user.getIdToken();
}
