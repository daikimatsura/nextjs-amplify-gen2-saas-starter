import { useState } from "react";
import { cn } from "@/lib/utils";

interface Notification {
  id: number;
  title: string;
  time: string;
  read: boolean;
}

// 通知コンポーネント
const NotificationButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "新しいプロジェクトが追加されました",
      time: "5分前",
      read: false,
    },
    {
      id: 2,
      title: "タスクの期限が近づいています",
      time: "1時間前",
      read: false,
    },
    {
      id: 3,
      title: "ミーティングのリマインダー",
      time: "3時間前",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  const markAsRead = (id: number) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="relative">
      <button
        onClick={toggleNotifications}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors duration-200 relative"
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
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50 border border-gray-200 dark:border-gray-700">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              通知
            </h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                すべて既読にする
              </button>
            )}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150",
                    !notification.read && "bg-cyan-50 dark:bg-cyan-900/20"
                  )}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {notification.title}
                    </p>
                    {!notification.read && (
                      <span className="h-2 w-2 bg-cyan-600 rounded-full"></span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {notification.time}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                通知はありません
              </div>
            )}
          </div>
          <div className="p-2 border-t border-gray-200 dark:border-gray-700">
            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2 px-3 text-sm text-center text-cyan-600 dark:text-cyan-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md transition-colors duration-150"
            >
              すべての通知を見る
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
