import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import CommunityModel from "@/models/Community";
import Project from "@/models/Project";
import Certification from "@/models/Certification";
import Event from "@/models/Event";
import ExperienceModel from "@/models/Experience";
import Announcement from "@/models/Announcement";

import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import HomeRoutingBlock from "@/components/HomeRoutingBlock";
import RagDemo from "@/components/rag/RagDemo";
import About from "@/components/About";
import ExperienceSection from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Events from "@/components/Events";
import Announcements from "@/components/Announcements";
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
  const experiences = await ExperienceModel.find({}).sort({ order: 1, createdAt: 1 });
  const announcements = await Announcement.find({}).sort({ order: 1, createdAt: -1 });
  const communities = await CommunityModel.find({}).sort({ order: 1, createdAt: 1 });

  return {
    settings: toPlain(settings),
    projects: toPlain(projects),
    certifications: toPlain(certifications),
    events: toPlain(events),
    experiences: toPlain(experiences),
    announcements: toPlain(announcements),
    communities: toPlain(communities),
  };
}

export default async function Home() {
  const { settings, projects, certifications, events, experiences, announcements, communities } = await getData();

  return (
    <>
      <NavBar name={settings.name} />
      <main className="flex-1">
                <Hero
          settings={settings}
          projectCount={projects.filter((p) => p.published).length}
          certCount={certifications.filter((c) => c.published).length}
        />
        <Reveal><HomeRoutingBlock /></Reveal>
        <Reveal><RagDemo /></Reveal>
        <Reveal><About settings={settings} /></Reveal>

        <Reveal><ExperienceSection experiences={experiences} /></Reveal>
        <Reveal><Skills settings={settings} /></Reveal>
        <Reveal><Projects projects={projects} /></Reveal>
        <Reveal><Certifications certifications={certifications} visionStatement={settings.visionStatement} /></Reveal>
        <Reveal><Events events={events} /></Reveal>
        <Reveal><Announcements announcements={announcements} /></Reveal>
        <Reveal><VisitorCounter /></Reveal>
        <Reveal><Community communities={communities} /></Reveal>
        <Reveal><Contact settings={settings} /></Reveal>
      </main>
      <Footer settings={settings} />
    </>
  );
}
