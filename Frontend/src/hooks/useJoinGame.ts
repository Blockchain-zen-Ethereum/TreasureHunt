import { Falsy, useContractFunction, useEthers } from "@usedapp/core";
import { useTreasuryHuntContract } from "./useContract";

export const useJoinGame = async (gameId: number) => {
  const contract = useTreasuryHuntContract();
  const { state, send } = useContractFunction(contract, "joinGame");
  const tx = await send(gameId);
  return { state, tx };
};
