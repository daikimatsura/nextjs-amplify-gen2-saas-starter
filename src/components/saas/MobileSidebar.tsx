import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@/components/amplify/UserButton";
import { cn } from "@/lib/utils";
import { sidebarNavItems } from "@/components/saas/navigation-items";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

// モバイル用サイドバーコンポーネント
const MobileSidebar = ({ isOpen, onClose }: MobileSidebarProps) => {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex md:hidden">
      {/* オーバーレイ背景 */}
      <div
        className="fixed inset-0 bg-gray-800/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* サイドバー */}
      <div className="relative flex flex-col w-80 max-w-[80%] h-full bg-gradient-to-b from-cyan-800/10 to-white dark:from-cyan-900/30 dark:to-gray-900 border-r border-gray-200 dark:border-gray-700 transition-transform duration-300">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-cyan-600 dark:text-cyan-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              SaaS App
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {sidebarNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-lg transition-colors duration-200",
                pathname === item.href
                  ? "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-cyan-50 dark:hover:bg-gray-800 hover:text-cyan-700 dark:hover:text-cyan-400"
              )}
              onClick={onClose}
            >
              <span
                className={cn(
                  "mr-3",
                  pathname === item.href
                    ? "text-cyan-600 dark:text-cyan-400"
                    : "text-gray-500 dark:text-gray-400"
                )}
              >
                {item.icon}
              </span>
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-cyan-50 dark:bg-gray-800">
          <div className="flex items-center p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200">
            <UserButton />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                ユーザー名
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                user@example.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
