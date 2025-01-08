import type { ChangeEvent, ComponentProps, KeyboardEvent } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = Omit<ComponentProps<'input'>, 'value' | 'onChange'> & {
  value: string;
  onChange: (value: string) => void;
};

export function Input({ className, value, onChange, onKeyDown, onKeyUp, ...props }: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;

    onChange(value);
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
    e.stopPropagation();
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyUp?.(e);
    e.stopPropagation();
  };

  return (
    <input
      {...props}
      className={twMerge('w-full rounded border border-gray-500 px-1 py-1 text-base leading-normal', className)}
      type="text"
      value={value}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    />
  );
}
