import { useCall } from "@usedapp/core";
import { useMockUSDTContract } from "./useContract";
import ADDRESSES from "@/constants/addresses";
import { useEthers, ThunderCoreTestnet } from "@usedapp/core";

export const useGetUSDTAllowance = () => {
  const { account, chainId } = useEthers();
  const address = account ?? "";
  const contract = useMockUSDTContract();
  const treasureHuntAddress =
    ADDRESSES[chainId ?? ThunderCoreTestnet.chainId].TREASURY_HUNT;
  const { value, error } =
    useCall(
      address && {
        contract, // instance of called contract
        method: "allowance", // Method to be called
        args: [address, treasureHuntAddress], // Method arguments - address to be checked for balance
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return 0;
  }

  return value?.[0]?.toString();
};
