import { Children, type ComponentProps, type FunctionComponentElement, cloneElement } from "react";
import { twMerge } from "tailwind-merge";
import type { Button } from "./Button";

interface Props {
  className?: string;
  children: FunctionComponentElement<ComponentProps<typeof Button>>[];
}

export function ButtonGroup({ className, children }: Props) {
  return (
    <div className={twMerge("flex items-center gap-0", className)}>
      {Children.map(children, (child, i) =>
        cloneElement(child, {
          ...children[i].props,
          className: twMerge(
            "first:rounded-l last:rounded-r rounded-none border-l-2 border-l-gray-500 hover:border-l-gray-500 active:border-l-gray-500 first:border-l-0",
            children[i].props.className,
          ),
        }),
      )}
    </div>
  );
}
