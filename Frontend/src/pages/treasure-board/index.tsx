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
  IconButton,
} from "@mui/material";
import styles from "@/styles/Home.module.css";
import { useEthers } from "@usedapp/core";
import { displayShortString } from "@/utils/displayAddress";
import WalletConnectButton from "@/components/WalletConnectButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TreasureCard from "@/components/TreasureCard";
import TabButtons from "@/components/TabButtons";
import MenuIcon from "@mui/icons-material/Menu";
import { useGetGameIdCounts } from "@/hooks/useGetGameIdCounts";

export default function TreasureBoard() {
  const [innerHeight, setInnerHeight] = useState<number>(0);
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const { account, chainId } = useEthers();
  const gameIdCounts = useGetGameIdCounts();
  const [value, setValue] = React.useState(0);

  const handleTabChange = (newValue: React.SetStateAction<number>) => {
    setValue(newValue);
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
      <Box
        sx={{
          width: "100%",
          paddingX: "1rem",
          paddingY: "0.375rem",
        }}
      >
        <IconButton
          aria-label="menu"
          sx={{
            color: "#7B869A",
            width: "2rem",
            height: "2rem",
            padding: 0,
            margin: 0,
          }}
        >
          <MenuIcon sx={{ fontSize: "2rem" }} />
        </IconButton>
      </Box>
      <WalletConnectButton />
      {account && (
        <TabButtons
          value={value}
          handleChange={handleTabChange}
          huntingCounts={gameIdCounts}
          historyCounts={1}
        />
      )}
      <Box
        width="100%"
        height={scrollHeight ? `${scrollHeight}px` : "100vh"}
        px="1rem"
        mt="1.75rem"
        sx={{ overflowY: "scroll" }}
      >
        <Stack width="100%" spacing={3} pb="2rem">
          {!account ? (
            <>
              <TreasureCard
                userAddress={""}
                host={"0x79603CBB5c09ABBC80Ec4113C2dc3d3830e7271d"}
                prizeAmount={1}
                totalFeeAmount={20367}
                userAmount={4}
                creationDate="2023/06/12"
                deadline=""
                winner="0x79603CBB5c09ABBC80Ec4113C2dc3d3830e7271d"
                robbingTreasures={12}
                currentPrice={3}
              />
            </>
          ) : (
            <>
              <TreasureCard
                userAddress={account}
                host={"0x79603CBB5c09ABBC80Ec4113C2dc3d3830e7271d"}
                prizeAmount={1}
                totalFeeAmount={20367}
                userAmount={4}
                creationDate="2023/06/12"
                deadline=""
                winner="0x79603CBB5c09ABBC80Ec4113C2dc3d3830e7271d"
                robbingTreasures={12}
                currentPrice={3}
              />
              {/* <TreasureCard />
              <TreasureCard />
              <TreasureCard /> */}
            </>
          )}
        </Stack>
      </Box>
    </>
  );
}
