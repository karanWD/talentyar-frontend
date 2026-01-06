import { abril, appFont } from "@/core/fonts/font";

import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Talenyar | تلنت‌یار",
  description: "اینجا جاییه که فوتبال حرف اول را میزنه",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${appFont.variable} ${abril.variable} font-sans`}
    >
      <body className="bg-background">
        <Providers>
          <div className="mx-auto min-h-screen max-w-125">{children}</div>
        </Providers>
      </body>
    </html>
  );
}
