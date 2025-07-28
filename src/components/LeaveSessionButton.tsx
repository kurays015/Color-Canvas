"use client";

import { useRouter } from "next/navigation";
import { useLeaveSession } from "react-together";

export default function LeaveSessionButton() {
  const leaveSession = useLeaveSession();
  const router = useRouter();

  const handleLeaveSession = () => {
    leaveSession();
    router.push("/canvas");
  };

  return (
    <button
      onClick={handleLeaveSession}
      className="flex items-center gap-1 sm:gap-2 bg-slate-800/50 hover:bg-slate-700/50 text-violet-200 border border-violet-500/30 font-semibold px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 text-sm sm:text-base z-10 cursor-pointer"
    >
      <span className="text-base sm:text-lg">🚪</span>
      <span className="hidden sm:inline">Leave Session</span>
      <span className="sm:hidden">Leave</span>
    </button>
  );
}
