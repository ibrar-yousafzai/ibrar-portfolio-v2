// Run once after setting MONGODB_URI in .env.local:
//   node scripts/seed.js
// Safe to re-run: it upserts the settings doc and only inserts
// projects/certifications/events if the collections are empty.
require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

async function run() {
  if (!process.env.MONGODB_URI) {
    console.error("MONGODB_URI is not set. Add it to .env.local first.");
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGODB_URI);

  const SiteSettings = require("../models/SiteSettings");
  const Project = require("../models/Project");
  const Certification = require("../models/Certification");
  const Event = require("../models/Event");

  await SiteSettings.findOneAndUpdate(
    { key: "main" },
    {
      key: "main",
      name: "Ibrar Yousafzai",
      role: "Data Scientist (Entry-Level) | AI & Machine Learning",
      eyebrow: "AI Engineer · Data Scientist",
      heroTagline:
        "I focus on Artificial Intelligence, Machine Learning, and data-driven analysis — building practical work that turns data into useful decisions.",
      aboutIntro: "I build AI systems, data stories, and practical machine learning work.",
      aboutBody:
        "I am an entry-level Data Scientist and aspiring AI Engineer focused on Python, SQL, machine learning, and clear analysis. My work is centered on turning data into models, insights, and decisions that are easy to understand and use.",
      howIWork: [
        "Start with the problem and the data shape before touching the model.",
        "Use EDA and visualisation to uncover patterns and failure points.",
        "Prefer reproducible notebooks and readable documentation.",
        "Think about the business or user outcome, not only the metric.",
      ],
      openTo: [
        "Data Science and Data Analyst roles",
        "AI and machine learning internships",
        "Collaborative, impact-driven tech projects",
      ],
      skills: [
        { category: "Programming", items: ["Python", "SQL"] },
        { category: "Data science", items: ["Data analysis", "EDA", "Data visualization"] },
        { category: "Thinking & problem-solving", items: ["Critical thinking", "Structured problem-solving"] },
        { category: "Machine learning", items: ["Scikit-learn", "Model building"] },
        { category: "Tools", items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "Google Colab", "GitHub"] },
      ],
      communityName: "Khyber Future Hub",
      communityBlurb:
        "A community initiative around learning, collaboration, and opportunity for aspiring data and AI professionals.",
      communityJoinUrl: "https://chat.whatsapp.com/ECea3vF80Td0HLObeHBn4G",
      visionStatement:
        "I aim to grow as a professional Data Scientist and AI engineer who builds intelligent, ethical systems that solve real problems — while scaling impact through community work with Khyber Future Hub and partnerships that put data and AI to work for people and organisations.",
      whatsappUrl: "https://wa.me/923448935702?text=Hello%20Ibrar,%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect.",
      linkedinUrl: "https://www.linkedin.com/in/ibrar-yousafzai-815228178",
      githubUrl: "https://github.com/ibrar-yousafzai",
      kaggleUrl: "https://www.kaggle.com/ibraryousafzai",
      facebookUrl: "https://www.facebook.com/share/1GKTbjYtCY/?mibextid=wwXIfr",
      location: "Islamabad, Pakistan",
      metaTitle: "Ibrar Yousafzai — Data Scientist (Entry-Level) | AI & ML",
      metaDescription:
        "Entry-level Data Scientist and AI/ML engineer building practical, explainable machine learning work.",
    },
    { upsert: true, new: true }
  );
  console.log("Site settings seeded.");

  if ((await Project.countDocuments()) === 0) {
    await Project.insertMany([
      {
        title: "Air quality prediction",
        category: "Environmental AI",
        status: "Case study",
        summary:
          "Predicting pollution signals from environmental data with a clean modelling workflow that feels useful for monitoring and planning.",
        tags: ["Python", "Regression", "EDA", "Environmental data"],
        outcome: "From raw readings to a repeatable ML pipeline, designed to surface trends and drivers clearly.",
        order: 0,
      },
      {
        title: "Customer churn prediction",
        category: "Retention analytics",
        status: "Case study",
        summary:
          "A telecom-style churn model that flags higher-risk customers and frames the work around explainable retention signals.",
        tags: ["Classification", "Python", "Scikit-learn", "Business impact"],
        outcome: "Built to communicate what drives churn, not just the score.",
        order: 1,
      },
    ]);
    console.log("Sample projects seeded.");
  }

  if ((await Certification.countDocuments()) === 0) {
    await Certification.insertMany([
      { group: "Google", title: "Google Project Management Professional Certificate", order: 0 },
      { group: "Google", title: "Google Business Intelligence Professional Certificate", order: 1 },
      { group: "Google", title: "Google AI Essentials", order: 2 },
      { group: "Google", title: "Google Prompting Essentials", order: 3 },
      { group: "Cybersecurity", title: "Google Cybersecurity Professional Certificate", order: 4 },
      { group: "Business & Communication", title: "LUMSx – Business Communication & AI for Professionals", order: 5 },
    ]);
    console.log("Sample certifications seeded.");
  }

  console.log("Done. Events were left empty — add real ones from the admin dashboard.");
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
