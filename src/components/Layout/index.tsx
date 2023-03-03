import * as React from 'react';

import Footer from '../Footer';
import Header from '../Header';

type LayoutContainerProps = {
  children: JSX.Element;
};

const Layout = (props: LayoutContainerProps): JSX.Element => {
  const { children } = props;

  return (
    <div className="flex min-h-screen flex-col bg-gray-300 text-gray-800 dark:bg-gray-800 dark:text-slate-50">
      <Header />
      <main className="m-2 flex-auto md:mx-auto md:w-2/3 lg:w-[1020px]">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
