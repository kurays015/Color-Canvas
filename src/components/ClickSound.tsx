"use client";

import { useWeb3Context } from "@/context/Web3Context";

export default function ClickSound() {
  const { clickSound } = useWeb3Context();

  return <audio ref={clickSound} src="clickSound.wav" preload="auto" />;
}
