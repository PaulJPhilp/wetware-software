import { ClientOnly } from "@/components/ClientOnly";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeaderProvider } from "@/components/HeaderContext";
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
      <body className="font-serif min-h-screen flex flex-col">
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
            <div className="pt-14 md:pt-16 pb-20 flex-1 w-full flex items-start gap-0 min-h-0">
              {/* Left rail anchored to viewport left */}
              <ClientOnly>
                <SidebarRail seriesList={seriesList} />
              </ClientOnly>
              {/* Main content container remains centered */}
              <main className="flex-1 min-w-0 flex flex-col">
                <div className="max-w-screen-2xl mx-auto px-4 md:px-6 py-2 flex-1">
                  <div className="w-full min-w-0">{children}</div>
                </div>
              </main>
            </div>
          </HeaderProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
