"use client";

import { useState } from "react";
import { useJoinUrl } from "react-together";

export default function ShareLink() {
  const [copySuccess, setCopySuccess] = useState(false);
  const joinUrl = useJoinUrl();
  if (!joinUrl) return null;

  const copyToClipboard = async () => {
    if (joinUrl) {
      try {
        await navigator.clipboard.writeText(joinUrl);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      } catch (err) {
        console.error("Failed to copy: ", err);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
      <div className="bg-slate-900/40 backdrop-blur-2xl rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-violet-500/20 shadow-xl">
        <h4 className="text-base sm:text-lg font-bold text-violet-100 mb-3 sm:mb-4 flex items-center justify-center gap-2">
          <span>🔗</span> Invite Friends to Collaborate
        </h4>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input
            type="text"
            value={joinUrl}
            readOnly
            className="flex-1 w-full p-2 sm:p-3 rounded-lg sm:rounded-xl bg-slate-800/50 border border-violet-500/30 text-violet-100 placeholder-violet-300/50 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50"
          />
          <button
            onClick={copyToClipboard}
            className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base whitespace-nowrap cursor-pointer ${
              copySuccess
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 border border-cyan-500/30"
            }`}
          >
            {copySuccess ? "✅ Copied!" : "📋 Copy Link"}
          </button>
        </div>
        <p className="text-violet-300/70 text-xs sm:text-sm mt-3 text-center">
          Share this link with friends to start drawing together!
        </p>
      </div>
    </div>
  );
}
