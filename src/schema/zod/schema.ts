import { z } from "zod";
import { PricingEnum } from "@/schema/appSync/schema";

export type ContactFormValues = z.infer<typeof contactSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type VerifyCodeFormValues = z.infer<typeof verifyCodeSchema>;

export const contactSchema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  message: z.string().min(1, "メッセージを入力してください"),
});

export const signupSchema = z
  .object({
    plan: z.enum(Object.keys(PricingEnum) as [keyof typeof PricingEnum]),
    tenantName: z.string().min(1, "テナント名を入力してください"),
    // userName: z.string().min(1, "ユーザー名を入力してください"),
    email: z.string().email("有効なメールアドレスを入力してください"),
    password: z
      .string()
      .min(8, "パスワードは8文字以上である必要があります")
      .regex(/[a-z]/, "パスワードは小文字を含める必要があります")
      .regex(/[A-Z]/, "パスワードは大文字を含める必要があります")
      .regex(/[0-9]/, "パスワードは数字を含める必要があります")
      .regex(/[^a-zA-Z0-9]/, "パスワードは記号を含める必要があります"),
    confirmPassword: z.string(),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "利用規約・プライバシーポリシーに同意する必要があります",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });

// 認証コードのバリデーションスキーマを定義
export const verifyCodeSchema = z.object({
  username: z.string().min(1, "ユーザー名を入力してください"),
  verifyCode: z.string().min(1, "認証コードを入力してください"),
});
