import MagneticButton from "./MagneticButton";

export default function Hero({ settings, projectCount, certCount }) {
  const clamp = (value, min, max, fallback) => {
    const number = Number(value);
    return Number.isFinite(number) ? Math.min(max, Math.max(min, number)) : fallback;
  };

  return (
    <section
      id="hero"
      className="site-hero relative overflow-hidden border-b border-border"
      style={{
        ...(settings.heroImageUrl ? { "--hero-image": `url("${settings.heroImageUrl}")` } : {}),
        "--hero-image-position": settings.heroImagePosition || "center 28%",
        "--hero-image-fit": settings.heroImageFit === "contain" ? "contain" : "cover",
        "--hero-image-overlay": `${clamp(settings.heroImageOverlay, 10, 80, 24)}%`,
        "--hero-image-brightness": `${clamp(settings.heroImageBrightness, 45, 120, 100)}%`,
        "--hero-image-saturation": `${clamp(settings.heroImageSaturation, 0, 160, 100)}%`,
        "--hero-image-contrast": `${clamp(settings.heroImageContrast, 70, 140, 100)}%`,
      }}
    >
      <div className="site-hero-content">
        <p className="font-mono-tag text-xs uppercase tracking-[0.2em] text-accent">
          {settings.eyebrow || "AI • DATA • AUTOMATION"}
        </p>
        <h1 className="site-hero-name">
          {(settings.name || "Ibrar Yousafzai").split(" ").map((part) => <span key={part}>{part}</span>)}
        </h1>
        <div className="site-hero-band">{settings.heroBandLabel || "RAG · AGENTS · AUTOMATION"}</div>
        <p className="site-hero-tag">{settings.heroTagline || "I build AI chatbots that answer your customers from your own data."}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <MagneticButton href="#contact" className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-[#04140f] transition hover:opacity-90">
            {settings.heroPrimaryCta || "Book a Free Call"}
          </MagneticButton>
          <a href="/rag" className="rounded-xl border border-accent px-6 py-3 text-sm font-semibold text-accent transition hover:bg-accent/10">
            {settings.heroSecondaryCta || "See Live Demo"}
          </a>
        </div>
      </div>
    </section>
  );
}
