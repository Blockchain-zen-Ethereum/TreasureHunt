import React, { useMemo } from "react";
import { useCall, useEthers, ThunderCoreTestnet } from "@usedapp/core";
import TreasuryHuntABI from "@/abis/TreasuryHunt.json";
import { utils } from "ethers";
import { Contract, ContractInterface } from "@ethersproject/contracts";
import ADDRESSES from "@/constants/addresses";
import { TypedContract } from "@usedapp/core/dist/esm/src/model";

export function useContract<T extends Contract>(
  address: string,
  ABI: ContractInterface
): T {
  return useMemo(() => {
    return new Contract(address, ABI);
  }, [address, ABI]) as T;
}

export const useGetGameIdCounts = () => {
  const { account: address, chainId } = useEthers();
  const TreasuryHuntInterface = new utils.Interface(TreasuryHuntABI.abi);

  const { value, error } =
    useCall({
      contract: new Contract(
        ADDRESSES[chainId ?? ThunderCoreTestnet.chainId].TREASURY_HUNT,
        TreasuryHuntInterface
      ), // instance of called contract
      method: "balanceOf", // Method to be called
      args: [], // Method arguments - address to be checked for balance
    }) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value?.[0];
};
