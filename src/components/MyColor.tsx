"use client";

import { useWeb3Context } from "@/context/Web3Context";
import { COLORS } from "@/lib/constant";
import { useEffect } from "react";

// Type definitions
interface RgbColor {
  r: number;
  g: number;
  b: number;
}

type HexColor = string;

// Utility function to generate a random hex color that's visually distinct
function generateRandomColor(usedColors: HexColor[] = []): HexColor {
  let attempts = 0;
  const maxAttempts = 50;

  while (attempts < maxAttempts) {
    // Generate random RGB values with good visibility
    const r = Math.floor(Math.random() * 156) + 100; // 100-255 for brightness
    const g = Math.floor(Math.random() * 156) + 100;
    const b = Math.floor(Math.random() * 156) + 100;

    const color: HexColor = `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

    // Check if this color is sufficiently different from used colors
    if (isColorDistinct(color, usedColors)) {
      return color;
    }

    attempts++;
  }

  // Fallback: return a timestamp-based color if we can't find a distinct one
  const timestamp: number = Date.now();
  return `#${((timestamp & 0xffffff) | 0x808080)
    .toString(16)
    .padStart(6, "0")}` as HexColor;
}

// Check if a color is visually distinct from existing colors
function isColorDistinct(
  newColor: HexColor,
  usedColors: HexColor[],
  minDistance: number = 100
): boolean {
  if (usedColors.length === 0) return true;

  const newRgb: RgbColor | null = hexToRgb(newColor);
  if (!newRgb) return true;

  return usedColors.every(usedColor => {
    const usedRgb: RgbColor | null = hexToRgb(usedColor);
    if (!usedRgb) return true;

    // Calculate Euclidean distance in RGB space
    const distance: number = Math.sqrt(
      Math.pow(newRgb.r - usedRgb.r, 2) +
        Math.pow(newRgb.g - usedRgb.g, 2) +
        Math.pow(newRgb.b - usedRgb.b, 2)
    );

    return distance >= minDistance;
  });
}

// Convert hex to RGB
function hexToRgb(hex: HexColor): RgbColor | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

// Shuffle array using Fisher-Yates algorithm for better randomness
function shuffleArray<T>(array: T[]): T[] {
  const shuffled: T[] = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j: number = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function MyColor() {
  const { myColor, isEraseMode, allColors, setMyColor } = useWeb3Context();

  useEffect(() => {
    // Only assign color once when myColor is null
    if (myColor === null) {
      // Get currently used colors, filtering out null/undefined values
      const usedColors: HexColor[] = Object.values(allColors).filter(
        (color): color is HexColor =>
          color !== null &&
          color !== undefined &&
          typeof color === "string" &&
          color.startsWith("#")
      );

      // Find available colors from the predefined palette
      const availableColors: HexColor[] = COLORS.filter(
        color => !usedColors.includes(color)
      );

      let assignColor: HexColor;

      if (availableColors.length > 0) {
        // Shuffle available colors for better distribution
        const shuffledColors: HexColor[] = shuffleArray(availableColors);
        assignColor = shuffledColors[0]; // Take the first from shuffled array
      } else {
        // Generate a random color that's visually distinct from used colors
        assignColor = generateRandomColor(usedColors);
      }

      setMyColor(assignColor);
    }
  }, [myColor, setMyColor, allColors]); // Removed allColors dependency

  return (
    <>
      {myColor && !isEraseMode ? (
        <div className="flex items-center gap-2 sm:gap-3 bg-slate-900/50 backdrop-blur-lg rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 border border-violet-500/30">
          <span className="text-violet-200 font-medium text-sm sm:text-base">
            Your Color:
          </span>
          <div
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-2 border-violet-400/50 shadow-lg"
            style={{ backgroundColor: myColor }}
          ></div>
          <span className="text-violet-200/80 text-xs sm:text-sm">
            {myColor}
          </span>
        </div>
      ) : (
        <div className="flex items-center gap-2 sm:gap-3 bg-slate-900/30 backdrop-blur-lg rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 border border-violet-500/20">
          <span className="text-violet-300/60 font-medium text-sm sm:text-base">
            Assigning color...
          </span>
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg border-2 border-violet-400/30 bg-gray-500/30 animate-pulse" />
        </div>
      )}
    </>
  );
}
