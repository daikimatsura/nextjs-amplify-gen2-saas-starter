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

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="ja" className={inter.className}>
    <body>
      <ConfigureAmplifyClientSide />
      <main className="min-h-screen">{children}</main>
      <Toaster />
    </body>
    <footer className="bg-cyan-800 py-8 border-t border-cyan-200 ">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-cyan-200 text-sm">
            &copy; {new Date().getFullYear()} daiki matsuura.
          </p>
        </div>
      </div>
    </footer>
  </html>
);

RootLayout.displayName = "RootLayout";
export default RootLayout;
