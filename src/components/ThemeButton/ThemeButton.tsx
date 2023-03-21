import * as React from 'react';

import { useTheme } from 'next-themes';

import { useLocalStorage } from '@/hooks/useLocalStorage';

enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

const ThemeButton = (): JSX.Element => {
  const { theme, setTheme, systemTheme } = useTheme();
  const isDarkTheme = theme === Theme.DARK;
  const [savedTheme, setSavedTheme] = useLocalStorage(
    'theme',
    isDarkTheme ? Theme.DARK : Theme.LIGHT
  );

  function toggleTheme(): void {
    const selectedTheme = isDarkTheme ? Theme.LIGHT : Theme.DARK;
    setSavedTheme(selectedTheme);
  }

  React.useEffect(
    () => setTheme(savedTheme || systemTheme || Theme.LIGHT),
    [systemTheme, setTheme, savedTheme]
  );

  return (
    <button
      className="h-8 w-fit rounded-full border-neutral-50 bg-secondary p-2 text-slate-50"
      type="button"
      onClick={toggleTheme}
    >
      <div
        className={`h-4 w-4 rounded-full ${
          isDarkTheme ? 'bg-gray-300' : 'bg-gray-800'
        }`}
      ></div>
    </button>
  );
};

export default ThemeButton;
