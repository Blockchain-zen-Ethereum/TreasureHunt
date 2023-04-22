import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import {
  Box,
  Stack,
  styled,
  Button,
  Tabs,
  Tab,
  Typography,
} from "@mui/material";
import styles from "@/styles/Home.module.css";
import { useEthers } from "@usedapp/core";
import { displayShortString } from "@/utils/displayAddress";
import WalletConnectButton from "@/components/WalletConnectButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreasureCard from "@/components/TreasureCard";
import TabButtons from "@/components/TabButtons";

export default function Home() {
  const [innerHeight, setInnerHeight] = useState<number>(0);
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const { account, chainId } = useEthers();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    setInnerHeight(window.innerHeight);
    setScrollHeight(
      account
        ? window.innerHeight - 44 - 44 - 28 - 42 - 19
        : window.innerHeight - 44 - 44 - 28
    );
  }, [account]);

  return (
    <>
      <WalletConnectButton />
      {account && <TabButtons />}
      <Box
        width="100%"
        height={scrollHeight ? `${scrollHeight}px` : "100vh"}
        px="1rem"
        mt="1.75rem"
        sx={{ overflowY: "scroll" }}
      >
        <Stack width="100%" spacing={3} pb="2rem">
          <TreasureCard />
          <TreasureCard />
          <TreasureCard />
        </Stack>
      </Box>
    </>
  );
}
