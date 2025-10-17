import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["200", "400"],
});

export const metadata: Metadata = {
  title: "2048 game",
  description: "Classic 2048 game with dynamic board size selection",
  icons: {
    icon: "/game-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
