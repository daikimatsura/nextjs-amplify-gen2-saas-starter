"use server";

import { signupSchema, verifyCodeSchema } from "@/schema/zod/schema";
import { onboardingHandler } from "@/services/appSync";
import { confirmSignUp } from "aws-amplify/auth";
import { runWithAmplifyServerContext } from "@/lib/amplify";
import { cookies } from "next/headers";
import { SignupFormValues, VerifyCodeFormValues } from "@/schema/zod/schema";

export type OnboardingResult = {
  success: boolean;
  message?: string;
  username?: string;
  statusCode: number;
};

export type VerifyCodeResult = {
  success: boolean;
  message: string;
};

export async function handleOnboarding(
  formData: SignupFormValues
): Promise<OnboardingResult> {
  let message = "";
  try {
    // バリデーション
    const validationResult = signupSchema.safeParse(formData);

    if (!validationResult.success) {
      console.error("バリデーションエラー:", validationResult.error);
      message = "入力データが無効です";
      return {
        success: false,
        message: message,
        statusCode: 400,
      };
    }

    const { plan, tenantName, email, password } = validationResult.data;

    const onboardingResult = await onboardingHandler({
      plan,
      tenantName,
      email,
      password,
    });

    console.log("オンボーディング結果:", onboardingResult);
    message = onboardingResult.data?.message || "";

    return {
      success: onboardingResult.data?.statusCode === 200,
      message: message,
      username: onboardingResult.data?.username || undefined,
      statusCode: onboardingResult.data?.statusCode || 500,
    };
  } catch (error) {
    console.error("サインアップエラー:", error);
    return {
      success: false,
      message: message || "アカウントの作成中にエラーが発生しました",
      statusCode: 500,
    };
  }
}

/**
 * 認証コードを検証するサーバーアクション
 * @param formData 検証フォームデータ
 */
export async function verifyConfirmationCode(
  formData: VerifyCodeFormValues
): Promise<VerifyCodeResult> {
  try {
    // バリデーション
    const validationResult = verifyCodeSchema.safeParse(formData);

    if (!validationResult.success) {
      console.error("バリデーションエラー:", validationResult.error);
      return {
        success: false,
        message: "入力データが無効です",
      };
    }

    const { username, verifyCode } = validationResult.data;

    // Amplify Authを使用して認証コードを検証
    await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: async (contextSpec) => {
        await confirmSignUp({
          username,
          confirmationCode: verifyCode,
        });
        return true;
      },
    });

    return {
      success: true,
      message: "アカウントが確認されました。ログインしてください。",
    };
  } catch (error) {
    console.error("認証コード検証エラー:", error);
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "認証コードの検証中にエラーが発生しました",
    };
  }
}
