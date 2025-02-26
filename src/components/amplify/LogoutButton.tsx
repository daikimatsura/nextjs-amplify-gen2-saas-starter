"use client";

import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

const LogoutButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await signOut();
        router.push("/sign-in");
      }}
      className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
    >
      サインアウト
    </button>
  );
};

export default LogoutButton;
