import React, { useState, useEffect, useRef } from "react";
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
  Slide,
  MenuItem
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
import { useGetGameList } from "@/hooks/useGetGameList";
import { BigNumber } from "ethers";
import { formatEther } from "ethers/lib/utils";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HistoryIcon from '@mui/icons-material/History';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ContentPaste from '@mui/icons-material/ContentPaste';
import { useRouter } from "next/router";

export default function TreasureBoard() {
  const router = useRouter();
  const [innerHeight, setInnerHeight] = useState<number>(0);
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  const { account, chainId } = useEthers();
  const gameIdCounts = useGetGameIdCounts();
  const gameList = useGetGameList();
  const [value, setValue] = React.useState(0);
  const [checked, setChecked] = React.useState(false);
  const containerRef = React.useRef(null);
  const currentDate = new Date().getTime() / 1000;
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const onTimeGameList = gameList.filter(
    (game) => Number(game.deadline.toString()) > currentDate
  );

  const historyGameList = gameList.filter(
    (game) => Number(game.deadline.toString()) <= currentDate
  );
  // console.log("gameList", gameList);

  const handleSlideChange = () => {
    setChecked((prev) => !prev);
  };

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

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleHome = () => {
    router.push("/");
  };

  const handleCreate = () => {
    router.push("/create");
  };

  const handleHistory = () => {
    router.push("/treasure-board");
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          paddingX: "1rem",
          paddingY: "0.375rem",
        }}
      >
        <Button 
          onClick={handleShowMenu}
          aria-label="menu"
          sx={{
            minWidth: "2rem",
            color: "#7B869A",
            width: "2rem",
            height: "2rem",
            padding: 0,
            margin: 0,
          }}
        >
          { !showMenu && <MenuIcon sx={{ fontSize: "2rem" }} /> }
          { showMenu && <CloseIcon sx={{ fontSize: "2rem" }} /> }
        </Button>
      </Box>
      { showMenu && <Paper sx={{
          width: '100%',
          position: "absolute",
          maxWidth: "395px",
          zIndex: 100,
          height: "100%",
        }}>
        <MenuList>
          <MenuItem sx={{
              margin: '20px 0',
            }}
            onClick={handleHome}
          >
            <ListItemIcon>
              <HomeIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </MenuItem>
          <MenuItem sx={{
              margin: '20px 0',
            }}
            onClick={handleCreate}
          >
            <ListItemIcon>
              <AddCircleIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText>Create</ListItemText>
          </MenuItem>
          <MenuItem sx={{
            margin: '20px 0',
          }} disabled>
            <ListItemIcon>
              <ContentPaste fontSize="medium" />
            </ListItemIcon>
            <ListItemText>Stake</ListItemText>
          </MenuItem>
          <MenuItem sx={{
              margin: '20px 0',
            }}
            onClick={handleHistory}
          >
            <ListItemIcon>
              <HistoryIcon fontSize="medium" />
            </ListItemIcon>
            <ListItemText>Personal History</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>}
      <WalletConnectButton />
      {account && (
        <TabButtons
          value={value}
          handleChange={handleTabChange}
          huntingCounts={onTimeGameList.length}
          historyCounts={historyGameList.length}
        />
      )}
      <Box
        width="100%"
        height={scrollHeight ? `${scrollHeight}px` : "100vh"}
        px="1rem"
        mt="1.75rem"
        sx={{ overflowY: "scroll" }}
      >
        {value === 0 ? (
          <Stack width="100%" spacing={3} pb="2rem">
            {!account ? (
              <>
                <TreasureCard
                  isHunting={true}
                  userAddress={""}
                  gameId={BigNumber.from(1)}
                  isSettled={false}
                  host={"0x79603CBB5c09ABBC80Ec4113C2dc3d3830e7271d"}
                  prizeAmount={BigNumber.from("100000000000000000")}
                  totalFeeAmount={BigNumber.from("2036700000000000000000")}
                  creationDate={1682265600}
                  deadline={1682267000}
                  winner="0x79603CBB5c09ABBC80Ec4113C2dc3d3830e7271d"
                  robbingTreasures={12}
                  currentPrice={3}
                />
              </>
            ) : (
              <>
                {onTimeGameList.length > 0 &&
                  onTimeGameList.map((game, index) => (
                    <TreasureCard
                      isHunting={true}
                      key={index}
                      userAddress={account}
                      gameId={game.gameId}
                      isSettled={game.isSettled}
                      host={game.creator}
                      prizeAmount={game.prizeAmount}
                      totalFeeAmount={game.totalFeeAmount}
                      creationDate={Number(game.startTime.toString())}
                      deadline={Number(game.deadline.toString())}
                      winner={game.winner}
                      robbingTreasures={game.lottery.tickets.length}
                      currentPrice={1}
                    />
                  ))}

                {/* <TreasureCard />
              <TreasureCard />
              <TreasureCard /> */}
              </>
            )}
          </Stack>
        ) : (
          <Stack width="100%" spacing={3} pb="2rem">
            {!account ? (
              <>
                <TreasureCard
                  isHunting={false}
                  userAddress={""}
                  gameId={BigNumber.from(1)}
                  isSettled={false}
                  host={"0x79603CBB5c09ABBC80Ec4113C2dc3d3830e7271d"}
                  prizeAmount={BigNumber.from("100000000000000000")}
                  totalFeeAmount={BigNumber.from("2036700000000000000000")}
                  creationDate={1682265600}
                  deadline={1682267000}
                  winner="0x79603CBB5c09ABBC80Ec4113C2dc3d3830e7271d"
                  robbingTreasures={12}
                  currentPrice={3}
                />
              </>
            ) : (
              <>
                {historyGameList.length > 0 &&
                  historyGameList.map((game, index) => (
                    <TreasureCard
                      isHunting={false}
                      key={index}
                      userAddress={account}
                      gameId={game.gameId}
                      isSettled={game.isSettled}
                      host={game.creator}
                      prizeAmount={game.prizeAmount}
                      totalFeeAmount={game.totalFeeAmount}
                      creationDate={Number(game.startTime.toString())}
                      deadline={Number(game.deadline.toString())}
                      winner={game.winner}
                      robbingTreasures={game.lottery.tickets.length}
                      currentPrice={1}
                    />
                  ))}

                {/* <TreasureCard />
              <TreasureCard />
              <TreasureCard /> */}
              </>
            )}
          </Stack>
        )}
      </Box>
      {/* <Slide direction="right" in={checked} mountOnEnter unmountOnExit>
        <Box
          width="100vw"
          height={innerHeight ? `${innerHeight}px` : "100%"}
          sx={{
            bgcolor: "#000",
          }}
        >
          Test
        </Box>
      </Slide> */}
    </>
  );
}
