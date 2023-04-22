import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Container, Box, Stack, Typography, Button } from "@mui/material";
import styles from "@/styles/Home.module.css";
import { useEthers, shortenAddress } from "@usedapp/core";
import { displayShortString } from "@/utils/displayAddress";
import WalletConnectButton from "@/components/WalletConnectButton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [innerHeight, setInnerHeight] = useState<number>(0);
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const { account, chainId } = useEthers();

  useEffect(() => {
    setInnerHeight(window.innerHeight);
  }, []);

  return (
    <>
      <WalletConnectButton />
    </>
  );
}
