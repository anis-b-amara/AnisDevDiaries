import * as React from 'react';

import Link from 'next/link';

const Navigation = () => {
  return (
    <nav className="flex gap-2 ml-auto">
      <Link className="" href="/">
        Home
      </Link>
      <Link className="" href="/blog">
        Blog
      </Link>
    </nav>
  );
};

export default Navigation;
