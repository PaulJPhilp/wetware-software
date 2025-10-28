import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeaderProvider } from "@/components/header-context";
import { ServiceWorker } from "@/components/ServiceWorker";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { firaCode, merriweather, montserrat } from "@/lib/fonts";
import { Suspense } from "react";

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Wetware & Software",
    template: "%s | Wetware & Software",
  },
  description: "Where human systems meet AI: a front row seat to the revolution.",
  metadataBase: new URL("https://wetware-software.com"),
  openGraph: {
    title: "Wetware & Software",
    description: "Where human systems meet AI: a front row seat to the revolution.",
    url: "https://wetware-software.com",
    siteName: "Wetware & Software",
    images: [
      {
        url: "/avatar.svg",
        width: 400,
        height: 400,
        alt: "Paul Philp Avatar",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wetware & Software",
    description: "Where human systems meet AI: a front row seat to the revolution.",
    images: ["/avatar.svg"],
    creator: "@PaulJPhilp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={`${montserrat.variable} ${merriweather.variable} ${firaCode.variable}`}
      data-scroll-behavior="smooth"
      lang="en"
      suppressHydrationWarning
    >
      <body className="grid min-h-screen grid-rows-[auto_1fr_auto] font-serif">
        <Suspense fallback={<div className="min-h-screen" />}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            <HeaderProvider>
              <ServiceWorker />
              <Header />
              {/* Main site column layout offset by fixed header height and footer */}
              <div className="min-h-0 w-full pt-14 pb-5 md:pt-16">
                {/* Main content container - sidebar is now handled per-page */}
                <main className="flex min-w-0 flex-col">
                  <div className="flex-1 py-2">
                    <div className="w-full min-w-0">{children}</div>
                  </div>
                </main>
              </div>
            </HeaderProvider>
            <Footer />
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
