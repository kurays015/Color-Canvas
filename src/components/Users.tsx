"use client";

import { ConnectedUsers } from "react-together";

export default function Users() {
  return (
    <div className="flex items-center gap-2 justify-center mb-6 sm:mb-8 px-4">
      <p className="font-semibold text-violet-200 text-sm sm:text-base">
        Connected Users:
      </p>
      <div className="bg-slate-900/50 backdrop-blur-lg rounded-lg sm:rounded-2xl px-3 sm:px-6 py-2 sm:py-4 border border-violet-500/30">
        <ConnectedUsers maxAvatars={10} />
      </div>
    </div>
  );
}
