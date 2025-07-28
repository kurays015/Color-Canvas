"use client";

import CanvasHeader from "@/components/CanvasHeader";
import DrawingGrid from "@/components/DrawingGrid";
import Instructions from "@/components/Instructions";
import MintButton from "@/components/Mintbutton";
import ShareLink from "@/components/ShareLink";
import Status from "@/components/Status";
import SessionCreation from "./SessionCreation";
import { useJoinUrl } from "react-together";

export default function MainContent() {
  const joinUrl = useJoinUrl();

  if (!joinUrl) {
    return <SessionCreation />;
  }

  return (
    <div className="">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        <CanvasHeader />
        <DrawingGrid />
        <MintButton />
        <Status />
        <ShareLink />
        <Instructions />
      </div>
    </div>
  );
}
