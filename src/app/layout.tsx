import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { env } from "@/lib/env";
import { OfficeTimezoneProvider } from "@/components/providers/office-timezone-provider";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: { default: "Rooms", template: "%s · Rooms" },
  description:
    "Book meeting rooms and silent spaces at the Remotecoders Maadi office.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className="min-h-dvh font-sans antialiased">
        <OfficeTimezoneProvider timezone={env.OFFICE_TIMEZONE}>
          {children}
        </OfficeTimezoneProvider>
      </body>
    </html>
  );
}
