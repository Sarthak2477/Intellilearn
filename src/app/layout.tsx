import type { Metadata } from "next";
import { Nunito, Poppins } from "next/font/google";
import "./globals.css";
import Head from "next/head";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const nunito = Nunito({
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["100","300","400","500","600","700","800"],
  subsets: ["latin"],
  variable: "--font-poppins"
});

export const metadata: Metadata = {
  title: "",
  description: "Tedious SQL writing made easy with interactive AI-powered platform",
  
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <Head>
          <link rel="shortcut icon" href="/logo.ico" type="image/x-icon" />
        </Head>
        <body
          className={`${poppins.className} ${nunito.className} antialiased overflow-hidden`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
