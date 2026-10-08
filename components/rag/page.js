import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import RagType from "@/models/RagType";
import Package from "@/models/Package";
import FaqItem from "@/models/FaqItem";
import CaseStudy from "@/models/CaseStudy";
import { brand, resolveSiteUrl } from "@/lib/brand";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import RagHero from "@/components/rag/RagHero";
import RagDemo from "@/components/rag/RagDemo";
import RagTypes from "@/components/rag/RagTypes";
import Packages from "@/components/rag/Packages";
import FitSelector from "@/components/rag/FitSelector";
import SavingsEstimator from "@/components/rag/SavingsEstimator";
import CaseStudies from "@/components/rag/CaseStudies";
import Industries from "@/components/rag/Industries";
import RagFaq from "@/components/rag/RagFaq";
import RagContactCta from "@/components/rag/RagContactCta";

export const dynamic = "force-dynamic";

function toPlain(doc) {
  return JSON.parse(JSON.stringify(doc));
}

async function getData() {
  await connectDB();
  const settings = await SiteSettings.findOne({ key: "main" });
  const ragTypes = await RagType.find({ status: "published" }).sort({ order: 1 });
  const packages = await Package.find({ status: "published" }).sort({ order: 1 });
  const faqItems = await FaqItem.find({ status: "published" }).sort({ order: 1 });
  const caseStudies = await CaseStudy.find({ status: "published" }).sort({ order: 1 });
  return {
    settings: toPlain(settings),
    ragTypes: toPlain(ragTypes),
    packages: toPlain(packages),
    faqItems: toPlain(faqItems),
    caseStudies: toPlain(caseStudies),
  };
}

export async function generateMetadata() {
  await connectDB();
  const settings = await SiteSettings.findOne({ key: "main" });
  const siteUrl = resolveSiteUrl(settings?.siteUrl);
  const title = `AI Assistants for Your Business — ${brand.brandName}`;
  const description = brand.tagline;

  return {
    title,
    description,
    alternates: { canonical: `${siteUrl}/rag` },
    openGraph: { title, description, url: `${siteUrl}/rag`, type: "website" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function RagPage() {
  const { settings, ragTypes, packages, faqItems, caseStudies } = await getData();
  const siteUrl = resolveSiteUrl(settings?.siteUrl);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: brand.brandName,
      url: `${siteUrl}/rag`,
      founder: { "@type": "Person", name: brand.personName },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: brand.personName,
      url: siteUrl,
      jobTitle: "AI Engineer",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: "AI Assistants", item: `${siteUrl}/rag` },
      ],
    },
    ...packages.map((p) => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: p.name,
      provider: { "@type": "Organization", name: brand.brandName },
      description: p.billingNote || undefined,
    })),
    faqItems.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqItems.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null,
  ].filter(Boolean);

  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <NavBar name={settings?.name || brand.personName} />
      <main className="flex-1">
        <Reveal><RagHero /></Reveal>
        <Reveal><RagDemo /></Reveal>
        <Reveal><RagTypes ragTypes={ragTypes} /></Reveal>
        <Reveal><Packages packages={packages} /></Reveal>
        <Reveal><FitSelector ragTypes={ragTypes} packages={packages} /></Reveal>
        <Reveal><SavingsEstimator /></Reveal>
        <Reveal><CaseStudies caseStudies={caseStudies} /></Reveal>
        <Reveal><Industries /></Reveal>
        <Reveal><RagFaq faqItems={faqItems} /></Reveal>
        <Reveal><RagContactCta /></Reveal>
      </main>
      <Footer settings={settings} />
    </>
  );
}