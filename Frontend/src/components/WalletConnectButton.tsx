import React from "react";
import Image from "next/image";
import { Stack, Typography, Button } from "@mui/material";
import { useEthers } from "@usedapp/core";
import { displayShortString } from "@/utils/displayAddress";

const WalletConnectButton = () => {
  const { account, deactivate, activateBrowserWallet } = useEthers();

  return (
    <Stack
      width="100%"
      px="1rem"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <Typography color="#535A66" fontSize="1.8rem" fontWeight="700">
        {!account ? "TreasureHunt" : `Hi ${displayShortString(account, 4, 4)}`}
      </Typography>
      <Button
        variant="contained"
        sx={{
          width: "9rem",
          height: "2.25rem",
          bgcolor: "#FFF",
          paddingX: "0.625rem",
          borderRadius: "1.25rem",
          "&:hover": {
            bgcolor: "#F6F6F6",
          },
        }}
      >
        {!account ? (
          <Typography
            color="#9095A1"
            fontSize="0.75rem"
            fontWeight="700"
            onClick={() => activateBrowserWallet()}
          >
            Connect to wallet
          </Typography>
        ) : (
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={0.5}
          >
            <Image
              src="/images/metamask-fox.svg"
              width={24}
              height={24}
              alt={"Metamask"}
            />
            <Typography
              color="#9095A1"
              fontSize="0.75rem"
              fontWeight="700"
              onClick={() => deactivate()}
              mr="0.25rem"
            >
              Connected
            </Typography>
          </Stack>
        )}
      </Button>
    </Stack>
  );
};

export default WalletConnectButton;
