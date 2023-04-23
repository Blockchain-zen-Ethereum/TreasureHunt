import { Falsy, useContractFunction, useEthers } from "@usedapp/core";
import { useMockUSDTContract } from "./useContract";

export const useApproveUSDT = () => {
  const contract = useMockUSDTContract();
  const transactionName = "Approve USDT";
  const { state, send } = useContractFunction(contract, "approve", {
    transactionName,
  });
  return { state, send };
};
