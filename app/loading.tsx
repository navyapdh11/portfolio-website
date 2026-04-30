export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0c1a3a 0%, #0a1628 25%, #0f2040 50%, #0a1628 75%, #0c1a3a 100%)",
      }}
    >
      {/* Gradient orbs */}
      <div
        className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-30 blur-[120px] animate-pulse"
        style={{
          background: "radial-gradient(circle, #0ea5e9 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
        style={{
          background: "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 text-center">
        {/* Spinner */}
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-slate-700/50"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-sky-500 animate-spin"></div>
        </div>

        {/* Skeleton text lines */}
        <div className="space-y-3 w-64 mx-auto">
          <div className="h-4 bg-slate-700/50 rounded-lg animate-pulse w-3/4 mx-auto"></div>
          <div className="h-3 bg-slate-700/40 rounded-lg animate-pulse w-1/2 mx-auto"></div>
          <div className="h-3 bg-slate-700/40 rounded-lg animate-pulse w-2/3 mx-auto"></div>
        </div>

        <p className="text-slate-400 mt-6 text-sm animate-pulse">Loading...</p>
      </div>
    </div>
  );
}
