export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-violet-950 to-purple-950 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-16 h-16 border-4 border-violet-500/30 border-t-violet-400 rounded-full mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold text-violet-100">
          Loading Canvas...
        </h1>
      </div>
    </div>
  );
}
