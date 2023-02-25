import * as React from 'react';
import { useTheme } from 'next-themes';

import Navigation from '../Navigation';

const Header = () => {
  const { theme, setTheme, systemTheme } = useTheme();

  function toggleTheme(): void {
    const isDarkTheme = theme === 'dark';
    setTheme(isDarkTheme ? 'light' : 'dark');
  }

  React.useEffect(
    () => setTheme(systemTheme || 'light'),
    [systemTheme, setTheme]
  );

  return (
    <header className="flex items-center justify-start gap-2 px-4 bg-primary text-slate-50">
      <h1 className="text-3xl font-bold">Anis</h1>
      <Navigation />
      <button
        className="h-8 p-2 rounded-full w-fit bg-secondary text-slate-50 border-neutral-50"
        onClick={toggleTheme}
      >
        Toggle Me [{theme}]
      </button>
    </header>
  );
};

export default Header;
