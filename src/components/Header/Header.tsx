import * as React from 'react';
import Navigation from '../Navigation';

const Header = () => {
  return (
    <header className="flex items-center justify-start px-4 py-5 bg-primary text-slate-50">
      <h1 className="text-3xl font-bold">Anis</h1>
      <Navigation />
    </header>
  );
};

export default Header;
