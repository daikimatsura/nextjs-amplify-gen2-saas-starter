"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "@/components/ui/form/CustomFormField";
import { useSearchParams } from "next/navigation";
import {
  verifyCodeSchema,
  type VerifyCodeFormValues,
} from "@/schema/zod/schema";
import { useState } from "react";
import { verifyConfirmationCode } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoadingButton } from "@/components/ui/buttons/LoadingButton";

const VerifyCodePage = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<VerifyCodeFormValues>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      username: username || "",
      verifyCode: "",
    },
  });

  const onSubmit = async (values: VerifyCodeFormValues) => {
    try {
      setIsLoading(true);
      const result = await verifyConfirmationCode(values);
      if (result.success) {
        toast.success(result.message);
        router.push("/sign-in");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("認証エラー:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-100">
          認証コード入力
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <CustomFormField
                control={form.control}
                name="username"
                label="ユーザー名"
                type="text"
                placeholder="ユーザー名を入力してください"
              />
              <CustomFormField
                control={form.control}
                name="verifyCode"
                label="認証コード"
                type="text"
                placeholder="認証コードを入力してください"
              />
              <LoadingButton
                isLoading={isLoading}
                type="submit"
                className="w-full"
              >
                認証コードを送信
              </LoadingButton>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

VerifyCodePage.displayName = "VerifyCodePage";
export default VerifyCodePage;
