import type { Metadata } from 'next';
import { Providers } from '@/lib/providers';
import { CssBaseline } from '@mui/material';

import './globals.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export const metadata: Metadata = {
  title: 'Posts App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <CssBaseline />
      <html lang="en">
        <body>{children}</body>
      </html>
    </Providers>
  );
}
