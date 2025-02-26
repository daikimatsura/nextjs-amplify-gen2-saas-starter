import ReturnHomeButton from "@/components/ui/buttons/ReturnHomeButton";

const NotFound = () => (
  <div className="min-h-screen bg-navy-900 text-white flex items-center justify-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
    <div className="text-center space-y-8 p-8 relative z-10">
      <h1 className="text-8xl font-bold text-white/90">404</h1>
      <h2 className="text-3xl font-semibold text-gray-200 tracking-wide">
        Page Not Found
      </h2>
      <p className="text-gray-300/90 max-w-md mx-auto leading-relaxed">
        申し訳ありません。お探しのページは見つかりませんでした。
        <br />
        別のページをお試しください。
      </p>
      <ReturnHomeButton />
    </div>
  </div>
);

NotFound.displayName = "NotFound";
export default NotFound;
