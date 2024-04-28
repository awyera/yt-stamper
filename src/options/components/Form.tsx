import { type ChangeEvent, useId } from "react";
import { twMerge } from "tailwind-merge";

interface Props<T extends string | number> {
  className?: string;
  inputClassName?: string;
  label: string;
  name: string;
  value: T;
  onChange: (name: string, value: T) => void;
}

export function Form<T extends string | number>({ className, inputClassName, label, name, value, onChange }: Props<T>) {
  const id = useId();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const typedValue = value === 'number' ? e.currentTarget.valueAsNumber : e.currentTarget.value;
    onChange(name, typedValue as T);
  }

  return (
    <div className={twMerge("flex flex-col gap-1", className)}>
      <label htmlFor={id} className="font-bold text-base">
        {label}
      </label>
      <input
        id={id}
        className={twMerge("border border-gray-500 px-1 py-1 text-base leading-normal", inputClassName)}
        type={typeof value}
        min="0"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
