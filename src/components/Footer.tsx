import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative border-t border-violet-400/20 bg-gradient-to-r from-slate-900/80 via-violet-900/50 to-purple-900/80 backdrop-blur-sm py-8 px-4 mt-auto">
      {/* Subtle glow effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-violet-500/5 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto flex items-center justify-center gap-4 text-sm">
        <span className="text-violet-200/80 font-medium">Made with</span>

        <div className="relative group">
          <div className="absolute inset-0 bg-violet-400/20 rounded-full blur-md group-hover:bg-violet-400/30 transition-all duration-300"></div>
          <div className="relative bg-gradient-to-br from-violet-600/20 to-purple-600/20 p-2 rounded-full border border-violet-400/30 backdrop-blur-sm">
            <Image
              src="/monad.svg"
              alt="monad"
              width={32}
              height={32}
              className="inline-block filter drop-shadow-sm"
            />
            <span className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-xs">
              💜
            </span>
          </div>
        </div>

        <span className="text-violet-200/80 font-medium">by</span>

        <Link
          href="https://x.com/constkurays"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group cursor-pointer px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-400/30 text-violet-100 hover:text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 hover:border-violet-400/50 backdrop-blur-sm"
        >
          <span className="relative z-10">@Kurays</span>
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/0 to-purple-500/0 group-hover:from-violet-500/10 group-hover:to-purple-500/10 rounded-full transition-all duration-300"></div>
        </Link>
      </div>

      {/* Decorative dots */}
      <div className="absolute top-4 left-8 w-1 h-1 bg-violet-400/40 rounded-full"></div>
      <div className="absolute top-6 left-12 w-0.5 h-0.5 bg-purple-400/30 rounded-full"></div>
      <div className="absolute top-4 right-8 w-1 h-1 bg-purple-400/40 rounded-full"></div>
      <div className="absolute top-6 right-12 w-0.5 h-0.5 bg-violet-400/30 rounded-full"></div>
    </footer>
  );
}
