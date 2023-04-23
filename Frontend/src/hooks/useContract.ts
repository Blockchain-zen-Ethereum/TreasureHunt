import React, { useMemo } from "react";
import { useEthers, ThunderCoreTestnet } from "@usedapp/core";
import TreasuryHuntABI from "@/abis/TreasureHunt.json";
import ERC20MockABI from "@/abis/ERC20Mock.json";
import { utils } from "ethers";
import { Contract, ContractInterface } from "@ethersproject/contracts";
import ADDRESSES from "@/constants/addresses";
import { TypedContract } from "@usedapp/core/dist/esm/src/model";
import { TreasureHunt } from "@/abis/types/TreasureHunt";
import { ERC20Mock } from "@/abis/types/ERC20Mock";

export function useContract<T extends Contract>(
  address: string,
  ABI: ContractInterface
): T {
  return useMemo(() => {
    return new Contract(address, ABI);
  }, [address, ABI]) as T;
}

export const useTreasuryHuntContract = () => {
  const { chainId } = useEthers();
  const address = ADDRESSES[chainId ?? ThunderCoreTestnet.chainId];
  return useContract<TreasureHunt>(
    address.TREASURY_HUNT,
    new utils.Interface(TreasuryHuntABI.abi)
  );
};

export const useMockUSDTContract = () => {
  const { chainId } = useEthers();
  const address = ADDRESSES[chainId ?? ThunderCoreTestnet.chainId];
  return useContract<ERC20Mock>(
    address.MOCK_USDT_TOKEN,
    new utils.Interface(ERC20MockABI.abi)
  );
};
