import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import Project from "@/models/Project";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import RagLanding from "@/components/RagLanding";

export const dynamic = "force-dynamic";

function toPlain(value) {
  return JSON.parse(JSON.stringify(value));
}

export default async function RagPage() {
  await connectDB();
  const settings = await SiteSettings.findOne({ key: "main" });
  const projects = await Project.find({ published: true }).sort({ order: 1, createdAt: 1 });

  return (
    <>
      <NavBar name={settings?.name || "Ibrar Yousafzai"} />
      <main className="flex-1">
        <RagLanding settings={toPlain(settings || {})} projects={toPlain(projects)} />
      </main>
      <Footer settings={toPlain(settings || { name: "Ibrar Yousafzai", communityName: "" })} />
    </>
  );
}
