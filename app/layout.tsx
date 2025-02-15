"use client"
import React from 'react'

// import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import SideBar from "@/components/layout/sidebar";
import { usePathname } from "next/navigation";
import AuthProtect from './routeProtect/authProtect';
import NoAuthProtect from './routeProtect/noAuthProtect';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata: Metadata = {
//   title: "CodeX Cheat",
//   description: "CodeX Cheat We Play. , We Cheat. , We Fun.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const noAuthRequire = ["/login"]
  const pathname = usePathname()


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased  bg-indigo-950	`}
      >
        {noAuthRequire.includes(pathname) ? (
          <React.Fragment>
            <NoAuthProtect>
              {children}
            </NoAuthProtect>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <AuthProtect>
              <Navbar />
              <div className="flex w-screen h-screen">
                <SideBar />
                <div className='h-screen  fixed pb-5 pt-16 pl-40 w-full pr-5'>
                  <div className='h-full flex flex-col overflow-y-auto'>
                    {children}
                  </div>
                </div>
              </div>
            </AuthProtect>
          </React.Fragment>
        )}

      </body>
    </html >
  );
}
