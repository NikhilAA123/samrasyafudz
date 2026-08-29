import { useState } from "react";
import AddressAutocomplete, { type ParsedAddress } from "./AddressAutocomplete";
import { createAddress } from "../api/addresses";

export default function AddAddressForm({ onSaved }: { onSaved: () => void }) {
  const [parsed, setParsed] = useState<ParsedAddress | null>(null);
  const [houseFlat, setHouseFlat] = useState("");
  const [label, setLabel] = useState("Home");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSave() {
    if (!parsed) {
      setError("Please search and select your address first.");
      return;
    }
    if (!houseFlat.trim()) {
      setError("Please enter your house/flat number and street.");
      return;
    }

    setError(null);
    setSubmitting(true);
    try {
      await createAddress({
        label,
        addressLine1: houseFlat,
        addressLine2: parsed.formattedAddress,
        area: parsed.area,
        city: parsed.city,
        state: parsed.state,
        pincode: parsed.pincode,
        latitude: parsed.latitude,
        longitude: parsed.longitude,
        googlePlaceId: parsed.placeId,
      });
      onSaved();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Could not save address. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      <label>Search for your area/locality</label>
      <AddressAutocomplete onSelect={setParsed} />

      {parsed && (
        <p style={{ fontSize: 13, color: "var(--color-ink-soft)", marginTop: 8 }}>
          Selected: {parsed.area ?? parsed.city}, {parsed.city}, {parsed.state} — {parsed.pincode}
        </p>
      )}

      <div style={{ marginTop: 16 }}>
        <label>House/Flat No. &amp; Street</label>
        <input
          type="text"
          value={houseFlat}
          onChange={(e) => setHouseFlat(e.target.value)}
          placeholder="e.g. Flat 4B, Sunrise Apartments"
        />
      </div>

      <div style={{ marginTop: 16 }}>
        <label>Label</label>
        <input type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Home / Work" />
      </div>

      {error && <p className="error-text">{error}</p>}

      <button className="btn-primary" style={{ marginTop: 16 }} onClick={handleSave} disabled={submitting}>
        {submitting ? "Saving…" : "Save address"}
      </button>
    </div>
  );
}
