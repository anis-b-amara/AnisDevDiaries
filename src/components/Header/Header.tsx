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
    <header className="bg-primary text-slate-50">
      <div className="flex items-center justify-start gap-2 px-4 md:mx-auto md:w-2/3 lg:w-[1020px]">
        <h1 className="text-3xl font-bold">Anis</h1>
        <Navigation />
        <button
          className="h-8 w-fit rounded-full border-neutral-50 bg-secondary p-2 text-slate-50"
          onClick={toggleTheme}
        >
          Toggle Me [{theme}]
        </button>
      </div>
    </header>
  );
};

export default Header;
