import * as React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

type NavLinkProps = {
  path: string;
  title: string;
};

const NavLink = (props: NavLinkProps) => {
  const { title, path } = props;

  const router = useRouter();

  const activeLinkCSS = 'border-b-white border-b-2 border-solid';

  function activeLink(path: string): string {
    if (path === '/') {
      return router.pathname === path ? activeLinkCSS : '';
    }
    return router.pathname.startsWith(path) ? activeLinkCSS : '';
  }

  return (
    <Link
      href={path}
      className={`${activeLink(path)} w-16 text-center py-4 inline-block`}
    >
      {title}
    </Link>
  );
};

const Navigation = () => {
  return (
    <nav className="flex gap-2 ml-auto">
      <NavLink path="/" title="Home" />
      <NavLink path="/blog" title="Blog" />
    </nav>
  );
};

export default Navigation;
