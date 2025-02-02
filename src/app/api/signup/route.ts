import { NextResponse } from "next/server";
import { signupSchema } from "@/schema/zod/schema";
import { onboardingHandler } from "@/services/appSync";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);

    // バリデーション
    const validationResult = signupSchema.safeParse(body);
    console.log(validationResult);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: "入力データが無効です" },
        { status: 400 }
      );
    }
    const { plan, tenantName, email, password } = validationResult.data;
    const onboardingResult = await onboardingHandler({
      plan,
      tenantName,
      email,
      password,
    });

    console.log(onboardingResult);

    return NextResponse.json(
      { message: onboardingResult.data?.message },
      { status: onboardingResult.data?.statusCode! }
    );
  } catch (error) {
    console.error("サインアップエラー:", error);
    return NextResponse.json(
      { error: "アカウントの作成中にエラーが発生しました" },
      { status: 500 }
    );
  }
}
