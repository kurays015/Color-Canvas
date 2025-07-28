"use client";

import { GRID_HEIGHT, GRID_WIDTH } from "../lib/constant";
import { useWeb3Context } from "@/context/Web3Context";
import HoverHighlighter from "@/components/Hover";

export default function DrawingGrid() {
  const { gameGrid, myColor, isEraseMode, artRef, clickSound, setGameGrid } =
    useWeb3Context();

  const handleCellClick = (index: number) => {
    if (clickSound.current) clickSound.current.play();

    // Ensure gameGrid is always an array
    const currentGrid = Array.isArray(gameGrid)
      ? gameGrid
      : Array(GRID_WIDTH * GRID_HEIGHT).fill(null);

    if (isEraseMode) {
      if (currentGrid[index] === myColor) {
        setGameGrid(prev => {
          const safeGrid = Array.isArray(prev)
            ? prev
            : Array(GRID_WIDTH * GRID_HEIGHT).fill(null);
          const newGrid = [...safeGrid];
          newGrid[index] = null;
          return newGrid;
        });
      }
    } else {
      if (!myColor) return;

      if (currentGrid[index] === null || !currentGrid[index]) {
        setGameGrid(prev => {
          const safeGrid = Array.isArray(prev)
            ? prev
            : Array(GRID_WIDTH * GRID_HEIGHT).fill(null);
          const newGrid = [...safeGrid];
          newGrid[index] = myColor;
          return newGrid;
        });
      }
    }
  };

  return (
    <div className="flex justify-center mb-6 sm:mb-8 px-2">
      <div className="bg-slate-900/40 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border border-violet-500/20 shadow-2xl w-full max-w-6xl">
        <div className="text-center mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-violet-100 flex items-center justify-center gap-2">
            <span>🖼️</span> Drawing Canvas
          </h3>
        </div>
        <div className="bg-gradient-to-br from-slate-800/50 via-violet-900/30 to-purple-900/50 rounded-lg my-8 shadow-inner overflow-hidden border border-violet-500/30 p-3 justify-center flex">
          <div
            ref={artRef}
            className="grid gap-[1px] bg-gray-200"
            style={{
              gridTemplateColumns: `repeat(${GRID_WIDTH}, 1fr)`,
              gridTemplateRows: `repeat(${GRID_HEIGHT}, 1fr)`,
              width: "100%",
              maxWidth: "960px",
              aspectRatio: `${GRID_WIDTH} / ${GRID_HEIGHT}`,
            }}
          >
            {gameGrid.map((cellColor, index) => (
              <HoverHighlighter rtKey={`cell-${index}`} key={index}>
                <button
                  onClick={() => handleCellClick(index)}
                  className={`w-full h-full transition-all duration-200 relative ${
                    isEraseMode && gameGrid[index] === myColor
                      ? "hover:bg-red-400/80 hover:shadow-inner hover:shadow-red-500/50"
                      : "hover:brightness-125 hover:shadow-sm hover:shadow-violet-400/30"
                  }`}
                  style={{
                    backgroundColor: cellColor || "#1e293b",
                    minHeight: "12px",
                    minWidth: "12px",
                  }}
                  title={
                    isEraseMode
                      ? cellColor
                        ? "Click to erase this cell"
                        : "Empty cell"
                      : "Click to paint"
                  }
                >
                  {isEraseMode && gameGrid[index] === myColor && (
                    <div className="absolute inset-0 bg-red-500/40 opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-red-200 text-xs font-bold drop-shadow-lg">
                        ×
                      </span>
                    </div>
                  )}

                  {cellColor && (
                    <div
                      className="absolute inset-0 opacity-20 blur-sm"
                      style={{
                        backgroundColor: cellColor,
                        filter: "brightness(1.5)",
                      }}
                    />
                  )}
                </button>
              </HoverHighlighter>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
