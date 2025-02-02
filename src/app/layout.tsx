import { Metadata } from "next";
import { Inter } from "next/font/google";
import ConfigureAmplifyClientSide from "@/components/amplify/ConfigureAmplifyClientSide";
import "@/styles/globals.css";

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
        <footer className="py-8 border-t border-cyan-200 ">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-cyan-200 text-sm">
                &copy; {new Date().getFullYear()} daiki matsuura.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
