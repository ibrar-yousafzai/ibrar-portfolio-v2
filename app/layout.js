import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export async function generateMetadata() {
  try {
    await connectDB();
    const settings = await SiteSettings.findOne({ key: "main" });
    return {
      title: settings?.metaTitle || "Ibrar Yousafzai — Data Scientist | AI & ML",
      description:
        settings?.metaDescription ||
        "Entry-level Data Scientist and AI/ML engineer building practical, explainable machine learning work.",
      icons: {
        icon: "/icon.png",
        apple: "/icon.png",
      },
    };
  } catch {
    return {
      title: "Ibrar Yousafzai — Data Scientist | AI & ML",
      description:
        "Entry-level Data Scientist and AI/ML engineer building practical, explainable machine learning work.",
      icons: {
        icon: "/icon.png",
        apple: "/icon.png",
      },
    };
  }
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">{children}</body>
    </html>
  );
}
