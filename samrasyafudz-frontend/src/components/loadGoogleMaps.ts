let loadPromise: Promise<void> | null = null;

/**
 * Loads the Google Maps JS bootstrap script exactly once, however many
 * components ask for it. Subsequent calls reuse the same in-flight/completed
 * promise instead of injecting duplicate <script> tags.
 */
export function loadGoogleMaps(): Promise<void> {
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      reject(new Error("VITE_GOOGLE_MAPS_API_KEY is not set"));
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&v=beta&loading=async`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Maps script"));
    document.head.appendChild(script);
  });

  return loadPromise;
}
