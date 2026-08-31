import { useEffect, useState, type FormEvent } from "react";
import Modal from "./Modal";
import OtpInput from "./OtpInput";
import { sendOtp, verifyOtp } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import "./LoginModal.css";

type Step = "phone" | "otp";

const RESEND_COOLDOWN_SECONDS = 30;

export default function LoginModal() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const { login, loginOpen, closeLogin } = useAuth();

  // Reset all state whenever the modal is closed, so reopening starts fresh
  useEffect(() => {
    if (!loginOpen) {
      setStep("phone");
      setPhone("");
      setOtp("");
      setError(null);
      setSubmitting(false);
      setCooldown(0);
    }
  }, [loginOpen]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timer);
  }, [cooldown]);

  function isValidPhone(value: string) {
    return /^[6-9]\d{9}$/.test(value); // 10-digit Indian mobile number
  }

  async function handleSendOtp(e: FormEvent) {
    e.preventDefault();
    if (!isValidPhone(phone)) {
      setError("Enter a valid 10-digit mobile number.");
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      await sendOtp(phone);
      setStep("otp");
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not send OTP. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResend() {
    if (cooldown > 0) return;
    setError(null);
    setOtp("");
    try {
      await sendOtp(phone);
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch {
      setError("Could not resend OTP. Please try again.");
    }
  }

  async function handleVerifyOtp(e: FormEvent) {
    e.preventDefault();
    if (otp.length !== 6) {
      setError("Enter the full 6-digit code.");
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      const res = await verifyOtp(phone, otp);
      login(res.token, {
        userId: res.userId, phone: res.phone, fullName: res.fullName,
        email: ""
      });
      closeLogin();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Incorrect or expired code. Please try again.");
    } finally {
      setSubmitting(false);
      setOtp("");
    }
  }

  return (
    <Modal isOpen={loginOpen} onClose={closeLogin}>
      {step === "phone" ? (
        <div className="login-modal-step">
          <h2>Log in</h2>
          <p className="login-modal-subtitle">
            We'll text a one-time code to your registered mobile number.
          </p>

          <form onSubmit={handleSendOtp}>
            <div className="login-modal-phone-field">
              <span className="login-modal-prefix">+91</span>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                autoFocus
              />
            </div>

            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="btn-primary auth-submit" disabled={submitting}>
              {submitting ? "Sending code…" : "Send OTP"}
            </button>
          </form>
        </div>
      ) : (
        <div className="login-modal-step">
          <h2>Enter the code</h2>
          <p className="login-modal-subtitle">
            Sent to <strong>+91 {phone}</strong>.{" "}
            <button className="login-modal-link" onClick={() => setStep("phone")}>
              Change number
            </button>
          </p>

          <form onSubmit={handleVerifyOtp}>
            <OtpInput value={otp} onChange={setOtp} />

            {error && <p className="error-text" style={{ textAlign: "center" }}>{error}</p>}

            <button type="submit" className="btn-primary auth-submit" disabled={submitting}>
              {submitting ? "Verifying…" : "Verify & log in"}
            </button>
          </form>

          <p className="login-modal-resend">
            {cooldown > 0 ? (
              <span>Resend code in {cooldown}s</span>
            ) : (
              <button className="login-modal-link" onClick={handleResend}>
                Resend code
              </button>
            )}
          </p>
        </div>
      )}
    </Modal>
  );
}
