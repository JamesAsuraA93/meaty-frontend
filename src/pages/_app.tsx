import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { Toaster } from "@/components/ui/sonner";
import Head from "next/head";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Meaty</title>
        <meta name="description" content="Meaty" />
        <meta name="keywords" content="Meaty" />
        <meta name="author" content="Meaty" />
        <link rel="icon" href="/favicon_io/favicon.ico" />
        <link rel="icon" type="image/x-icon" href="/favicon_io/favicon.ico" />
      </Head>

      <main className={`font-sans ${inter.variable} min-w-[920px]`}>
        <Component {...pageProps} />
        <Toaster />
      </main>
    </SessionProvider>
  );
};

export default MyApp;
