import { Children, cloneElement, type ComponentProps, type FunctionComponentElement } from "react";
import type { Button } from "./Button";
import clsx from "clsx";

interface Props {
  className?: string;
  children: FunctionComponentElement<ComponentProps<typeof Button>>[];
}

export function ButtonGroup({ className, children }: Props) {
  return (
    <div className={clsx(className, "flex items-center gap-0")}>
      {Children.map(children, (child) =>
        cloneElement(child, {
          className:
            "first:rounded-l last:rounded-r rounded-none border border-gray-400 border-l-gray-100 first:border-l-none",
        }),
      )}
    </div>
  );
}
