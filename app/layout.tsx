import type { Metadata } from "next";
import HeaderVisibility from "@/components/layout/HeaderVisibility";
import Footer from "@/components/layout/Footer";
import "./globals.css";


export const metadata: Metadata = {
  title: "MyInviteVerse — Create Memorable Invitations",
  description:
    "Create beautiful interactive and 3D digital invitations and share them instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HeaderVisibility />
        {children}
        <Footer />
      </body>
    </html>
  );
}