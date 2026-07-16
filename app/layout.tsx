import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Bethany Amahia | Social Media Manager",
  description:
    "Bethany Amahia Chioma — Social Media Manager based in Lagos, Nigeria. Expert in content strategy, community growth, paid campaigns, and brand storytelling. Meta, Accenture & HubSpot certified.",
  keywords: [
    "social media manager",
    "content strategy",
    "Lagos Nigeria",
    "Bethany Amahia",
    "digital marketing",
    "community management",
  ],
  openGraph: {
    title: "Bethany Amahia | Social Media Manager",
    description: "Result-driven social media manager helping brands tell stories that stop the scroll.",
    type: "website",
    url: "https://bethmahia.netlify.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bethany Amahia | Social Media Manager",
    description: "Result-driven social media manager helping brands tell stories that stop the scroll.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans bg-cream text-mauve-dark antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
