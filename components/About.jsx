export default function About({ settings }) {
  return (
    <section id="about" className="border-b border-border">
      <div className="section-shell">
        <div className="section-heading">
          <p className="section-kicker">Introduction</p>
          <h2>About {settings.name?.split(" ")[0] || "Me"}</h2>
          <p>From student builder to AI service provider</p>
        </div>

        <div className="about-grid">
          <div className="about-photo-wrap">
            <div className="about-photo-shape" aria-hidden="true" />
            {settings.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={settings.avatarUrl} alt={settings.name} className="about-photo" />
            ) : (
              <div className="about-photo about-photo-fallback">IY</div>
            )}
          </div>

          <div className="about-copy">
            <h3>{settings.aboutIntro || "Building AI that solves real business problems"}</h3>
            {settings.aboutBody ? <p>{settings.aboutBody}</p> : null}
            {settings.communityName ? (
              <p>
                I also lead <strong>{settings.communityName}</strong>, a community initiative around learning,
                collaboration, and opportunity.
              </p>
            ) : null}
            <div className="about-panels">
              <div>
                <h4>How I work</h4>
                <ul>{settings.howIWork?.map((item, i) => <li key={i}>— {item}</li>)}</ul>
              </div>
              <div>
                <h4>Open to</h4>
                <ul>{settings.openTo?.map((item, i) => <li key={i}>— {item}</li>)}</ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
