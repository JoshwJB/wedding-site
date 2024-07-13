import type { Metadata } from "next";
import "./globals.css";
import {crimsonText} from "@/app/fonts";

export const metadata: Metadata = {
  title: "Catherine and Joshua's Wedding",
  description: "At the Clandeboye Lodge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={crimsonText.className}>{children}</body>
    </html>
  );
}
