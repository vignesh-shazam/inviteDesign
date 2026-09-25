import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "InviteDesign — Create Memorable Invitations",
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
      <body>{children}</body>
    </html>
  );
}