"use client";

import { useSearchParams } from "next/navigation";
import { useCreateRandomSession } from "react-together";
import { useState } from "react";

export default function SessionCreation() {
  const createRandomSession = useCreateRandomSession();
  const [sessionLink, setSessionLink] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const rtName = searchParams.get("rtName");

  const handleJoinSession = () => {
    if (!sessionLink.trim()) {
      setError("Please paste a session link");
      return;
    }

    try {
      setIsJoining(true);
      setError("");

      // Extract URL parameters from the pasted link
      const url = new URL(sessionLink);
      const rtName = url.searchParams.get("rtName");
      const rtPwd =
        url.hash.replace("#rtPwd=", "") || url.searchParams.get("rtPwd");

      if (!rtName) {
        setError("Invalid session link format");
        setIsJoining(false);
        return;
      }

      // Construct the join URL with parameters
      let joinUrl = `/?rtName=${encodeURIComponent(rtName)}`;
      if (rtPwd) {
        joinUrl += `#rtPwd=${encodeURIComponent(rtPwd)}`;
      }

      // Navigate to the session
      window.location.href = joinUrl;
    } catch (err) {
      console.log(err);
      setError("Invalid session link format");
      setIsJoining(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSessionLink(e.target.value);
    if (error) setError(""); // Clear error when user types
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleJoinSession();
    }
  };

  // If rtName exists, show joining/creating session message
  if (rtName) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950 to-purple-950 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0">
          <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-60 sm:w-80 h-60 sm:h-80 bg-violet-500/15 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-48 sm:w-64 h-48 sm:h-64 bg-purple-500/12 rounded-full blur-2xl animate-bounce"
            style={{ animationDuration: "6s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-fuchsia-400/8 rounded-full blur-3xl animate-ping"
            style={{ animationDuration: "8s" }}
          ></div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-md w-full">
            <div className="bg-slate-900/40 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-violet-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-purple-900/10 to-indigo-900/15 pointer-events-none"></div>

              <div className="relative z-10 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-2xl border border-violet-400/30">
                  <span className="text-2xl sm:text-3xl animate-spin">⏳</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-violet-100 mb-3">
                  Setting up your Session...
                </h2>

                <p className="text-violet-200/80 text-base sm:text-lg leading-relaxed mb-6">
                  Please wait while we set up your collaborative drawing
                  session.
                </p>

                <div className="bg-slate-800/50 rounded-lg px-4 py-3 border border-violet-500/30">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-violet-300 text-sm">Session ID:</span>
                    <span className="text-violet-100 font-mono text-sm bg-slate-700/50 px-2 py-1 rounded">
                      {rtName}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-center space-x-2">
                  <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950 to-purple-950 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-60 sm:w-80 h-60 sm:h-80 bg-violet-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-48 sm:w-64 h-48 sm:h-64 bg-purple-500/12 rounded-full blur-2xl animate-bounce"
          style={{ animationDuration: "6s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-fuchsia-400/8 rounded-full blur-3xl animate-ping"
          style={{ animationDuration: "8s" }}
        ></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-md w-full">
          <div className="bg-slate-900/40 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl border border-violet-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-purple-900/10 to-indigo-900/15 pointer-events-none"></div>

            <div className="relative z-10">
              <div className="text-center mb-6 sm:mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl sm:rounded-3xl mb-4 sm:mb-6 shadow-2xl border border-violet-400/30">
                  <span className="text-2xl sm:text-3xl">🎨</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-violet-100 mb-3">
                  Ready to Create?
                </h2>
                <p className="text-violet-200/80 text-base sm:text-lg leading-relaxed">
                  Create a new session or join an existing one by pasting the
                  session link!
                </p>
              </div>

              <div className="space-y-4 sm:space-y-5">
                {/* Create New Session Button */}
                <button
                  onClick={() => createRandomSession()}
                  className="w-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 hover:from-violet-500 hover:via-purple-500 hover:to-indigo-500 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl text-base sm:text-lg shadow-xl transform hover:scale-105 transition-all duration-300 border border-violet-400/30 cursor-pointer"
                >
                  <span className="mr-2">🚀</span>
                  Create New Session
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-violet-500/30"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-slate-900/40 text-violet-300/80 font-medium">
                      or
                    </span>
                  </div>
                </div>

                {/* Join Session Section */}
                <div className="space-y-3">
                  <label className="block text-violet-200 text-sm font-medium mb-2">
                    <span className="mr-2">🔗</span>
                    Join Existing Session
                  </label>

                  <div className="relative">
                    <input
                      type="text"
                      value={sessionLink}
                      onChange={handleInputChange}
                      onKeyPress={handleKeyPress}
                      placeholder="Paste session link here..."
                      className="w-full bg-slate-800/50 border border-violet-500/30 rounded-lg px-4 py-3 text-violet-100 placeholder-violet-300/50 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-200"
                    />
                    {error && (
                      <p className="text-red-400 text-sm mt-2 flex items-center">
                        <span className="mr-1">⚠️</span>
                        {error}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleJoinSession}
                    disabled={!sessionLink.trim() || isJoining}
                    className="w-full bg-slate-800/50 hover:bg-slate-700/50 disabled:bg-slate-800/30 disabled:cursor-not-allowed text-violet-100 disabled:text-violet-300/50 font-semibold py-3 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl transition-all duration-300 border border-violet-500/30 disabled:border-violet-500/20"
                  >
                    {isJoining ? (
                      <>
                        <span className="mr-2">⏳</span>
                        Joining...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">🚪</span>
                        Join Session
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-6 sm:mt-8 text-center">
                <p className="text-violet-300/60 text-sm">
                  ✨ Your creative space will be ready instantly!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
