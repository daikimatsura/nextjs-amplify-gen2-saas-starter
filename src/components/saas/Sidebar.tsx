import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@/components/amplify/UserButton";
import { cn } from "@/lib/utils";
import { sidebarNavItems } from "@/components/saas/navigation-items";

// サイドバーコンポーネント
const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex flex-col w-64 bg-gradient-to-b from-cyan-800/10 to-white dark:from-cyan-900/30 dark:to-gray-900 border-r border-gray-200 dark:border-gray-700 h-screen">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center space-x-2">
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
  );
};

export default Sidebar;
