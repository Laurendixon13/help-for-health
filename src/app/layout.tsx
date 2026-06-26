import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Help 4 Health | Helping kids in hospitals feel supported",
  description:
    "A student-led movement bringing comfort, joy, and hope to children through service, fundraising, local volunteering, and Joy Visits.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full scroll-smooth antialiased`}>
      <body className="min-h-full">
        <div className="app-shell">{children}</div>
      </body>
    </html>
  );
}
