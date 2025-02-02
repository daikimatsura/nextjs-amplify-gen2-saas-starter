export default function Loading() {
  return (
    <div className="min-h-screen text-white flex items-center justify-center">
      <div className="text-center space-y-4 p-8">
        {/* スピナーアニメーション */}
        <div className="relative w-16 h-16 mx-auto">
          <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-400 mt-4">Loading...</p>
      </div>
    </div>
  );
}
