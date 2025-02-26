import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プロジェクト | SaaS アプリケーション",
  description: "プロジェクト一覧",
};

// プロジェクトの状態タイプ
type ProjectStatus = "計画中" | "進行中" | "完了" | "保留中";

// プロジェクトタイプ
interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  progress: number;
  dueDate: string;
  members: number;
  tasks: {
    total: number;
    completed: number;
  };
}

// ダミープロジェクトデータ
const projects: Project[] = [
  {
    id: "proj-001",
    name: "ウェブサイトリニューアル",
    description: "企業ウェブサイトの全面的なリニューアル",
    status: "進行中",
    progress: 75,
    dueDate: "2023/12/15",
    members: 5,
    tasks: {
      total: 24,
      completed: 18,
    },
  },
  {
    id: "proj-002",
    name: "モバイルアプリ開発",
    description: "iOSとAndroid向けの新しいモバイルアプリケーション",
    status: "進行中",
    progress: 45,
    dueDate: "2024/02/28",
    members: 8,
    tasks: {
      total: 56,
      completed: 25,
    },
  },
  {
    id: "proj-003",
    name: "マーケティングキャンペーン",
    description: "新製品のマーケティングキャンペーン",
    status: "進行中",
    progress: 90,
    dueDate: "2023/11/30",
    members: 4,
    tasks: {
      total: 18,
      completed: 16,
    },
  },
  {
    id: "proj-004",
    name: "データ分析プラットフォーム",
    description: "社内データ分析プラットフォームの構築",
    status: "計画中",
    progress: 30,
    dueDate: "2024/04/15",
    members: 6,
    tasks: {
      total: 42,
      completed: 12,
    },
  },
  {
    id: "proj-005",
    name: "顧客管理システム",
    description: "顧客情報管理システムの開発",
    status: "完了",
    progress: 100,
    dueDate: "2023/10/15",
    members: 7,
    tasks: {
      total: 35,
      completed: 35,
    },
  },
  {
    id: "proj-006",
    name: "社内トレーニングプログラム",
    description: "新入社員向けトレーニングプログラムの開発",
    status: "保留中",
    progress: 20,
    dueDate: "2024/01/31",
    members: 3,
    tasks: {
      total: 15,
      completed: 3,
    },
  },
  {
    id: "proj-007",
    name: "製品ドキュメント更新",
    description: "既存製品のドキュメント更新",
    status: "進行中",
    progress: 60,
    dueDate: "2023/12/31",
    members: 2,
    tasks: {
      total: 12,
      completed: 7,
    },
  },
  {
    id: "proj-008",
    name: "セキュリティ監査",
    description: "システム全体のセキュリティ監査",
    status: "計画中",
    progress: 10,
    dueDate: "2024/03/15",
    members: 4,
    tasks: {
      total: 20,
      completed: 2,
    },
  },
];

// ステータスバッジコンポーネント
const StatusBadge = ({ status }: { status: ProjectStatus }) => {
  const statusColors = {
    計画中:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    進行中: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-400",
    完了: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    保留中:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        statusColors[status]
      }`}
    >
      {status}
    </span>
  );
};

// プロジェクトカードコンポーネント
const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              <Link
                href={`/projects/${project.id}`}
                className="hover:text-cyan-600 dark:hover:text-cyan-400"
              >
                {project.name}
              </Link>
            </h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {project.description}
            </p>
          </div>
          <StatusBadge status={project.status} />
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
            <span>進捗状況</span>
            <span>{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-cyan-600 dark:bg-cyan-500 h-2 rounded-full"
              style={{ width: `${project.progress}%` }}
            ></div>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center text-sm">
          <div className="text-gray-500 dark:text-gray-400">
            期限:{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {project.dueDate}
            </span>
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            タスク:{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {project.tasks.completed}/{project.tasks.total}
            </span>
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            メンバー:{" "}
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {project.members}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            プロジェクト
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            すべてのプロジェクトとその進捗状況
          </p>
        </div>
        <button className="bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-600 dark:hover:bg-cyan-500 text-white px-4 py-2 rounded-md text-sm font-medium">
          新規プロジェクト
        </button>
      </div>

      {/* フィルターと検索 */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="w-full sm:w-48">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                ステータス
              </label>
              <select
                id="status"
                name="status"
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-2 px-3 text-sm"
              >
                <option value="">すべて</option>
                <option value="計画中">計画中</option>
                <option value="進行中">進行中</option>
                <option value="完了">完了</option>
                <option value="保留中">保留中</option>
              </select>
            </div>
            <div className="w-full sm:w-48">
              <label
                htmlFor="sort"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                並び替え
              </label>
              <select
                id="sort"
                name="sort"
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-2 px-3 text-sm"
              >
                <option value="newest">最新順</option>
                <option value="oldest">古い順</option>
                <option value="name">名前順</option>
                <option value="progress">進捗順</option>
                <option value="dueDate">期限順</option>
              </select>
            </div>
          </div>
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="プロジェクトを検索..."
              className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
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
      </div>

      {/* プロジェクトグリッド */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* ページネーション */}
      <div className="flex justify-center mt-8">
        <nav className="flex items-center space-x-2">
          <button className="px-3 py-2 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            前へ
          </button>
          <button className="px-3 py-2 rounded-md text-sm bg-cyan-600 text-white">
            1
          </button>
          <button className="px-3 py-2 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            2
          </button>
          <button className="px-3 py-2 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            3
          </button>
          <button className="px-3 py-2 rounded-md text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            次へ
          </button>
        </nav>
      </div>
    </div>
  );
}
