import React from 'react';
import { cn } from '../utils/parse';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md';

interface StyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

const base =
'inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-tight transition-colors duration-200 disabled:opacity-60 disabled:pointer-events-none';

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-primary-fg hover:opacity-90',
  secondary: 'border border-line-strong bg-surface text-fg hover:border-primary hover:text-primary',
  ghost: 'text-muted hover:text-fg'
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-2 text-sm',
  md: 'px-5 py-3 text-sm sm:text-[0.95rem]'
};

export function buttonStyles({ variant = 'primary', size = 'md', className }: StyleOptions = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({ variant, size, className, children, ...rest }: ButtonProps) {
  return (
    <button className={buttonStyles({ variant, size, className })} {...rest}>
      {children}
    </button>);

}