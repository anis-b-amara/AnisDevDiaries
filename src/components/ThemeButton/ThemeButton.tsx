import * as React from 'react';

type ThemeButtonProps = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeButton = (props: ThemeButtonProps): JSX.Element => {
  const { isDark, toggleTheme } = props;

  return (
    <button
      className="h-8 w-fit rounded-full border-neutral-50 bg-secondary p-2 text-slate-50"
      type="button"
      onClick={toggleTheme}
    >
      <div
        className={`h-4 w-4 rounded-full ${
          isDark ? 'bg-gray-300' : 'bg-gray-800'
        }`}
      ></div>
    </button>
  );
};

export default ThemeButton;
