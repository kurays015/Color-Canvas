"use client";

import { WagmiProvider } from "wagmi";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import config from "../utils/wagmiConfig";
import { ReactNode } from "react";
import Web3ContextProvider from "@/context/Web3Context";
import dynamic from "next/dynamic";
import LoadingScreen from "@/components/LoadingScreen";

const queryClient = new QueryClient();

const DynamicReactTogether = dynamic(() => import("./ReactTogetherProvider"), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <DynamicReactTogether>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider>
            <Web3ContextProvider>{children}</Web3ContextProvider>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicReactTogether>
  );
}
