import { Falsy, useContractFunction, useEthers } from "@usedapp/core";
import { useTreasuryHuntContract } from "./useContract";

export const useJoinGame = () => {
  const contract = useTreasuryHuntContract();
  const transactionName = "Join Game";
  const { state, send } = useContractFunction(contract, "joinGame", {
    transactionName,
  });
  return { state, send };
};
