import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "../api/loadGoogleMaps";

export interface ParsedAddress {
  formattedAddress: string;
  area: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  latitude: number | null;
  longitude: number | null;
  placeId: string | null;
}

interface Props {
  onSelect: (address: ParsedAddress) => void;
}

function extractComponent(components: any[], type: string): string | null {
  const match = components?.find((c) => c.types?.includes(type));
  return match?.longText ?? null;
}

export default function AddressAutocomplete({ onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let widgetEl: any;
    let cancelled = false;

    async function init() {
      try {
        // loadGoogleMaps() defines window.google.maps.importLibrary
        // synchronously — the actual script fetch happens lazily
        // inside the first importLibrary() call below, not here.
        loadGoogleMaps();

        const { PlaceAutocompleteElement } = await window.google.maps.importLibrary("places");
        if (cancelled) return;

        widgetEl = new PlaceAutocompleteElement({
          componentRestrictions: { country: "in" },
        });
        containerRef.current?.appendChild(widgetEl);

        widgetEl.addEventListener("gmp-select", async (event: any) => {
          const place = event.placePrediction.toPlace();
          await place.fetchFields({
            fields: ["addressComponents", "formattedAddress", "location", "id"],
          });

          const components = place.addressComponents ?? [];

          onSelect({
            formattedAddress: place.formattedAddress ?? "",
            area:
              extractComponent(components, "sublocality_level_1") ??
              extractComponent(components, "sublocality") ??
              extractComponent(components, "neighborhood"),
            city: extractComponent(components, "locality"),
            state: extractComponent(components, "administrative_area_level_1"),
            pincode: extractComponent(components, "postal_code"),
            latitude: place.location?.lat() ?? null,
            longitude: place.location?.lng() ?? null,
            placeId: place.id ?? null,
          });
        });

        setLoading(false);
      } catch (err) {
        setError("Google Maps failed to load:"+ err);
        if (!cancelled) {
          setError("Address search is unavailable right now. Please enter your address manually.");
          setLoading(false);
        }
      }
    }

    init();

    return () => {
      cancelled = true;
      widgetEl?.remove();
    };
  }, [onSelect]);

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  return (
    <div>
      {loading && <p style={{ fontSize: 14, color: "var(--color-ink-soft)" }}>Loading address search…</p>}
      <div ref={containerRef} />
    </div>
  );
}
