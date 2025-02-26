import ReturnHomeButton from "@/components/ui/buttons/ReturnHomeButton";

interface PlanNotFoundProps {
  plan: string | null;
}

const PlanNotFound: React.FC<PlanNotFoundProps> = ({ plan }) => {
  return (
    <div className="min-h-screen bg-navy-900 text-white flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
      <div className="text-center space-y-8 p-8 relative z-10">
        <h1 className="text-8xl font-bold text-white/90">404</h1>
        <h2 className="text-3xl font-semibold text-gray-200 tracking-wide">
          プランが見つかりません
        </h2>
        <p className="text-gray-300/90 max-w-md mx-auto leading-relaxed">
          申し訳ありません。お探しのプラン「{plan}」は見つかりませんでした。
          <br />
          別のプランをお試しください。
        </p>
        <ReturnHomeButton />
      </div>
    </div>
  );
};

export default PlanNotFound;
