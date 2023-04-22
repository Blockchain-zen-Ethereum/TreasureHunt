import React, { useMemo } from "react";
import { useCall, useEthers, ThunderCoreTestnet } from "@usedapp/core";
import TreasuryHuntABI from "@/abis/TreasuryHunt.json";
import { utils } from "ethers";
import { Contract, ContractInterface } from "@ethersproject/contracts";
import ADDRESSES from "@/constants/addresses";
import { useTreasuryHuntContract } from "./useContract";

export const useGetGameIdCounts = () => {
  const { account: address, chainId } = useEthers();
  const TreasuryHuntInterface = new utils.Interface(TreasuryHuntABI.abi);
  const contract = useTreasuryHuntContract();

  const { value, error } =
    useCall({
      contract, // instance of called contract
      method: "gameIdCounter", // Method to be called
      args: [], // Method arguments - address to be checked for balance
    }) ?? {};
  if (error) {
    console.error(error.message);
    return 0;
  }

  return value?.[0]?.toString() ? Number(value?.[0]?.toString()) - 1 : 0;
};
