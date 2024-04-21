import { Children, cloneElement, type ComponentProps, type FunctionComponentElement } from "react";
import type { Button } from "./Button";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  children: FunctionComponentElement<ComponentProps<typeof Button>>[];
}

export function ButtonGroup({ className, children }: Props) {
  return (
    <div className={twMerge("flex items-center gap-0", className)}>
      {Children.map(children, (child) =>
        cloneElement(child, {
          className:
            "first:rounded-l last:rounded-r rounded-none border-l-2 border-l-gray-500 hover:border-l-gray-500 active:border-l-gray-500 first:border-l-0",
        }),
      )}
    </div>
  );
}
