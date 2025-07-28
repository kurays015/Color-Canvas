import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { monadTestnet } from "wagmi/chains";

const config = getDefaultConfig({
  appName: "Color Canvas",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  chains: [monadTestnet],
});

export default config;
