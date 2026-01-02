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
    <html lang="fa" dir="rtl">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
