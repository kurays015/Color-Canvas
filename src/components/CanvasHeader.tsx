import LeaveSessionButton from "@/components/LeaveSessionButton";
import ClearCanvasButton from "@/components/ClearCanvasButton";
import EraseButton from "@/components/EraseButton";
import MyColor from "@/components/MyColor";
import Users from "@/components/Users";

export default function CanvasHeader() {
  return (
    <div className="text-center mb-6 sm:mb-8">
      <div className="inline-flex items-center gap-2 sm:gap-3 bg-slate-900/40 backdrop-blur-2xl rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2 sm:py-3 border border-violet-500/20 mb-4 sm:mb-6 shadow-xl">
        <span className="text-xl sm:text-2xl">🎨</span>
        <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-violet-100">
          Collaborative Color Canvas
        </h1>
      </div>

      <p className="text-violet-200/80 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 px-4">
        Click any square to paint with your unique color • Real-time
        collaboration magic ✨
      </p>

      {/* Action buttons */}
      <div className="flex justify-center items-center gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 flex-wrap px-2">
        <MyColor />
        <EraseButton />
        <ClearCanvasButton />
        <LeaveSessionButton />
      </div>

      {/* Connected Users */}
      <Users />
    </div>
  );
}
