import * as React from 'react';

import Footer from '../Footer';
import Header from '../Header';

type PageContainerProps = {
  children: JSX.Element;
};

const PageContainer = (props: PageContainerProps): JSX.Element => {
  const { children } = props;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-auto m-2 text-gray-800 bg-gray-50">{children}</main>
      <Footer />
    </div>
  );
};

export default PageContainer;
