import { resolveSiteUrl } from "@/lib/brand";
import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";

export default async function robots() {
  await connectDB();
  const settings = await SiteSettings.findOne({ key: "main" }).select("siteUrl allowAiCrawlers").lean();
  const siteUrl = resolveSiteUrl(settings?.siteUrl);
  return {
    rules: [{ userAgent: "*", allow: settings?.allowAiCrawlers === false ? ["/", "/llms.txt"] : "/" }],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
