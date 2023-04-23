import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Box,
  Stack,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Collapse,
  styled,
  IconButton,
  IconButtonProps,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { displayShortString } from "@/utils/displayAddress";
import { formatNumber, formatBigNumber } from "@/utils/format";
import {
  getDate,
  calculateDaysBetweenDates,
  countdownTimer,
} from "@/utils/getDate";
import { BigNumber } from "ethers";
import { useGetUserAmount } from "@/hooks/useGetUserAmount";
// import { formatEther, parseEther } from "@ethersproject/units";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled(({ expand, ...other }: ExpandMoreProps) => {
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface TreasureCardProps {
  isHunting: boolean;
  userAddress: string;
  gameId: BigNumber;
  isSettled: boolean;
  host: string;
  prizeAmount: BigNumber;
  totalFeeAmount: BigNumber;
  creationDate: number;
  deadline: number;
  winner: string;
  robbingTreasures: number;
  currentPrice: number;
}

const TreasureCard = ({
  isHunting,
  userAddress,
  gameId,
  isSettled,
  host,
  prizeAmount,
  totalFeeAmount,
  creationDate,
  deadline,
  winner,
  robbingTreasures,
  currentPrice,
}: TreasureCardProps) => {
  const currentDate = new Date();
  const [expanded, setExpanded] = useState(false);
  const userAmount = useGetUserAmount(userAddress, Number(gameId.toString()));
  const isParticipated = Number(userAmount.toString()) > 0;
  const isOverDeadline = currentDate.getTime() > deadline * 1000;
  const isEnd = isOverDeadline && isSettled;
  const isWin = isParticipated && false;

  const leftDays = calculateDaysBetweenDates(creationDate, deadline);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
      sx={{
        maxWidth: "22.375rem",
        width: "22.375rem",
        minHeight: `${isHunting ? "15rem" : "11rem"}`,
        borderRadius: "1rem",
      }}
    >
      <Stack
        px="1rem"
        pt="1rem"
        direction="row"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography fontSize="1.5rem" fontWeight="700" color="#535A66">
          {formatBigNumber(prizeAmount.toString(), 18, 2)} ETH
        </Typography>
        <Stack
          width="5rem"
          height="1.5rem"
          border="0.5px solid"
          borderColor={
            isHunting
              ? isParticipated
                ? "#1B4BF1"
                : "#00AB63"
              : isEnd
              ? "#535A66"
              : isWin
              ? "#FF8A00"
              : "#535A66"
          }
          borderRadius="0.25rem"
          bgcolor={
            isHunting
              ? isParticipated
                ? "#1B4BF115"
                : "#00AB6315"
              : isEnd
              ? "#535A6615"
              : isWin
              ? "#FF8A0015"
              : "#535A6615"
          }
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            fontSize="0.75rem"
            fontWeight="500"
            color={
              isHunting
                ? isParticipated
                  ? "#1B4BF1"
                  : "#00AB63"
                : isEnd
                ? "#535A66"
                : isWin
                ? "#FF8A00"
                : "#535A66"
            }
          >
            {isHunting
              ? isParticipated
                ? "Participated"
                : "Available"
              : isEnd
              ? "End"
              : isWin
              ? "Win"
              : "End"}
          </Typography>
        </Stack>
      </Stack>
      <CardContent sx={{ paddingBottom: 0 }}>
        {/* Time Left */}
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          mb="0.75rem"
        >
          <Typography fontSize="1rem" fontWeight="400" color="#7B869A">
            Time Left
          </Typography>
          <Typography
            fontSize="1rem"
            fontWeight="400"
            color={
              isHunting ? (leftDays > 0 ? "#7B869A" : "#E40029") : "#7B869A"
            }
          >
            {isHunting
              ? `${leftDays} ${leftDays > 1 ? "Days" : "Day"} 
            ${countdownTimer(deadline)}`
              : "0 Day 00:00:00"}
          </Typography>
        </Stack>
        {/* Robbing Treasures */}
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          mb={isHunting ? "1.25rem" : "0"}
        >
          <Typography fontSize="1rem" fontWeight="400" color="#7B869A">
            Robbing Treasures
          </Typography>
          <Typography fontSize="1rem" fontWeight="400" color="#7B869A">
            {robbingTreasures} Hunters
          </Typography>
        </Stack>
        {/* Snatch Button */}
        {isHunting && (
          <Button
            sx={{
              width: "100%",
              height: "2.25rem",
              borderRadius: "2.5rem",
              bgcolor: "#1B4BF1",
              "&:hover": {
                bgcolor: "#5F81F5",
              },
              "&:active": {
                bgcolor: "#1334A9",
              },
            }}
          >
            <Stack
              direction="row"
              width="100%"
              height="100%"
              justifyContent="space-between"
              alignItems="center"
              px="1.5rem"
            >
              <Typography fontSize="0.875rem" fontWeight="500" color="#FFFFFF">
                Current price {currentPrice}U
              </Typography>
              <Typography fontSize="0.875rem" fontWeight="700" color="#FFFFFF">
                SNATCH IT!
              </Typography>
            </Stack>
          </Button>
        )}
      </CardContent>
      <CardActions disableSpacing sx={{ justifyContent: "flex-end" }}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center">
          <Box width="4.375rem">
            <Typography fontSize="0.75rem" fontWeight="500" color="#7E869A">
              {expanded ? "Show Less" : "More Details"}
            </Typography>
          </Box>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label={expanded ? "Show Less" : "More Details"}
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </Stack>
      </CardActions>
      <Collapse in={expanded}>
        <CardContent sx={{ paddingY: 0 }}>
          <Stack
            direction="row"
            width="100%"
            height="3rem"
            px="0.75rem"
            py="0.5rem"
            justifyContent="space-between"
            alignItems="center"
            mb="1rem"
            bgcolor="#7B869A1A"
            borderRadius="0.375rem"
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Image
                src="/images/winner.svg"
                width={32}
                height={32}
                alt={"Winner"}
              />
              <Typography fontSize="1rem" fontWeight="500" color="#535A66">
                Current Winner
              </Typography>
            </Stack>
            <Typography fontSize="1rem" fontWeight="500" color="#535A66">
              {displayShortString(winner, 4, 4)}{" "}
              {userAddress === winner && `(You)`}
            </Typography>
          </Stack>
          <Stack width="100%" justifyContent="flex-start" spacing="12px">
            {/* Your Amount */}
            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography fontSize="1rem" fontWeight="400" color="#7B869A">
                Your Amount
              </Typography>
              <Typography fontSize="1rem" fontWeight="400" color="#7B869A">
                {formatBigNumber(userAmount.toString(), 18, 2)} U
              </Typography>
            </Stack>
            {/* Total Amount */}
            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
              mb="1.25rem"
            >
              <Typography fontSize="1rem" fontWeight="400" color="#7B869A">
                Total Amount
              </Typography>
              <Typography fontSize="1rem" fontWeight="400" color="#7B869A">
                {formatBigNumber(totalFeeAmount.toString(), 18, 2)} U
              </Typography>
            </Stack>
            {/* Host */}
            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
              mb="1.25rem"
            >
              <Typography fontSize="1rem" fontWeight="400" color="#7B869A">
                Host
              </Typography>
              <Typography fontSize="1rem" fontWeight="400" color="#7B869A">
                {displayShortString(host, 4, 4)}
              </Typography>
            </Stack>
            {/* Creation Date */}
            <Stack
              direction="row"
              width="100%"
              justifyContent="space-between"
              alignItems="center"
              mb="1.25rem"
            >
              <Typography fontSize="1rem" fontWeight="400" color="#7B869A">
                Creation Date
              </Typography>
              <Typography fontSize="1rem" fontWeight="400" color="#7B869A">
                {getDate(creationDate)}
              </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default TreasureCard;
