"use client";

import { useWeb3Context } from "@/context/Web3Context";

export default function Status() {
  const { uploadStatus } = useWeb3Context();

  return (
    <>
      {uploadStatus && (
        <div
          className={`text-center p-3 rounded-lg break-all ${
            uploadStatus.includes("Error") || uploadStatus.includes("failed")
              ? "bg-red-900/20 border border-red-500/50 text-red-300"
              : uploadStatus.includes("🎉")
              ? "bg-green-900/20 border border-green-500/50 text-green-300"
              : "bg-blue-900/20 border border-blue-500/50 text-blue-300"
          }`}
        >
          <strong>Status:</strong> {uploadStatus}
        </div>
      )}
    </>
  );
}
