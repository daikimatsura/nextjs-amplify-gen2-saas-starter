"use client";

import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "@/components/ui/CustomFormField";
import { signupSchema, type SignupFormValues } from "@/schema/zod/schema";
import { isPlan, PricingEnum } from "@/schema/appSync/schema";

import PlanNotFound from "./plan-not-found";

export default function Signup() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  if (!plan || !isPlan(plan)) {
    return <PlanNotFound plan={plan} />;
  }

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      plan: plan,
      tenantName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.error || "サインアップに失敗しました");
      }

      if (data.statusCode === 200) {
        // TODO: サインアップ成功後の処理（例：ログインページへのリダイレクト）
        console.log("サインアップ成功:", data);
      } else {
      }
    } catch (error) {
      console.error("サインアップエラー:", error);
      // TODO: エラーメッセージの表示
    }
  };

  return (
    <div className="min-h-screen /*bg-gray-50*/ flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
          アカウントを作成
        </h2>
        {plan && (
          <p className="mt-2 text-center text-sm text-gray-100">
            選択されたプラン: {PricingEnum[form.getValues("plan")]}
          </p>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <CustomFormField
                control={form.control}
                name="tenantName"
                label="組織名"
              />
              <CustomFormField
                control={form.control}
                name="userName"
                label="氏名"
              />
              <CustomFormField
                control={form.control}
                name="email"
                label="メールアドレス"
                type="email"
              />
              <CustomFormField
                control={form.control}
                name="password"
                label="パスワード"
                type="password"
              />
              <CustomFormField
                control={form.control}
                name="confirmPassword"
                label="パスワード（確認）"
                type="password"
              />
              <Button type="submit" className="w-full">
                アカウントを作成
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
