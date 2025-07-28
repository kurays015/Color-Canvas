"use client";

import CanvasHeader from "@/components/CanvasHeader";
import DrawingGrid from "@/components/DrawingGrid";
import Instructions from "@/components/Instructions";
import MintButton from "@/components/Mintbutton";
import ShareLink from "@/components/ShareLink";
import Status from "@/components/Status";
import { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import SessionCreation from "./SessionCreation";
import { useJoinUrl } from "react-together";

export default function MainContent() {
  const [loading, setLoading] = useState(true);
  const joinUrl = useJoinUrl();

  // Loading timer
  useEffect(() => {
    const timeOut = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeOut);
  }, []);

  if (loading) return <LoadingScreen />;

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
