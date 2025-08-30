"use client"

import {getWalletInformation} from "../../lib/api"
import { useState,useEffect } from "react"
import React from 'react'
import Link from "next/link";

export default function Wallet({ params }: { params: { address: string } }) {
    const address=params.address;

const [walletInformation, setWalletInformation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getWalletInformation(address)
      .then((data) => {setWalletInformation(data) 
        console.log(data)
      })
     
      .catch(() => setError("Failed to load Data"))
      .finally(() => setLoading(false));
  }, [address]);
 
  if (loading) return <p>Loading Data...</p>;
  if (error) return <p>{error}</p>;


  return (
    <div>
        <Link href="/">Tokents</Link>
        <br></br>
        Wallet ID  : {address}
        <br></br>
        Total   :  {walletInformation.total}
        <br></br>
        TotalSol   :  {walletInformation.totalSol}


        <br></br>

        Token

        {walletInformation.tokens.map((token, index) => (<p key={index}>{token.address}----{token.balance}---{token.price.quote}----{token.price.usd
}</p>))}
      
    </div>
  );
}

