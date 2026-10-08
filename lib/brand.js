// Single source of truth for the Marjan Tech Labs services brand layer.
// brandDomain is intentionally empty until a domain is purchased — never
// hardcode a domain anywhere else in the app. Use getSiteUrl() instead,
// which falls back to SiteSettings.siteUrl (set in the admin panel).

export const brand = {
  brandName: "Marjan Tech Labs",
  personName: "Ibrar Yousafzai",
  tagline: "AI assistants that answer your customers from your own data.",
  contactEmail: "", // set via admin Site content once a dedicated inbox exists
  brandDomain: "", // intentionally empty — do not hardcode
  ctaText: "Book a free call",
};

export function resolveSiteUrl(settingsSiteUrl) {
  const raw = brand.brandDomain || settingsSiteUrl || "https://ibraryousafzai.dev";
  return raw.replace(/\/$/, "");
}