import { UserButton } from "@/components/amplify/UserButton";
import NotificationButton from "@/components/saas/NotificationButton";
import DarkModeToggle from "@/components/saas/DarkModeToggle";

interface HeaderProps {
  onMenuClick: () => void;
}

// ヘッダーコンポーネント
const Header = ({ onMenuClick }: HeaderProps) => {
  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-4 md:px-6 shadow-sm">
      <div className="flex items-center">
        <div className="md:hidden">
          <button
            type="button"
            className="text-gray-500 dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 rounded-md p-1"
            onClick={onMenuClick}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div className="hidden md:flex items-center ml-4">
          <div className="hidden md:block relative">
            <input
              type="text"
              placeholder="検索..."
              className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200"
            />
            <div className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="md:hidden flex-1 flex justify-center ml-4">
          <h1 className="text-lg font-bold text-gray-800 dark:text-white flex items-center">
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
            SaaS App
          </h1>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <NotificationButton />
        <DarkModeToggle />
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
