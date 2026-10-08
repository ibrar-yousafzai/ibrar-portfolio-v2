import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { resolveSiteUrl } from "@/lib/brand";

export default async function sitemap() {
  await connectDB();
  const siteUrl = resolveSiteUrl();
  const projects = await Project.find({ published: true }).select("caseStudyUrl updatedAt").lean();
  const entries = [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/rag`, changeFrequency: "weekly", priority: 0.9 },
    ...projects
      .filter((project) => project.caseStudyUrl?.startsWith(siteUrl))
      .map((project) => ({ url: project.caseStudyUrl, lastModified: project.updatedAt, priority: 0.6 })),
  ];
  return entries;
}
