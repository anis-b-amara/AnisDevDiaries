import { ComponentType } from 'react';
import dynamic from 'next/dynamic';

import { ThemeProviderProps } from 'next-themes/dist/types';

import type { AppProps } from 'next/app';

import Layout from '@/components/Layout';
import '@/styles/globals.css';

const ThemeProvider: ComponentType<ThemeProviderProps> = dynamic(
  () => import('next-themes').then((mod) => mod.ThemeProvider),
  { ssr: false }
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
