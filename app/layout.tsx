import { Outfit } from 'next/font/google';
import './globals.css';
import { JSX } from "react";

const outfit = Outfit({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

export const metadata = {
  title: 'Blog App',
  description: 'Generated by create next app',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body className={outfit.className}>{children}</body>
    </html>
  );
}
