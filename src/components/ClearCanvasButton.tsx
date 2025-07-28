"use client";

import { useWeb3Context } from "@/context/Web3Context";

export default function ClearCanvasButton() {
  const { setGameGrid, setIsEraseMode, myColor } = useWeb3Context();

  const clearCanvas = () => {
    setGameGrid(prev => {
      const newGrid = prev.map(cellColor => {
        return cellColor === myColor ? null : cellColor;
      });
      return newGrid;
    });
    setIsEraseMode(false);
  };

  return (
    <button
      onClick={clearCanvas}
      className="flex items-center gap-1 sm:gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 font-semibold px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 text-sm sm:text-base z-10 cursor-pointer"
    >
      <span className="text-base sm:text-lg">🗑️</span>
      <span className="hidden sm:inline">Clear All</span>
      <span className="sm:hidden">Clear</span>
    </button>
  );
}
