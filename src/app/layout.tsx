import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "~/trpc/react";
import Link from "next/link";
import Greeting from "~/app/_components/layout/greeting";
import Nav from "~/app/_components/layout/nav";
import { ThemeProvider } from "~/app/_components/layout/theme-provider";
import { ModeToggle } from "~/app/_components/layout/theme-toggle";
import { Toaster } from "~/ui/toaster";

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
    <html suppressHydrationWarning lang="en">
      <body
        className={`font-sans ${inter.variable} min-h-screen bg-background text-black antialiased dark:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
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
            <section className="flex items-center p-4">
              <Greeting />
              <ModeToggle />
            </section>
          </header>
          <TRPCReactProvider cookies={cookies().toString()}>
            <main className="flex w-full flex-col">{children}</main>
            <Toaster />
          </TRPCReactProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
