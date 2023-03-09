import * as React from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';

import Navigation from '../Navigation';
import ThemeButton from '../ThemeButton';

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
      <div className="flex items-center justify-start gap-2 px-4">
        <h1 className="text-3xl font-bold">
          <Link href="/">Anis</Link>
        </h1>
        <Navigation />
        <ThemeButton isDark={theme === 'dark'} toggleTheme={toggleTheme} />
      </div>
    </header>
  );
};

export default Header;
