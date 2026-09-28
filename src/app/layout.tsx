import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Banhu Tourism — Experience the Heritage of Mpumalanga",
  description:
    "Storytelling, heritage walks and authentic bushveld experiences around Acornhoek and the greater Lowveld — where nature meets community. Tour packages, add-on tours, airport transfers and shuttles across Mpumalanga.",
  keywords: [
    "Banhu Tourism",
    "Acornhoek",
    "Mpumalanga",
    "bushveld",
    "heritage tours",
    "Panorama Route",
    "Kruger",
    "Bushbuckridge",
    "storytelling",
  ],
  authors: [{ name: "Banhu Tourism" }],
  icons: {
    icon: "/images/banhu-logo.png",
  },
  openGraph: {
    title: "Banhu Tourism — Experience the Heritage of Mpumalanga",
    description:
      "Storytelling, heritage walks and authentic bushveld experiences around Acornhoek and the greater Lowveld — where nature meets community.",
    siteName: "Banhu Tourism",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
