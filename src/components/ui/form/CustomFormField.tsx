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
import { Checkbox } from "@/components/ui/checkbox";

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
  const isCheckbox = type === "checkbox";
  const isLabel = type === "label";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {!isCheckbox && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {isTextarea ? (
              <Textarea
                placeholder={placeholder}
                className="resize-none"
                rows={6}
                {...field}
              />
            ) : isCheckbox ? (
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  {...field}
                />
                <FormLabel className="text-sm">{label}</FormLabel>
              </div>
            ) : isLabel ? (
              <p className="text-sm">{field.value}</p>
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
