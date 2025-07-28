"use client";

import { useWeb3Context } from "@/context/Web3Context";
import { useViewId } from "@multisynq/react";
import { ReactNode } from "react";
import { useHoveringUsers } from "react-together";

type HoverHighlighterProps = {
  rtKey: string;
  children: ReactNode;
  className?: string;
  highlightMyself?: boolean;
  customColor?: string | null;
};

export default function HoverHighlighter({
  rtKey,
  children,
  className,
  highlightMyself = true,
}: HoverHighlighterProps) {
  const [ref, hoveringUsers, isHovering] = useHoveringUsers(rtKey);
  const myId = useViewId();
  const { allColors } = useWeb3Context();

  const users = highlightMyself
    ? hoveringUsers
    : hoveringUsers.filter(v => v !== myId);

  const isHighlighted = users.length > 0 || (highlightMyself && isHovering);
  const color = isHighlighted ? allColors[hoveringUsers[0]] || "#ffffff" : null;

  return (
    <div
      ref={ref}
      className={`
        relative
        transition-all duration-200 ease-in-out
        ${isHighlighted ? "z-10 scale-105" : ""}
        ${className || ""}
      `}
      style={
        isHighlighted
          ? {
              outline: `3px solid ${color}`,
              outlineOffset: "1px",
              boxShadow: `
          0 0 0 1px ${color}, 
          0 0 12px ${color}60,
          0 0 20px ${color}30,
          inset 0 0 6px ${color}20
        `,
              borderRadius: "3px",
              filter: "brightness(1.1)",
            }
          : {}
      }
    >
      {/* Animated background overlay for extra visibility */}
      {isHighlighted && (
        <div
          className="absolute inset-0 pointer-events-none rounded animate-pulse"
          style={{
            background: `linear-gradient(45deg, ${color}10, ${color}20, ${color}10)`,
            zIndex: -1,
          }}
        />
      )}
      {children}
    </div>
  );
}
