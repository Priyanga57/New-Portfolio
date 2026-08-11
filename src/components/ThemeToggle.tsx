import React from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const nextLabel = theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={nextLabel}
      title={nextLabel}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-muted transition-colors duration-200 hover:border-primary hover:text-primary">
      
      {theme === 'dark' ?
      <SunIcon className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" /> :

      <MoonIcon className="h-[1.05rem] w-[1.05rem]" aria-hidden="true" />
      }
    </button>);

}