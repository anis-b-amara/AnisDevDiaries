import * as React from 'react';
import Link from 'next/link';

import Navigation from '../Navigation';
import ThemeButton from '../ThemeButton';

const Header = () => {
  return (
    <header className="bg-primary text-slate-50">
      <div className="flex items-center justify-start gap-2 px-4">
        <h1 className="text-3xl font-bold">
          <Link href="/">Anis</Link>
        </h1>
        <Navigation />
        <ThemeButton />
      </div>
    </header>
  );
};

export default Header;
