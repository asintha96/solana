const API_URL = "https://data.solanatracker.io";

async function fetchFromAPI(endpoint: string) {
  const apiKey = process.env.NEXT_PUBLIC_SOLANA_TRACKER_API_KEY;

  if (!apiKey) {
    throw new Error("API Key is missing! Check .env.local");
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "x-api-key": apiKey,
    },
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`API error ${res.status}: ${errText}`);
  }

  return res.json();
}

export function getTrending() {
  return fetchFromAPI(`/tokens/trending`);
}

export function getWalletInformation (address:string) {
  return fetchFromAPI(`/wallet/${address}/basic`);
}