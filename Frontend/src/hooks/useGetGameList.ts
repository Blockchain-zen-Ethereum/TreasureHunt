import { Falsy, useCall, useEthers } from "@usedapp/core";
import { useTreasuryHuntContract } from "./useContract";

export const useGetGameList = () => {
  const contract = useTreasuryHuntContract();

  const { value, error } =
    useCall({
      contract, // instance of called contract
      method: "getGames", // Method to be called
      args: [], // Method arguments - address to be checked for balance
    }) ?? {};
  if (error) {
    console.error(error.message);
    return [];
  }

  return value?.[0] ?? [];
};
