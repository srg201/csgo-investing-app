import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/global/sidebar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import { CookiesProvider } from "@/providers/cookies-provider";
import { TopLine } from "@/components/global/top-line";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Case Investor",
  description:
    "Case Investor - the website that provides metrics about cases from steam and help you calculate ROI. Also, you can find news about Counter-Strike 2.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3814838164289779"
        crossOrigin="anonymous"
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased w-full min-h-screen flex flex-col`}
      >
        <CookiesProvider>
          <div className="flex-1">
            <TopLine />
            <SidebarProvider>
              <div className="flex min-h-screen w-full">
                <AppSidebar />
                <SidebarTrigger />
                <main className="w-full">{children}</main>
              </div>
              <Toaster richColors position="top-center" closeButton />
            </SidebarProvider>
          </div>
        </CookiesProvider>
      </body>
    </html>
  );
}
