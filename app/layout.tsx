import "./globals.css";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Healthcare Blockchain",
  description: "Secure Healthcare Data Management on Blockchain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
    throw new Error("NEXT_PUBLIC_PROJECT_ID is not defined");
  }
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

  const config = getDefaultConfig({
    appName: "Hospital Dapp",
    projectId: projectId,
    chains: [sepolia, mainnet, polygon, optimism, arbitrum, base],
    ssr: true,
  });

  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body className={inter.className}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider>
              <Navbar />
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
