"use client";

import { getTrending } from "./lib/api";
import { useState, useEffect } from "react";
import React from "react";
import Link from "next/link";

interface Pool {
  price: {
    usd: number;
  };
  txns: {
    volume: number;
    volume24h: number;
  };
}

interface Token {
  name: string;
  symbol: string;
}

interface TrendingItem {
  token: Token;
  pools: Pool[];
}

export default function Page() {
  const [trending, setTrending] = useState<TrendingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTrending()
      .then((data) => {
        setTrending(data);
        console.log(data);
      })
      .catch(() => setError("Failed to load Data"))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-500 mt-10 text-lg">Loading Data...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-500 mt-10 text-lg">{error}</p>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <Link
        href="/wallet/9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump"
        className="inline-block mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        My Wallet
      </Link>

      <ul className="space-y-4">
        {trending.map(({ token, pools }, index) => (
          <li
            key={index}
            className="p-4 bg-white rounded shadow hover:shadow-lg transition flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-gray-800">{token.name}</p>
              <p className="text-sm text-gray-500">{token.symbol}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-700">
                Price: ${pools[0].price.usd.toFixed(2)}
              </p>
              <p className="text-gray-500 text-sm">
                Volume: {pools[0].txns.volume} | 24h: {pools[0].txns.volume24h}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
