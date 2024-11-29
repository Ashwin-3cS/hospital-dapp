// wagmi.ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, Chain } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

// Define the chain type explicitly
type SepoliaChain = Chain & {
  id: 11155111;
  network: 'sepolia';
  name: 'Sepolia Testnet';
};

// Custom Sepolia Testnet configuration
export const Sepolia: SepoliaChain = {
  id: 11155111,
  name: 'Sepolia Testnet',
  network: 'sepolia',
  nativeCurrency: {
    name: 'SepoliaETH',
    symbol: 'SepoliaETH',
    decimals: 18,
  },
  rpcUrls: {
    default: 'https://sepolia.infura.io/v3/4066181504164da3a9bd66e624cf82ac',
  },
  blockExplorers: {
    default: { name: 'Etherscan', url: 'https://sepolia.etherscan.io' },
  },
  testnet: true,
} as const;

export const { chains, provider } = configureChains(
  [Sepolia],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        // Type guard for Sepolia chain
        if (chain && 'id' in chain && chain.id === Sepolia.id) {
          return {
            http: Sepolia.rpcUrls.default,
            webSocket: undefined,
          };
        }
        return null;
      },
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'CrowdFundingDapp',
  chains,
});

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});