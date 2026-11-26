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
    "Danifon official mobile landing, stock inventory showcase, VIP waitlist, installment calculator, and Apple ID order system.",
  openGraph: {
    title: "Danifon - iPhone Store",
    description:
      "Danifon official mobile landing, stock inventory showcase, VIP waitlist, installment calculator, and Apple ID order system.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8fbff" },
    { media: "(prefers-color-scheme: dark)", color: "#04060c" },
  ],
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
