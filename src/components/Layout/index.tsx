import * as React from 'react';

import Footer from '../Footer';
import Header from '../Header';

type LayoutContainerProps = {
  children: JSX.Element;
};

const Layout = (props: LayoutContainerProps): JSX.Element => {
  const { children } = props;

  return (
    <div className="flex flex-col min-h-screen text-gray-800 dark:text-slate-50 bg-gray-50 dark:bg-gray-800">
      <Header />
      <main className="flex-auto m-2 ">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
