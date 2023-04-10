import { ethers } from 'ethers';
import Config from "../config.json";

const supportChainId = Number(Config.CHAINID || 421613);

export const RPCS = {
    5: "https://rpc.ankr.com/eth_goerli",
    97: "https://bsc-testnet.public.blastapi.io",
    250: "https://fantom-mainnet.gateway.pokt.network/v1/lb/62759259ea1b320039c9e7ac",
    4002: "https://fantom-testnet.public.blastapi.io",
    421613: "https://goerli-rollup.arbitrum.io/rpc"
};

const providers: any = {
    5: new ethers.providers.JsonRpcProvider(RPCS[5]),
    250: new ethers.providers.JsonRpcProvider(RPCS[250]),
    97: new ethers.providers.JsonRpcProvider(RPCS[97]),
    4002: new ethers.providers.JsonRpcProvider(RPCS[4002]),
    421613: new ethers.providers.JsonRpcProvider(RPCS[421613])
};

const provider = providers[supportChainId];

export { supportChainId, provider };
