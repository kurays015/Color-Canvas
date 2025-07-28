import ArtistsChat from "@/components/ArtistsChat";
import BackgroundEffects from "@/components/BackgroundEffects";
import ClickSound from "@/components/ClickSound";
import MainContent from "@/components/MainContent";
import CustomConnectWallet from "@/components/CustomConnectWallet";

export default function Home() {
  return (
    <div className=" p-10">
      <CustomConnectWallet />
      <BackgroundEffects />
      <ClickSound />
      <MainContent />
      <ArtistsChat />
    </div>
  );
}
