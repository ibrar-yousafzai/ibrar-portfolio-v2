import Reveal from "./Reveal";

export default function Skills({ settings }) {
  return (
    <section id="skills" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="projects-heading">
          <div>
            <p className="section-kicker">{settings?.skillsKicker || "Toolkit"}</p>
            <h2>{settings?.skillsHeading || "Tools I use to ship"}</h2>
          </div>
          <p>{settings?.skillsIntro || "A practical stack for turning messy data and business workflows into dependable AI products."}</p>
        </div>

        <div className="skills-showcase">
          {settings.skills?.map((group, i) => (
            <Reveal key={i} delay={i * 80} className="skill-grid-item">
              <div className="skill-card">
              <div className="skill-card-top"><span>{String(i + 1).padStart(2, "0")}</span><h3>{group.category}</h3></div>
              <div className="skill-meter"><span style={{ width: `${Math.min(92, 48 + (group.items?.length || 0) * 8)}%` }} /></div>
              <div className="skill-list">
                {group.items?.map((item, j) => (
                  <span
                    key={j}
                    className="skill-chip"
                  >
                    {item}
                  </span>
                ))}
              </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
