"use client";

import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useCallback, useEffect, useRef, useState } from "react";
import { useWeb3Context } from "@/context/Web3Context";
import { useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { useScreenshot } from "use-react-screenshot";
import { NFT_CONTRACT_ABI } from "@/utils/abi";
import { pinataAction } from "@/actions/pinataAction";
import { useConnectModal } from "@rainbow-me/rainbowkit";

type MintState =
  | "idle"
  | "screenshot"
  | "upload"
  | "mint"
  | "success"
  | "error";

export default function MintButton() {
  const [showMintAgain, setShowMintAgain] = useState(false);
  const [mintState, setMintState] = useState<MintState>("idle");
  const screenshotTimeoutRef = useRef<NodeJS.Timeout>();
  const retryCountRef = useRef(0);
  const maxRetries = 3;

  const [image, takeScreenshot] = useScreenshot({
    type: "image/png",
    quality: 0.95,
  });

  const { openConnectModal } = useConnectModal();

  const {
    userAddress,
    setUploadStatus,
    isUploading,
    gameGrid,
    setIsUploading,
    artRef,
  } = useWeb3Context();

  const {
    data: hash,
    isPending: isMintPending,
    writeContract: mint,
    error: mintError,
    reset: resetMint,
  } = useWriteContract();

  const {
    isLoading: isTxLoading,
    isSuccess: isMintComplete,
    error: txError,
  } = useWaitForTransactionReceipt({
    hash,
    query: { enabled: !!hash },
  });

  const isAnyLoading =
    isUploading || isMintPending || isTxLoading || mintState === "screenshot";
  const hasDrawing = gameGrid.some(cell => cell !== null);

  const mintNFT = useCallback(
    async (metadataIpfsLink: string | undefined) => {
      if (!metadataIpfsLink) {
        throw new Error("Missing metadata link");
      }

      try {
        setUploadStatus(
          "Preparing to mint... Please confirm transaction in your wallet"
        );

        mint({
          address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
          abi: NFT_CONTRACT_ABI,
          functionName: "mint",
          args: [userAddress, metadataIpfsLink],
        });

        setUploadStatus("Transaction submitted... Waiting for confirmation");
        console.log("🚀 Transaction submitted, waiting for confirmation...");
      } catch (error) {
        console.error("❌ Mint function error:", error);
        throw error;
      }
    },
    [mint, userAddress, setUploadStatus]
  );

  const handleRetry = useCallback(
    (errorMessage: string) => {
      if (retryCountRef.current < maxRetries) {
        retryCountRef.current++;
        setUploadStatus(
          `${errorMessage}. Retrying... (${retryCountRef.current}/${maxRetries})`
        );

        setTimeout(() => {
          if (artRef.current) {
            setMintState("screenshot");
            takeScreenshot(artRef.current);
          }
        }, 2000);
      } else {
        setUploadStatus(`${errorMessage}. Max retries reached.`);
        setMintState("error");
        setIsUploading(false);
        retryCountRef.current = 0;
      }
    },
    [artRef, takeScreenshot, setIsUploading, setUploadStatus]
  );

  const handleMint = useCallback(async () => {
    if (!hasDrawing) {
      setUploadStatus("Please draw something first!");
      return;
    }

    if (!userAddress) {
      setUploadStatus("Please connect your wallet first");
      return;
    }

    if (!artRef.current) {
      setUploadStatus("Canvas not found");
      return;
    }

    try {
      setIsUploading(true);
      setMintState("screenshot");
      setUploadStatus("Taking screenshot...");
      resetMint();
      retryCountRef.current = 0;

      takeScreenshot(artRef.current);

      screenshotTimeoutRef.current = setTimeout(() => {
        if (mintState === "screenshot") {
          console.error("❌ Screenshot timeout");
          handleRetry("Screenshot timeout");
        }
      }, 8000);
    } catch (error) {
      console.error("❌ Mint initiation error:", error);
      setUploadStatus(
        `Error: ${error instanceof Error ? error.message : String(error)}`
      );
      setMintState("error");
      setIsUploading(false);
    }
  }, [
    hasDrawing,
    userAddress,
    artRef,
    takeScreenshot,
    resetMint,
    mintState,
    handleRetry,
    setIsUploading,
    setUploadStatus,
  ]);

  const uploadToIPFS = useCallback(
    async (screenshotImage: string) => {
      try {
        setUploadStatus("Uploading to IPFS...");

        const pinata = await pinataAction({
          userAddress: userAddress!,
          screenshotImage,
        });

        if (!pinata?.success) {
          throw new Error("IPFS upload failed");
        }

        setUploadStatus(pinata.status);
        setMintState("mint");
        await mintNFT(pinata.metadataIpfsLink);
      } catch (error) {
        console.error("❌ Upload error:", error);
        handleRetry(
          `Upload failed: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      }
    },
    [userAddress, handleRetry, mintNFT, setUploadStatus]
  );

  // Consolidated useEffect for all state management
  useEffect(() => {
    if (mintState === "screenshot" && image && userAddress) {
      console.log("📸 Screenshot captured successfully");
      if (screenshotTimeoutRef.current) {
        clearTimeout(screenshotTimeoutRef.current);
      }
      setMintState("upload");
      uploadToIPFS(image);
      return;
    }

    // Handle mint completion
    if (isMintComplete && mintState !== "success") {
      setMintState("success");
      setShowMintAgain(false);
      retryCountRef.current = 0;
      console.log("✅ Successfully minted!", hash);
      setUploadStatus("✅ Successfully Minted! 🎉");
      setIsUploading(false);

      const timer = setTimeout(() => {
        setShowMintAgain(true);
      }, 5000);

      return () => clearTimeout(timer);
    }

    // Handle errors
    if (mintError || txError) {
      const error = mintError || txError;
      console.error("❌ Transaction error:", error);
      setUploadStatus(`Transaction failed: ${(error as Error).message}`);
      setMintState("error");
      setIsUploading(false);
      return;
    }

    return () => {
      if (screenshotTimeoutRef.current) {
        clearTimeout(screenshotTimeoutRef.current);
      }
    };
  }, [
    image,
    mintState,
    userAddress,
    isMintComplete,
    mintError,
    txError,
    hash,
    uploadToIPFS,
    setIsUploading,
    setUploadStatus,
  ]);

  const getButtonConfig = () => {
    if (!userAddress) {
      return {
        text: "Connect Wallet to Mint",
        icon: "🔗",
        disabled: false,
        onClick: openConnectModal,
        className:
          "bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 hover:from-blue-400 hover:via-purple-400 hover:to-blue-500",
      };
    }

    if (isAnyLoading) {
      return {
        text: "Processing...",
        icon: (
          <AiOutlineLoading3Quarters className="inline-block animate-spin text-lg sm:text-xl" />
        ),
        disabled: true,
        onClick: undefined,
        className:
          "bg-gray-600 text-gray-300 border-gray-500/30 cursor-not-allowed",
      };
    }

    if (isMintComplete && !showMintAgain) {
      return {
        text: "NFT Minted!",
        icon: "✅",
        disabled: true,
        onClick: undefined,
        className:
          "bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white border-green-400/30 shadow-green-500/40",
      };
    }

    if (isMintComplete && showMintAgain) {
      return {
        text: "Mint Again",
        icon: "🔄",
        disabled: false,
        onClick: handleMint,
        className:
          "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:via-orange-400 hover:to-amber-500",
      };
    }

    if (!hasDrawing) {
      return {
        text: "Draw to Mint",
        icon: "",
        disabled: !hasDrawing,
        onClick: undefined,
        className: hasDrawing
          ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:via-orange-400 hover:to-amber-500"
          : "bg-gray-600 text-gray-300 border-gray-500/30 cursor-not-allowed",
      };
    }

    return {
      text: "Mint as NFT",
      icon: "💎",
      disabled: !hasDrawing,
      onClick: handleMint,
      className: hasDrawing
        ? "bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:via-orange-400 hover:to-amber-500"
        : "bg-gray-600 text-gray-300 border-gray-500/30 cursor-not-allowed",
    };
  };

  const buttonConfig = getButtonConfig();

  return (
    <div className="flex justify-center mb-6 sm:mb-8 px-4">
      <button
        disabled={buttonConfig.disabled}
        onClick={buttonConfig.onClick}
        className={`group relative overflow-hidden font-bold text-base sm:text-lg lg:text-xl px-6 sm:px-8 lg:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl shadow-2xl transform transition-all duration-300 border ${
          buttonConfig.className
        } ${
          !buttonConfig.disabled
            ? "hover:scale-105 hover:-translate-y-1 cursor-pointer text-white border-amber-400/30 shadow-amber-500/40"
            : ""
        }`}
        aria-label={buttonConfig.text}
      >
        {/* Shimmer effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 transition-opacity duration-300 ${
            !buttonConfig.disabled ? "group-hover:opacity-100" : ""
          }`}
        />

        <span
          className={`mr-2 sm:mr-3 relative z-10 ${
            !buttonConfig.disabled ? "group-hover:animate-bounce" : ""
          }`}
        >
          {buttonConfig.icon}
        </span>

        <span className="relative z-10">{buttonConfig.text}</span>

        {/* Sparkle effect */}
        {!buttonConfig.disabled && userAddress && (
          <span
            className={`ml-2 sm:ml-3 text-base sm:text-lg relative z-10 transition-transform ${
              !buttonConfig.disabled ? "group-hover:translate-x-1" : ""
            }`}
          >
            ✨
          </span>
        )}
      </button>
    </div>
  );
}
