"use client";

import { useWeb3Context } from "@/context/Web3Context";

export default function EraseButton() {
  const { setIsEraseMode, isEraseMode } = useWeb3Context();

  return (
    <button
      onClick={() => setIsEraseMode(!isEraseMode)}
      className={`flex items-center gap-1 sm:gap-2 font-semibold px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 text-sm sm:text-base z-10 cursor-pointer ${
        isEraseMode
          ? "bg-red-500/30 hover:bg-red-500/40 text-red-200 border border-red-500/40"
          : "bg-orange-500/20 hover:bg-orange-500/30 text-orange-200 border border-orange-500/30"
      }`}
    >
      <span className="text-base sm:text-lg">{isEraseMode ? "🧽" : "✏️"}</span>
      <span className="hidden sm:inline">
        {isEraseMode ? "Exit Erase" : "Erase Mode"}
      </span>
      <span className="sm:hidden">{isEraseMode ? "Exit" : "Erase"}</span>
    </button>
  );
}
