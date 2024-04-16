import clsx from "clsx";
import { type ChangeEvent, useId } from "react";

interface Props {
  className?: string;
  inputClassName?: string;
  label: string;
  name: string;
  value: number;
  onChange: (name: string, value: number) => void;
}

export function Form({ className, inputClassName, label, name, value, onChange }: Props) {
  const id = useId();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(name, e.currentTarget.valueAsNumber);
  }

  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      <label htmlFor={id} className="text-base font-bold">
        {label}
      </label>
      <input
        id={id}
        className={clsx("w-20 px-1 py-1 text-base leading-normal border border-gray-500", inputClassName)}
        type="number"
        min="0"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
