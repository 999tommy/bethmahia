import type { Metadata } from "next";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout";

export const metadata: Metadata = {
  metadataBase: new URL("https://bethmahia.netlify.app"),
  title: "Bethany Amahia | Social Media Manager",
  description:
    "Bethany Amahia Chioma - Social Media Manager based in Lagos, Nigeria. Expert in content strategy, community growth, paid campaigns, and brand storytelling. Meta, Accenture & HubSpot certified.",
  keywords: [
    "social media manager",
    "content strategy",
    "Lagos Nigeria",
    "Bethany Amahia",
    "digital marketing",
    "community management",
  ],
  icons: {
    icon: "/beth.jpeg",
    apple: "/beth.jpeg",
  },
  openGraph: {
    title: "Bethany Amahia | Social Media Manager",
    description: "Result-driven social media manager helping brands tell stories that stop the scroll.",
    type: "website",
    url: "https://bethmahia.netlify.app",
    images: [{ url: "/beth.jpeg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bethany Amahia | Social Media Manager",
    description: "Result-driven social media manager helping brands tell stories that stop the scroll.",
    images: ["/beth.jpeg"],
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
        {/* ConditionalLayout hides Navbar/Footer on /love */}
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
