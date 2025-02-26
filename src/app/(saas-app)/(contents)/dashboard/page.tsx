import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ダッシュボード | SaaS アプリケーション",
  description: "SaaS アプリケーションのダッシュボード",
};

// 統計カードコンポーネント
const StatCard = ({
  title,
  value,
  icon,
  change,
  changeType,
}: {
  title: string;
  value: string;
  icon: string;
  change?: string;
  changeType?: "increase" | "decrease";
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </h3>
        <div className="p-2 bg-cyan-50 dark:bg-cyan-900/30 rounded-md text-cyan-500 dark:text-cyan-400">
          {icon}
        </div>
      </div>
      <div className="mt-2">
        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {value}
        </p>
        {change && (
          <p
            className={`text-sm mt-1 ${
              changeType === "increase"
                ? "text-green-600 dark:text-green-400"
                : "text-red-600 dark:text-red-400"
            }`}
          >
            {changeType === "increase" ? "↑" : "↓"} {change} 先月比
          </p>
        )}
      </div>
    </div>
  );
};

// アクティビティアイテムコンポーネント
const ActivityItem = ({
  title,
  description,
  time,
  icon,
}: {
  title: string;
  description: string;
  time: string;
  icon: string;
}) => {
  return (
    <div className="flex items-start space-x-4 py-4">
      <div className="p-2 bg-cyan-50 dark:bg-cyan-900/30 rounded-md text-cyan-500 dark:text-cyan-400">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {title}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{time}</div>
    </div>
  );
};

// タスクアイテムコンポーネント
const TaskItem = ({
  title,
  dueDate,
  priority,
  status,
}: {
  title: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "未着手" | "進行中" | "完了";
}) => {
  const priorityColors = {
    high: "text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20",
    medium:
      "text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20",
    low: "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20",
  };

  const statusColors = {
    未着手: "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800",
    進行中: "text-cyan-600 bg-cyan-50 dark:text-cyan-400 dark:bg-cyan-900/20",
    完了: "text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20",
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {title}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          期限: {dueDate}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            priorityColors[priority]
          }`}
        >
          {priority === "high" ? "高" : priority === "medium" ? "中" : "低"}
        </span>
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            statusColors[status]
          }`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          ダッシュボード
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          プロジェクトの概要と最近のアクティビティ
        </p>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="総プロジェクト数"
          value="12"
          icon="P"
          change="16.8%"
          changeType="increase"
        />
        <StatCard
          title="進行中のタスク"
          value="42"
          icon="T"
          change="5.4%"
          changeType="increase"
        />
        <StatCard
          title="完了したタスク"
          value="128"
          icon="C"
          change="10.2%"
          changeType="increase"
        />
        <StatCard
          title="期限切れタスク"
          value="3"
          icon="E"
          change="2.1%"
          changeType="decrease"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* プロジェクト進捗 */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            プロジェクト進捗
          </h2>
          <div className="mt-4 space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  ウェブサイトリニューアル
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  75%
                </span>
              </div>
              <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-cyan-600 dark:bg-cyan-500 h-2 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  モバイルアプリ開発
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  45%
                </span>
              </div>
              <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-cyan-600 dark:bg-cyan-500 h-2 rounded-full"
                  style={{ width: "45%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  マーケティングキャンペーン
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  90%
                </span>
              </div>
              <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-cyan-600 dark:bg-cyan-500 h-2 rounded-full"
                  style={{ width: "90%" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  データ分析プラットフォーム
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  30%
                </span>
              </div>
              <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-cyan-600 dark:bg-cyan-500 h-2 rounded-full"
                  style={{ width: "30%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* 最近のアクティビティ */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            最近のアクティビティ
          </h2>
          <div className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
            <ActivityItem
              title="新しいタスクが追加されました"
              description="モバイルアプリのUI改善"
              time="1時間前"
              icon="+"
            />
            <ActivityItem
              title="タスクが完了しました"
              description="ウェブサイトのSEO最適化"
              time="3時間前"
              icon="✓"
            />
            <ActivityItem
              title="コメントが追加されました"
              description="デザインレビューについて"
              time="5時間前"
              icon="C"
            />
            <ActivityItem
              title="新しいメンバーが参加しました"
              description="田中太郎さんがチームに参加"
              time="1日前"
              icon="U"
            />
          </div>
        </div>
      </div>

      {/* 今日のタスク */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            今日のタスク
          </h2>
          <button className="text-sm text-cyan-600 dark:text-cyan-400 hover:text-cyan-800 dark:hover:text-cyan-300">
            すべて表示
          </button>
        </div>
        <div className="mt-4 divide-y divide-gray-200 dark:divide-gray-700">
          <TaskItem
            title="デザインミーティング"
            dueDate="今日 14:00"
            priority="high"
            status="未着手"
          />
          <TaskItem
            title="ウェブサイトのバグ修正"
            dueDate="今日 17:00"
            priority="medium"
            status="進行中"
          />
          <TaskItem
            title="週次レポートの作成"
            dueDate="今日 18:00"
            priority="high"
            status="未着手"
          />
          <TaskItem
            title="クライアントへの提案書作成"
            dueDate="今日 12:00"
            priority="medium"
            status="完了"
          />
          <TaskItem
            title="新機能のテスト"
            dueDate="今日 16:00"
            priority="low"
            status="進行中"
          />
        </div>
      </div>
    </div>
  );
}
