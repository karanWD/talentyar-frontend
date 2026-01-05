import { Abril_Fatface } from "next/font/google";
import localFont from "next/font/local";

export const appFont = localFont({
  src: [
    {
      path: "../../assets/fonts/IRANSansXFaNum-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    // {
    //   path: "../../assets/fonts/IRANSansX-Medium.woff2",
    //   weight: "500",
    //   style: "normal",
    // },
    {
      path: "../../assets/fonts/IRANSansXFaNum-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-app",
  display: "swap",
});

export const abril = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abril",
});
