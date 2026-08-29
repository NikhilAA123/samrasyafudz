import { useRef, type ClipboardEvent, type KeyboardEvent } from "react";
import "./OtpInput.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
  length?: number;
}

export default function OtpInput({ value, onChange, length = 6 }: Props) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.split("");

  function updateDigit(index: number, digit: string) {
    const next = digits.slice();
    next[index] = digit;
    const joined = next.join("").slice(0, length);
    onChange(joined);

    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>, index: number) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    onChange(pasted);
    inputRefs.current[Math.min(pasted.length, length - 1)]?.focus();
  }

  return (
    <div className="otp-input-row">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          className="otp-box"
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[i] || ""}
          onChange={(e) => updateDigit(i, e.target.value.replace(/\D/g, ""))}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
}
