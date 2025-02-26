import { Metadata } from "next";
import { Inter } from "next/font/google";
import ConfigureAmplifyClientSide from "@/components/amplify/ConfigureAmplifyClientSide";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";
export const metadata: Metadata = {
  title: "SaaS Demo",
  description: "SaaS Demo Landing Page",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={inter.className}>
      <body className="bg-cyan-800">
        <ConfigureAmplifyClientSide />
        <main className="min-h-screen">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
