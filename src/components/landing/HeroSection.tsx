"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const router = useRouter();

  return (
    <section
      id="about"
      className="flex flex-col min-h-[calc(75vh)] items-center justify-center px-6 py-40 text-center bg-gradient-to-br from-blue-200 to-green-200"
    >
      <h1 className="text-5xl font-bold font-mono tracking-tight text-gray-800 sm:text-7xl">
        次世代のビジネスソリューション
      </h1>
      <p className="mt-10 text-xl leading-8 text-gray-700 max-w-2xl">
        効率的なワークフローを実現し、ビジネスの成長をサポートします。
        <br />
        シンプルで直感的なインターフェースで、すぐに始められます。
      </p>
      <div className="mt-16 flex items-center">
        <Button
          size="lg"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-6 text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={() => router.push("/signup?plan=FREE")}
        >
          無料で始める
        </Button>
      </div>
    </section>
  );
}
