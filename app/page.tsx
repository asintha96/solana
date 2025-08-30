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

  if (loading) return <p>Loading Data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Link href="/wallet/9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump">
        My Wallet
      </Link>
      <br />
      <ul>
        {trending.map(({ token, pools }, index) => (
          <li key={index}>
            {token.name} ---- {token.symbol} ---- {pools[0].price.usd} ----{" "}
            {pools[0].txns.volume} ---- {pools[0].txns.volume24h}
          </li>
        ))}
      </ul>
    </div>
  );
}
