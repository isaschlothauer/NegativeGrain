'use client'
import type { Metadata } from "next";
import { Chathura, Roboto, Unica_One } from "next/font/google";
import "./globals.css";
import styles from './page.module.css';
import '@mantine/core/styles.css';
import { ColorSchemeScript, MantineProvider, rem } from '@mantine/core';
import Header from './_components/Header'
import { UserDataContext } from './context/userContext';
import { useState } from 'react';

// const chathura = Chathura({ subsets: ["latin"] });
export const chathura = Chathura({ subsets: ["latin"],  weight: '400' });
export const roboto = Roboto({ subsets: ["latin"],  weight: '400' })
export const unica_one = Unica_One({ subsets: ["latin"],  weight: '400', style: "normal" });

const metadata: Metadata = {
  title: "Negative Grain",
  description: "Photography image sharing with no socials",
  viewport: "width=device-width, initial-scale=1" 
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean | undefined>(undefined);
  return (
    <html lang="en">
      <body className={`${styles.layoutStyle} ${chathura.className}`}>
      <MantineProvider 
        theme={{
          fontSizes: {
            xs: rem(8),
            sm: rem(16),
            md: rem(32),
            lg: rem(48),
            xl: rem(64),
          },
        }}
        >
          <UserDataContext.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
            <div className={`${styles.mainContainer} ${chathura.className}`}>
              <Header />
              {children}
            </div>
            </UserDataContext.Provider>
        </MantineProvider>
      </body>
    </html>
  );
}
