import { useId, type ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";

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
    <div className={twMerge("flex flex-col gap-1", className)}>
      <label htmlFor={id} className="font-bold text-base">
        {label}
      </label>
      <input
        id={id}
        className={twMerge("w-20 border border-gray-500 px-1 py-1 text-base leading-normal", inputClassName)}
        type="number"
        min="0"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
