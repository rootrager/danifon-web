import type { Metadata, Viewport } from "next";
import { Vazirmatn, Inter } from "next/font/google";
import "./globals.css";
import AmbientPlayer from "./components/AmbientPlayer";
import { ThemeProvider } from "./components/ThemeProvider";

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Danifon - iPhone Store",
  description:
    "Danifon official mobile web app, live iPhone pricing, inventory showcase, installment and registry calculator.",
  applicationName: "Danifon",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  appleWebApp: {
    capable: true,
    title: "Danifon",
    statusBarStyle: "default",
  },
  openGraph: {
    title: "Danifon - iPhone Store",
    description:
      "Danifon official mobile web app, live iPhone pricing, inventory showcase, installment and registry calculator.",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF6EE",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const THEME_INIT_SCRIPT = `
(function() {
  try {
    var saved = localStorage.getItem('danifon-theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body
        className={`${vazirmatn.className} bg-[#FAF6EE] text-[#141413] antialiased min-h-dvh relative overflow-x-hidden selection:bg-[#FBBF24]/30 selection:text-[#141413]`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <main className="mx-auto w-full min-h-dvh relative z-10 flex flex-col">
            {children}
          </main>

          {/* Global Ambient Audio Toggle (user-initiated only) */}
          <AmbientPlayer />
        </ThemeProvider>
      </body>
    </html>
  );
}
