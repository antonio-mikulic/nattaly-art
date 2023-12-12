import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import Link from "next/link";
import Greeting from "~/app/_components/greeting";
import Nav from "~/app/_components/nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Nattaly Art",
  description: "Ručni radovi po mjeri",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`font-sans ${inter.variable} min-h-screen bg-gradient-to-b from-cyan-700 to-pink-300 text-white`}
      >
        <header className="flex w-full justify-between">
          <Link
            href="/"
            className="p-4 text-2xl font-bold tracking-tight sm:text-4xl"
          >
            <span className="text-cyan-300">Nattaly</span>{" "}
            <span className="text-rose-500">Art</span>
          </Link>
          <Nav />
          <Greeting />
        </header>
        <TRPCReactProvider cookies={cookies().toString()}>
          <main className="flex w-full flex-col">{children}</main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
