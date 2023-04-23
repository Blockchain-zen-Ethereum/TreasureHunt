import { Falsy, useCall, useEthers } from "@usedapp/core";
import { useTreasuryHuntContract } from "./useContract";

export const useGetUserAmount = (address: string, gameId: number) => {
  const contract = useTreasuryHuntContract();

  const { value, error } =
    useCall(
      address && {
        contract, // instance of called contract
        method: "userParticipationAmount", // Method to be called
        args: [address, gameId], // Method arguments - address to be checked for balance
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return 0;
  }

  return value?.[0] ?? 0;
};
