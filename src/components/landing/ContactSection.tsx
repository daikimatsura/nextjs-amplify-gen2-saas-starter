"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "@/components/ui/form/CustomFormField";
import { useState } from "react";
import { contactSchema, type ContactFormValues } from "@/schema/zod/schema";

export function ContactSection() {
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: ContactFormValues) => {
    try {
      setIsSubmitting(true);
      setStatus({ type: null, message: "" });

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (response.status !== 200) {
        throw new Error(data.error || "問い合わせに失敗しました");
      }

      setStatus({ type: "success", message: "お問い合わせを受け付けました。" });
      form.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "予期せぬエラーが発生しました",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-32 bg-gradient-to-b from-blue-50 to-white relative overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            お問い合わせ
          </h2>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            ご質問やご相談がございましたら、お気軽にお問い合わせください。
            <br />
            通常2営業日以内にご返信いたします。
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-white shadow-2xl rounded-3xl p-8 md:p-12 space-y-8 backdrop-blur-sm border border-gray-100 hover:border-blue-200 transition-all duration-300 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 opacity-50 rounded-3xl -z-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <CustomFormField
                control={form.control}
                name="name"
                label="お名前"
                placeholder="山田 太郎"
              />
              <CustomFormField
                control={form.control}
                name="email"
                label="メールアドレス"
                placeholder="example@email.com"
                type="email"
              />
            </div>

            <CustomFormField
              control={form.control}
              name="message"
              label="メッセージ"
              placeholder="お問い合わせ内容をご記入ください"
              type="textarea"
            />

            {status.type && (
              <div
                className={`text-center p-4 rounded-lg ${
                  status.type === "success"
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                {status.message}
              </div>
            )}

            <div className="text-center pt-4">
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="px-12 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 text-lg font-medium rounded-xl"
              >
                {isSubmitting ? "送信中..." : "送信する"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.1),transparent_50%)]"></div>
    </section>
  );
}
