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

  const loadModel = (name) => require(`../models/${name}`).default;
  const SiteSettings = loadModel("SiteSettings");
  const Project = loadModel("Project");
  const Certification = loadModel("Certification");
  const Event = loadModel("Event");
  const RagType = loadModel("RagType");
  const Package = loadModel("Package");
  const FaqItem = loadModel("FaqItem");
  const CaseStudy = loadModel("CaseStudy");

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
    { upsert: true, returnDocument: "after" }
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

  const Experience = loadModel("Experience");
  const Announcement = loadModel("Announcement");

  if ((await Experience.countDocuments()) === 0) {
    await Experience.insertMany([
      {
        title: "BS Computer Science (in progress)",
        organization: "Your University",
        type: "Education",
        startDate: "2023",
        endDate: "Present",
        location: "Pakistan",
        description: "Core coursework in programming, data structures, statistics, and machine learning.",
        order: 0,
      },
      {
        title: "Founder",
        organization: "Khyber Future Hub",
        type: "Volunteer",
        startDate: "2024",
        endDate: "Present",
        description: "Built a community focused on learning, collaboration, and opportunity in AI and data.",
        order: 1,
      },
    ]);
    console.log("Sample experience entries seeded.");
  }

  if ((await Announcement.countDocuments()) === 0) {
    await Announcement.insertMany([
      {
        title: "Google AI Essentials — free course",
        category: "Free Course",
        description: "A beginner-friendly introduction to practical AI tools and concepts, free on Coursera.",
        linkUrl: "https://www.coursera.org/",
        linkLabel: "View course",
        date: "2026",
        order: 0,
      },
    ]);
    console.log("Sample announcement seeded.");
  }
  if ((await RagType.countDocuments()) === 0) {
    await RagType.insertMany([
      {
        name: "Basic RAG",
        slug: "basic-rag",
        explanation: "Answers questions by searching your documents and generating a reply grounded in what it finds.",
        bestFor: "Straightforward FAQs, policies, and product info.",
        whenNotToUse: "When you need the assistant to take actions, not just answer questions.",
        advanced: false,
        order: 0,
        status: "published",
      },
      {
        name: "Hybrid RAG",
        slug: "hybrid-rag",
        explanation: "Combines keyword search with semantic search, so exact terms (SKUs, order numbers) and fuzzy meaning both work.",
        bestFor: "Large catalogs or document sets where precision matters.",
        whenNotToUse: "Small FAQ sets where basic search is already accurate enough.",
        advanced: false,
        order: 1,
        status: "published",
      },
      {
        name: "Agentic RAG",
        slug: "agentic-rag",
        explanation: "Can call tools — look up a real order, capture a lead, or hand off to a human — not just answer from text.",
        bestFor: "Order status, lead capture, anything needing a live action.",
        whenNotToUse: "Simple static FAQ pages with no systems to connect to.",
        advanced: false,
        order: 2,
        status: "published",
      },
      {
        name: "Graph RAG",
        slug: "graph-rag",
        explanation: "Maps relationships between entities in your data for multi-hop, connected questions.",
        bestFor: "Complex internal knowledge bases with many linked records.",
        whenNotToUse: "Most small businesses — this is usually overkill.",
        advanced: true,
        order: 3,
        status: "published",
      },
      {
        name: "Multimodal RAG",
        slug: "multimodal-rag",
        explanation: "Understands images and diagrams alongside text, not just written documents.",
        bestFor: "Product photos, manuals with diagrams, visual catalogs.",
        whenNotToUse: "Purely text-based support content.",
        advanced: true,
        order: 4,
        status: "published",
      },
    ]);
    console.log("RAG types seeded.");
  }

  if ((await Package.countDocuments()) === 0) {
    await Package.insertMany([
      {
        name: "Pilot",
        priceText: "TODO",
        billingNote: "one-time setup",
        features: ["Basic RAG on your existing docs", "1 integration (e.g. website chat)", "2 weeks of support"],
        highlighted: false,
        order: 0,
        status: "published",
      },
      {
        name: "Setup + Launch",
        priceText: "TODO",
        billingNote: "one-time setup fee",
        features: ["Hybrid or Agentic RAG", "Order lookup / lead capture tools", "Human handoff built in"],
        highlighted: true,
        order: 1,
        status: "published",
      },
      {
        name: "Monthly Care",
        priceText: "TODO",
        billingNote: "per month",
        features: ["Ongoing monitoring", "Content updates as your docs change", "Monthly accuracy report"],
        highlighted: false,
        order: 2,
        status: "published",
      },
    ]);
    console.log("Packages seeded.");
  }

  if ((await FaqItem.countDocuments()) === 0) {
    await FaqItem.insertMany([
      {
        question: "How long does setup take?",
        answer: "A basic assistant can be live in days once I have access to your documents or policies.",
        order: 0,
        status: "published",
      },
      {
        question: "What happens when the assistant doesn't know the answer?",
        answer: "It says so honestly and hands the conversation to your team, rather than guessing.",
        order: 1,
        status: "published",
      },
      {
        question: "Can it look up real order data?",
        answer: "Yes, with the Agentic RAG approach — it can connect to your order system to pull live status.",
        order: 2,
        status: "published",
      },
    ]);
    console.log("FAQ items seeded.");
  }

  if ((await CaseStudy.countDocuments()) === 0) {
    await CaseStudy.insertMany([
      {
        title: "Bankly",
        summary: "",
        tags: ["Finance"],
        isTodoPlaceholder: true,
        order: 0,
        status: "published",
      },
      {
        title: "AI E-Commerce Shopping Assistant",
        summary: "",
        tags: ["E-commerce"],
        isTodoPlaceholder: true,
        order: 1,
        status: "published",
      },
    ]);
    console.log("Case study placeholders seeded — add real summaries in the admin.");
  }
  
  console.log("Done. Events were left empty — add real ones from the admin dashboard.");
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
