import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/widgets/sidebar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { getUpdatedTime } from "@/lib/actions/cases.actions";
import { AnimatePresence } from "framer-motion";
import { Suspense } from "react";
import Loader from "@/components/loader";
import Script from "next/script";

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
  description: "Case Investor - the website that provides metrics about cases from steam and help you calculate ROI.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const updatedTime = await getUpdatedTime();
  console.log("updatedTime", updatedTime);
  return (
    <html lang="en">
        <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3814838164289779"
crossOrigin="anonymous" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AnimatePresence>
        <Suspense fallback={<Loader />}>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <AppSidebar updatedTime={updatedTime} />
              <SidebarTrigger />
              <main className="w-full">{children}</main>
            </div>
            <Toaster richColors position="top-center" closeButton />
          </SidebarProvider>
        </Suspense>
          </AnimatePresence>
      </body>
    </html>
  );
}
