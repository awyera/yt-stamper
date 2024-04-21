import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface Props extends ComponentProps<"button"> {
  variant?: "default" | "danger";
  circle?: boolean;
}

export function Button({ className, variant = "default", circle, disabled, ...props }: Props) {
  return (
    <button
      {...props}
      className={twMerge(
        "flex items-center justify-center rounded bg-gray-600 px-2 py-1 text-base text-white leading-none active:bg-gray-900 hover:bg-gray-700",
        circle && "rounded-full p-1",
        disabled && "cursor-not-allowed bg-gray-300 text-gray-500 active:bg-gray-300 hover:bg-gray-300",
        variant === "danger" && "border-red-600 bg-red-600 text-white active:bg-red-900 hover:bg-red-700",
        className,
      )}
      type="button"
    />
  );
}
