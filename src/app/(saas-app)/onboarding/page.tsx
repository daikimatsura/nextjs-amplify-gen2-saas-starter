"use client";

import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "@/components/ui/form/CustomFormField";
import { signupSchema, type SignupFormValues } from "@/schema/zod/schema";
import { isPlan, PricingEnum } from "@/schema/appSync/schema";
import { useRouter } from "next/navigation";
import PlanNotFound from "./plan-not-found";
import { handleOnboarding } from "@/lib/actions";
import { toast } from "sonner";
import { useState } from "react";
import { LoadingButton } from "@/components/ui/buttons/LoadingButton";

export default function Onboarding() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  const [isLoading, setIsLoading] = useState(false);

  if (!plan || !isPlan(plan)) {
    return <PlanNotFound plan={plan} />;
  }

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      plan: plan,
      tenantName: "",
      // userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const onSubmit = async (values: SignupFormValues) => {
    try {
      setIsLoading(true);
      const response = await handleOnboarding(values);

      console.log(response);

      if (response.success) {
        toast.success(response.message, {
          description: "コード認証画面にリダイレクト",
          action: {
            label: "コード認証画面に移動",
            onClick: () => {
              router.push(`/verify?username=${response.username}`);
            },
          },
        });
        // コード認証画面にリダイレクト
        router.push(`/verify?username=${response.username}`);
      } else {
        toast.error(response.message);
        // エラーメッセージの表示
        console.error("サインアップエラー:", response.message);
      }
    } catch (error) {
      toast.error(`サインアップに失敗しました。管理者にお問い合わせください。`);
      console.error("サインアップエラー:", error);
    } finally {
      setIsLoading(false);
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
                label="会社名"
              />
              {/* <CustomFormField
                control={form.control}
                name="userName"
                label="氏名"
              /> */}
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
              <CustomFormField
                control={form.control}
                name="acceptTerms"
                label="利用規約・プライバシーポリシーに同意する"
                type="checkbox"
              />
              <LoadingButton
                isLoading={isLoading}
                type="submit"
                className="w-full"
              >
                アカウントを作成
              </LoadingButton>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
