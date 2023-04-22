import { Config } from "@usedapp/core";
import { ThunderCoreTestnet, ThunderCore } from "@usedapp/core";
import { getDefaultProvider } from "ethers";

export const config: Config = {
  readOnlyChainId: ThunderCoreTestnet.chainId,
  readOnlyUrls: {
    [ThunderCoreTestnet.chainId]: ThunderCoreTestnet.rpcUrl ?? "",
    [ThunderCore.chainId]: ThunderCore.rpcUrl ?? "",
  },
};
