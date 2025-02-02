import { Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// フォームフィールドの共通型を汎用化
type CustomFormFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  control: Control<T>;
  type?: string;
};

// 汎用的なCustomFormFieldコンポーネント
export function CustomFormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  type = "text",
}: CustomFormFieldProps<T>) {
  const isTextarea = type === "textarea";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {isTextarea ? (
              <Textarea
                placeholder={placeholder}
                className="resize-none"
                rows={6}
                {...field}
              />
            ) : (
              <Input type={type} placeholder={placeholder} {...field} />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
