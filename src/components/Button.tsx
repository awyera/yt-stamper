import type { ComponentProps } from 'react';
import { twMerge } from 'tailwind-merge';

type Props = ComponentProps<'button'> & {
  variant?: 'default' | 'success' | 'danger' | 'white';
  circle?: boolean;
  inline?: boolean;
};

export function Button({ className, variant = 'default', circle, inline, disabled, ...props }: Props) {
  return (
    <button
      className={twMerge(
        'flex cursor-pointer items-center justify-center rounded bg-gray-600 px-2 py-1 text-sm text-white leading-none active:bg-gray-900 hover:bg-gray-700',
        circle && 'rounded-full p-1 text-base',
        inline && 'inline-flex',
        disabled && 'pointer-events-none bg-gray-300 text-gray-500 active:bg-gray-300 hover:bg-gray-300',
        variant === 'success' && 'border-green-500 bg-green-500 text-white active:bg-green-700 hover:bg-green-600',
        variant === 'danger' && 'border-red-600 bg-red-600 text-white active:bg-red-900 hover:bg-red-700',
        variant === 'white' && 'border-white bg-white text-black active:bg-gray-300 hover:bg-gray-100',
        className,
      )}
      type="button"
      {...props}
    />
  );
}
