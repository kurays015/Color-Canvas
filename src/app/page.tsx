import ArtistsChat from "@/components/ArtistsChat";
import BackgroundEffects from "@/components/BackgroundEffects";
import ClickSound from "@/components/ClickSound";
import MainContent from "@/components/MainContent";
import CustomConnectWallet from "@/components/CustomConnectWallet";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950 to-purple-950 overflow-hidden relative pt-10">
      <CustomConnectWallet />
      <BackgroundEffects />
      <ClickSound />
      <MainContent />
      <ArtistsChat />
    </div>
  );
}
