"use client"

import { getWalletInformation } from "../../lib/api"
import { useState, useEffect } from "react"
import React from 'react'
import Link from "next/link";

interface Token {
  address: string
  balance: number
  price: {
    quote: number
    usd: number
  }
}

interface WalletInformation {
  total: number
  totalSol: number
  tokens: Token[]
}

export default function Wallet({ params }: { params: { address: string } }) {
  const address = params.address;

  const [walletInformation, setWalletInformation] = useState<WalletInformation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getWalletInformation(address)
      .then((data) => {
        setWalletInformation(data)
        console.log(data)
      })
      .catch(() => setError("Failed to load Data"))
      .finally(() => setLoading(false));
  }, [address]);

  if (loading) return <p className="text-center text-gray-500 mt-10 text-lg">Loading Data...</p>;
  if (error) return <p className="text-center text-red-500 mt-10 text-lg">{error}</p>;
  if (!walletInformation) return <p className="text-center text-gray-500 mt-10 text-lg">No Data</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-50 min-h-screen">
      <Link
        href="/"
        className="inline-block mb-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Back to Tokens
      </Link>

      <div className="mb-6 p-4 bg-white rounded shadow">
        <p className="text-gray-700"><span className="font-semibold">Wallet ID:</span> {address}</p>
        <p className="text-gray-700"><span className="font-semibold">Total:</span> {walletInformation.total}</p>
        <p className="text-gray-700"><span className="font-semibold">Total SOL:</span> {walletInformation.totalSol}</p>
      </div>

      <h2 className="text-xl font-semibold mb-4">Tokens</h2>
      <ul className="space-y-4">
        {walletInformation.tokens?.map((token, index) => (
          <li
            key={index}
            className="p-4 bg-white rounded shadow hover:shadow-lg transition flex flex-col sm:flex-row sm:justify-between sm:items-center"
          >
            <p className="text-gray-800 break-all">{token.address}</p>
            <div className="text-gray-700 mt-2 sm:mt-0 text-sm sm:text-right">
              <p>Balance: {token.balance}</p>
              <p>Quote: {token.price.quote}</p>
              <p>USD: ${token.price.usd}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
