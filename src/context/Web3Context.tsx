"use client";

import { GRID_HEIGHT, GRID_WIDTH } from "@/lib/constant";
import {
  createContext,
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
  useContext,
  useRef,
  useState,
} from "react";
import {
  useCreateRandomSession,
  useStateTogether,
  useStateTogetherWithPerUserValues,
} from "react-together";
import { useAccount } from "wagmi";

type Value = {
  isEraseMode: boolean;
  setIsEraseMode: Dispatch<SetStateAction<boolean>>;
  myColor: string | null;
  userAddress: `0x${string}` | undefined;
  createRandomSession: () => void;
  uploadStatus: string | null;
  setUploadStatus: Dispatch<SetStateAction<string | null>>;
  isUploading: boolean;
  setIsUploading: Dispatch<SetStateAction<boolean>>;
  gameGrid: (string | null)[];
  artRef: MutableRefObject<HTMLDivElement | null>;
  clickSound: MutableRefObject<HTMLAudioElement | null>;
  setMyColor: Dispatch<SetStateAction<string | null>>;
  allColors: { [key: string]: string | null };
  setGameGrid: Dispatch<SetStateAction<(string | null)[]>>;
  // hash: `0x${string} | undefined`
};

const Web3Context = createContext<Value | null>(null);

export default function Web3ContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isEraseMode, setIsEraseMode] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const clickSound = useRef<HTMLAudioElement | null>(null);
  const artRef = useRef<HTMLDivElement | null>(null);

  //react-together
  const [gameGrid, setGameGrid] = useStateTogether(
    "drawing-grid",
    Array(GRID_WIDTH * GRID_HEIGHT).fill(null) as (string | null)[]
  );
  const [myColor, setMyColor, allColors] = useStateTogetherWithPerUserValues(
    "player-colors",
    null as string | null
  );

  const createRandomSession = useCreateRandomSession();

  //web3
  const { address: userAddress } = useAccount();

  const value: Value = {
    isEraseMode,
    setIsEraseMode,
    myColor,
    userAddress,
    createRandomSession,
    uploadStatus,
    setUploadStatus,
    isUploading,
    setIsUploading,
    gameGrid,
    setGameGrid,
    artRef,
    clickSound,
    setMyColor,
    allColors,
    // hash
  };

  return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>;
}

export const useWeb3Context = () => {
  const context = useContext(Web3Context);

  if (!context) {
    throw new Error("Context must be inside of a provider");
  }
  return context;
};
