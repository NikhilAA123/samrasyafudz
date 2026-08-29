// This is Google's official inline bootstrap loader (documented at
// developers.google.com/maps/documentation/javascript/load-maps-js-api),
// translated into a typed loadGoogleMaps() call instead of a literal
// inline <script> tag. It defines window.google.maps.importLibrary itself,
// then lazily fetches the real Maps JS bundle only when a library is first
// requested — this is what our previous plain <script src="maps/api/js">
// approach was missing entirely.

declare global {
  interface Window {
    google: any;
  }
}

let bootstrapped = false;

export function loadGoogleMaps(): void {
  if (bootstrapped) return;
  bootstrapped = true;

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  if (!apiKey) {
    throw new Error("VITE_GOOGLE_MAPS_API_KEY is not set");
  }

  (g => {
    let h: any, a: any, k: any;
    const p = "The Google Maps JavaScript API";
    const c = "google";
    const l = "importLibrary";
    const q = "__ib__";
    const m = document;
    let b: any = window as any;
    b = b[c] || (b[c] = {});
    const d = b.maps || (b.maps = {});
    const r = new Set();
    const e = new URLSearchParams();
    const u = () =>
      h ||
      (h = new Promise(async (f, n) => {
        await (a = m.createElement("script"));
        e.set("libraries", [...r] + "");
        for (k in g) e.set(k.replace(/[A-Z]/g, (t: string) => "_" + t[0].toLowerCase()), (g as any)[k]);
        e.set("callback", c + ".maps." + q);
        a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
        d[q] = f;
        a.onerror = () => (h = n(Error(p + " could not load.")));
        a.nonce = m.querySelector("script[nonce]")?.getAttribute("nonce") || "";
        m.head.append(a);
      }));
    d[l] ? console.warn(p + " only loads once. Ignoring:", g) : (d[l] = (f: any, ...n: any[]) => r.add(f) && u().then(() => d[l](f, ...n)));
  })({
    key: apiKey,
    v: "weekly",
  });
}