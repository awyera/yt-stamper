import clsx from "clsx";
import type { ComponentProps } from "react";

type Props = {
  circle?: boolean;
} & ComponentProps<"button">;

export function Button({ className, circle, disabled, ...props }: Props) {
  return (
    <button
      {...props}
      className={clsx(className, "flex items-center justify-center text-white", {
        "rounded-full": circle,
        rounded: !circle,
        "p-1": circle,
        "px-2 py-1": !circle,
        "bg-gray-600": !disabled,
        "hover:bg-gray-700": !disabled,
        "active:bg-gray-900": !disabled,

        "bg-gray-300": disabled,
        "hover:bg-gray-300": disabled,
        "active:bg-gray-300": disabled,
        "text-gray-400": disabled,
        "cursor-not-allowed": disabled,
      })}
      type="button"
    />
  );
}
