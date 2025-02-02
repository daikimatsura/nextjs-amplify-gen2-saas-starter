import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function ReturnHomeButton() {
  return (
    <Button
      asChild
      className="mt-8 border border-blue-300/20 bg-blue-500/10 hover:bg-blue-500/20 text-blue-100 backdrop-blur-sm"
    >
      <Link href="/" className="flex items-center justify-center gap-2">
        <Home className="h-4 w-4" />
        トップページに戻る
      </Link>
    </Button>
  );
}
