import type { ChangeEvent, ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends Omit<ComponentProps<"input">, "value" | "onChange"> {
  value: string;
  onChange: (value: string) => void;
}

export function Input({ className, value, onChange, ...props }: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;

    onChange(value);
  }

  return (
    <input
      {...props}
      className={twMerge("w-full rounded border border-gray-500 px-1 py-1 text-base leading-normal", className)}
      type="text"
      value={value}
      onChange={handleChange}
    />
  );
}
