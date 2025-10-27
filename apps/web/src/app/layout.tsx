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
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${montserrat.variable} ${merriweather.variable} ${firaCode.variable}`}
    >
      <body className="font-serif min-h-screen grid grid-rows-[auto_1fr_auto]">
        <Suspense fallback={<div className="min-h-screen" />}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <HeaderProvider>
              <ServiceWorker />
              <Header />
              {/* Main site column layout offset by fixed header height and footer */}
              <div className="pt-14 md:pt-16 pb-5 w-full min-h-0">
                {/* Main content container - sidebar is now handled per-page */}
                <main className="min-w-0 flex flex-col">
                  <div className="py-2 flex-1">
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
