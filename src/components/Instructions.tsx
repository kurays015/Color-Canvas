export default function Instructions() {
  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="bg-gradient-to-br from-violet-600/10 via-purple-600/10 to-indigo-600/10 backdrop-blur-2xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-violet-500/20">
        <h4 className="text-lg sm:text-xl font-bold text-violet-100 mb-4 sm:mb-6 flex items-center justify-center gap-2">
          <span>💡</span> How to Create Amazing Art
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 text-violet-200/90">
          <div className="flex items-start gap-2 sm:gap-3">
            <span className="text-cyan-400 text-lg sm:text-xl">•</span>
            <span className="text-sm sm:text-base">
              Click any square to paint with your unique color
            </span>
          </div>
          <div className="flex items-start gap-2 sm:gap-3">
            <span className="text-pink-400 text-lg sm:text-xl">•</span>
            <span className="text-sm sm:text-base">
              Watch other artists create in real-time
            </span>
          </div>
          <div className="flex items-start gap-2 sm:gap-3">
            <span className="text-violet-400 text-lg sm:text-xl">•</span>
            <span className="text-sm sm:text-base">
              Share your session link to invite friends
            </span>
          </div>
          <div className="flex items-start gap-2 sm:gap-3">
            <span className="text-emerald-400 text-lg sm:text-xl">•</span>
            <span className="text-sm sm:text-base">
              Mint your masterpiece as an NFT when done!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
