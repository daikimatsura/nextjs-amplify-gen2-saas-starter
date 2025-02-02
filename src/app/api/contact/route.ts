import { NextResponse } from "next/server";
import { contactSchema } from "@/schema/zod/schema";
import { headers } from "next/headers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(body);
    // 入力値の検証
    const result = contactSchema.safeParse(body);
    console.log(result);
    if (!result.success) {
      return NextResponse.json(
        { error: "入力内容が正しくありません" },
        { status: 400 }
      );
    }

    const { name, email, message } = result.data;

    // ログ出力
    console.log("お問い合わせを受信しました：", {
      name,
      email,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "お問い合わせを受け付けました" },
      { status: 200 }
    );
  } catch (error) {
    console.error("予期せぬエラー:", error);
    return NextResponse.json(
      { error: "予期せぬエラーが発生しました" },
      { status: 500 }
    );
  }
}
