export default function BackgroundEffects() {
  return (
    <>
      {/* Animated background elements */}
      {/* Animated background elements - reduced complexity */}
      <div className="absolute inset-0 -z-50">
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-60 sm:w-80 h-60 sm:h-80 bg-violet-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/4 sm:top-1/3 right-10 sm:right-20 w-72 sm:w-96 h-72 sm:h-96 bg-purple-500/8 rounded-full blur-3xl"
          style={{
            animation: "bounce 6s infinite",
            animationTimingFunction: "ease-in-out",
          }}
        ></div>
        <div
          className="absolute bottom-10 sm:bottom-20 left-1/4 w-60 sm:w-72 h-60 sm:h-72 bg-indigo-500/8 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Static positioned floating particles for better performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-2 h-2 bg-violet-400/20 animate-pulse top-[15%] left-[10%]"
          style={{ animationDelay: "0s", animationDuration: "3s" }}
        />
        <div
          className="absolute w-1 h-1 bg-purple-300/15 animate-bounce top-[25%] left-[20%]"
          style={{ animationDelay: "0.5s", animationDuration: "4s" }}
        />
        <div
          className="absolute w-2 h-2 bg-indigo-400/15 animate-pulse top-[35%] left-[30%]"
          style={{ animationDelay: "1s", animationDuration: "5s" }}
        />
        <div
          className="absolute w-2 h-2 bg-violet-400/20 animate-pulse top-[45%] left-[40%]"
          style={{ animationDelay: "1.5s", animationDuration: "3s" }}
        />
        <div
          className="absolute w-1 h-1 bg-purple-300/15 animate-bounce top-[55%] left-[50%]"
          style={{ animationDelay: "2s", animationDuration: "4s" }}
        />
        <div
          className="absolute w-2 h-2 bg-indigo-400/15 animate-pulse top-[65%] left-[60%]"
          style={{ animationDelay: "2.5s", animationDuration: "5s" }}
        />
        <div
          className="absolute w-2 h-2 bg-violet-400/20 animate-pulse top-[75%] left-[70%]"
          style={{ animationDelay: "3s", animationDuration: "3s" }}
        />
        <div
          className="absolute w-1 h-1 bg-purple-300/15 animate-bounce top-[85%] left-[80%]"
          style={{ animationDelay: "3.5s", animationDuration: "4s" }}
        />
      </div>
    </>
  );
}
