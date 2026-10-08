import Reveal from "./Reveal";

const DEFAULT_SERVICES = [
  { name: "RAG & AI Assistants", label: "AI systems", description: "Knowledge-grounded chatbots that answer from your business data and know when to hand off." },
  { name: "Websites & Web Apps", label: "Web products", description: "Fast, responsive websites and dashboards designed around a clear customer or business outcome." },
  { name: "Mobile & Internal Apps", label: "Applications", description: "Practical application experiences for teams, customers, workflows, and service delivery." },
  { name: "Custom Software", label: "Engineering", description: "Purpose-built tools that connect your data, processes, APIs, and people in one place." },
  { name: "SaaS Products", label: "Product builds", description: "MVPs and scalable SaaS foundations with authentication, billing, dashboards, and integrations." },
  { name: "Automation & Data", label: "Operations", description: "Automated workflows, data pipelines, analytics, and machine learning that reduce repetitive work." },
];

export default function Services({ settings = {} }) {
  const services = settings.services?.length ? settings.services : DEFAULT_SERVICES;

  return (
    <section id="services" className="border-b border-border">
      <div className="section-shell">
        <div className="services-heading">
          <div>
            <p className="section-kicker">{settings.servicesKicker || "What I can build"}</p>
            <h2>{settings.servicesHeading || "Services for your next digital product"}</h2>
          </div>
          <p>{settings.servicesIntro || "From an AI assistant to a complete SaaS product, I help turn useful ideas into working software."}</p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <Reveal key={`${service.name}-${index}`} delay={index * 60} className="service-grid-item">
              <article className={`service-card ${service.featured ? "featured" : ""}`}>
                <div className="service-card-number">{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <p className="service-card-label">{service.label || "Service"}</p>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                </div>
                <span className="service-card-arrow" aria-hidden="true">↗</span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
