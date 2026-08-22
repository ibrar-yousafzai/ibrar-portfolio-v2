import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import Project from "@/models/Project";
import Certification from "@/models/Certification";
import Event from "@/models/Event";

import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Events from "@/components/Events";
import VisitorCounter from "@/components/VisitorCounter";
import Community from "@/components/Community";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const dynamic = "force-dynamic";

function toPlain(doc) {
  return JSON.parse(JSON.stringify(doc));
}

async function getData() {
  await connectDB();

  let settings = await SiteSettings.findOne({ key: "main" });
  if (!settings) settings = await SiteSettings.create({ key: "main" });

  const projects = await Project.find({}).sort({ order: 1, createdAt: 1 });
  const certifications = await Certification.find({}).sort({ order: 1, createdAt: 1 });
  const events = await Event.find({}).sort({ order: 1, createdAt: 1 });

  return {
    settings: toPlain(settings),
    projects: toPlain(projects),
    certifications: toPlain(certifications),
    events: toPlain(events),
  };
}

export default async function Home() {
  const { settings, projects, certifications, events } = await getData();

  return (
    <>
      <NavBar name={settings.name} />
      <main className="flex-1">
        <Hero
          settings={settings}
          projectCount={projects.filter((p) => p.published).length}
          certCount={certifications.filter((c) => c.published).length}
        />
        <About settings={settings} />
        <Skills settings={settings} />
        <Projects projects={projects} />
        <Certifications certifications={certifications} visionStatement={settings.visionStatement} />
        <Events events={events} />
        <VisitorCounter />
        <Community settings={settings} />
        <Contact settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
