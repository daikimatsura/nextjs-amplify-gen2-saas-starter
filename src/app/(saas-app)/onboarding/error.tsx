"use client";

import { useEffect } from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen  text-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-700/50 to-transparent" />
      <div className="text-center space-y-8 p-8 relative z-10">
        <h1 className="text-5xl font-bold text-red-100">
          エラーが発生しました
        </h1>
        <p className="text-gray-200 max-w-md mx-auto leading-relaxed">
          {error.message}
        </p>
        <p className="text-gray-200 max-w-md mx-auto leading-relaxed">
          申し訳ありませんが、問題が発生しました。以下のボタンをクリックして、もう一度お試しください。
        </p>
        <button
          onClick={reset}
          className="mt-4 text-white bg-blue-500 px-4 py-2 rounded shadow-lg hover:bg-blue-600"
        >
          リセット
        </button>
      </div>
    </div>
  );
};

Error.displayName = "Error";
export default Error;
