import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Telegram mini app",
  description: "testing with ramez",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <script
      async
      src="https://telegram.org/js/telegram-widget.js?22"
      data-telegram-login="test2314nBot"
      data-size="large"
      data-auth-url="https://test-n55s.vercel.app/"
      data-request-access="write"
    ></script>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
