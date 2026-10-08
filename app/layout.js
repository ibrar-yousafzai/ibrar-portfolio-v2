import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import ScrollProgress from "@/components/ScrollProgress";
import ChatWidget from "@/components/ChatWidget";
import { brand, resolveSiteUrl } from "@/lib/brand";

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
    const siteUrl = resolveSiteUrl(settings?.siteUrl);
    const title = settings?.metaTitle || "Ibrar Yousafzai — AI Engineer, RAG Chatbot & Software Developer";
    const description =
      settings?.metaDescription ||
      "Ibrar Yousafzai builds RAG chatbots, AI assistants, websites, apps, custom software, SaaS products, automation, and data systems for businesses.";
    return {
      title,
      description,
      keywords: [
        "Ibrar Yousafzai",
        "AI engineer",
        "RAG chatbot developer",
        "AI assistant development",
        "custom software development",
        "SaaS development",
        "web app development",
        "machine learning",
        "data science",
      ],
      metadataBase: new URL(siteUrl),
      alternates: { canonical: siteUrl },
      openGraph: { title, description, url: siteUrl, type: "website", siteName: brand.brandName },
      twitter: { card: "summary_large_image", title, description },
      robots: settings?.allowAiCrawlers === false ? { index: true, follow: true, "noai": true, "noimageai": true } : { index: true, follow: true },
      icons: settings?.faviconUrl ? { icon: settings.faviconUrl } : undefined,
    };
  } catch {
    return {
      title: "Ibrar Yousafzai — AI Engineer, RAG Chatbot & Software Developer",
      description:
        "Ibrar Yousafzai builds RAG chatbots, AI assistants, websites, apps, custom software, SaaS products, automation, and data systems for businesses.",
    };
  }
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <ScrollProgress />
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
