import { ClientOnly } from "@/components/ClientOnly";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ServiceWorker } from "@/components/ServiceWorker";
import { SidebarRail } from "@/components/SidebarRail";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { firaCode, merriweather, montserrat } from "@/lib/fonts";
import { getSeriesList } from "@/lib/getSeriesList";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const seriesList = await getSeriesList();
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${montserrat.variable} ${merriweather.variable} ${firaCode.variable}`}
    >
      <body className="font-serif">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ServiceWorker />
          <ClientOnly>
            <Header />
          </ClientOnly>
          <main className="max-w-screen-2xl mx-auto px-4 md:px-6 py-2">
            <div className="grid md:grid-cols-[auto_minmax(0,1fr)] lg:grid-cols-[auto_minmax(0,1fr)] gap-6 md:gap-8 items-start">
              <ClientOnly>
                <SidebarRail seriesList={seriesList} />
              </ClientOnly>
              <div className="w-full min-w-0">{children}</div>
            </div>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
