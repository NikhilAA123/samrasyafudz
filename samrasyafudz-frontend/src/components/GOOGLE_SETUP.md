# Google Places API Setup

1. Go to console.cloud.google.com → create or select a project.
2. Enable these two APIs (APIs & Services → Library):
   - "Places API (New)"
   - "Maps JavaScript API"
3. APIs & Services → Credentials → Create Credentials → API Key.
4. Restrict the key immediately (Edit API key):
   - Application restrictions → HTTP referrers → add http://localhost:5173/* for dev,
     and your real domain later.
   - API restrictions → restrict to exactly the two APIs enabled above.
   This is a browser-exposed key (it ends up in your frontend bundle), so restriction
   is not optional — an unrestricted key can be used by anyone who copies it from your
   page source.
5. Billing must be enabled on the project even for the free-tier usage — Google requires
   a billing account attached, though Autocomplete has a monthly free usage allowance.

Add the key to your frontend .env:
VITE_GOOGLE_MAPS_API_KEY=your_key_here
