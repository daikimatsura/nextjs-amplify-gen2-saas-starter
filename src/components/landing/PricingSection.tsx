import { PricingCard } from "./PricingCard";
import type { Plans } from "@/types/plan";
export function PricingSection() {
  const plans: Plans = [
    {
      plan: "FREE",
      description: "個人利用に最適",
      price: 0,
      features: [
        "タスク管理（最大10件）",
        "基本レポート機能",
        "コミュニティサポート",
        "ユーザー数3人まで",
      ],
      buttonText: "今すぐ始める",
      variant: "outline",
    },
    {
      plan: "STARTER",
      description: "小規模ビジネスに最適",
      price: 100,
      features: [
        "フリープランの全機能",
        "タスク管理（無制限）",
        "優先メールサポート",
        "API提供",
        "ユーザー数30人まで",
      ],
      buttonText: "プランを選択",
      variant: "outline",
    },
    {
      plan: "PRO",
      description: "成長中の企業向け",
      price: 500,
      features: [
        "スタータープランの全機能",
        "高度なセキュリティ機能",
        "24時間専任サポート",
        "AIによる分析機能",
        "ユーザー数無制限",
      ],
      buttonText: "プランを選択",
      variant: "default",
      highlight: true,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            シンプルな料金プラン
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            ビジネスの規模に合わせて最適なプランをお選びいただけます
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.plan} {...plan} />
          ))}
        </div>
      </div>
    </section>
  );
}
