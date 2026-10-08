import mongoose from "mongoose";

const SkillGroupSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    items: { type: [String], default: [] },
  },
  { _id: false }
);

const SiteSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: "main", unique: true },

    // Hero
    name: { type: String, default: "Ibrar Yousafzai" },
    role: { type: String, default: "Data Scientist (Entry-Level) | AI & Machine Learning" },
    foundingLine: { type: String, default: "Ibrar Yousafzai, AI Engineer, founder of Marjan Tech Labs." },
    heroTagline: {
      type: String,
      default:
        "I focus on Artificial Intelligence, Machine Learning, and data-driven analysis — building practical work that turns data into useful decisions.",
    },
    heroPrimaryCta: { type: String, default: "Book a Free Call" },
    heroSecondaryCta: { type: String, default: "See Live Demo" },
    heroBandLabel: { type: String, default: "RAG · AGENTS · AUTOMATION" },
    eyebrow: { type: String, default: "AI ENGINEER · DATA SCIENTIST" },
    avatarUrl: { type: String, default: "" },
    heroImageUrl: { type: String, default: "" },
    heroImagePosition: { type: String, default: "center center" },
    heroImageOverlay: { type: Number, default: 42 },
    heroImageFit: { type: String, default: "cover" },
    heroImageBrightness: { type: Number, default: 78 },
    heroImageSaturation: { type: Number, default: 92 },
    heroImageContrast: { type: Number, default: 103 },
    aboutImageUrl: { type: String, default: "" },
    useSameProfileImage: { type: Boolean, default: true },
    sidebarRole: { type: String, default: "AI Engineer · RAG Chatbots" },
    faviconUrl: { type: String, default: "" },

    // About
    aboutIntro: { type: String, default: "" },
    aboutSectionSubtitle: { type: String, default: "From student builder to AI service provider" },
    aboutBody: { type: String, default: "" },
    howIWork: { type: [String], default: [] },
    openTo: { type: [String], default: [] },

    // Skills
    skills: { type: [SkillGroupSchema], default: [] },

    // Community
    communityName: { type: String, default: "Khyber Future Hub" },
    communityBlurb: { type: String, default: "" },
    communityJoinUrl: { type: String, default: "" },

    // Vision
    visionStatement: { type: String, default: "" },
    visionHeading: { type: String, default: "Where I’m heading" },
    visionProductsTitle: { type: String, default: "Building Useful AI Products" },
    visionProductsBody: { type: [String], default: [] },
    visionGrowthTitle: { type: String, default: "Growing Together" },
    visionGrowthBody: { type: [String], default: [] },

    // Home section copy
    businessCardTitle: { type: String, default: "I’m a business looking for an AI assistant" },
    businessCardBody: { type: String, default: "See how I build AI assistants trained on your own data." },
    businessCardLink: { type: String, default: "Explore AI Assistants →" },
    collaborationCardTitle: { type: String, default: "I’m hiring, collaborating, or want to see projects" },
    collaborationCardBody: { type: String, default: "Browse my data science and machine learning work directly." },
    collaborationCardLink: { type: String, default: "View projects →" },
    projectsKicker: { type: String, default: "Selected work" },
    projectsHeading: { type: String, default: "Built for useful outcomes" },
    projectsIntro: { type: String, default: "Applied AI, data products, and automation with a clear path from problem to result." },
    skillsKicker: { type: String, default: "Toolkit" },
    skillsHeading: { type: String, default: "Tools I use to ship" },
    skillsIntro: { type: String, default: "A practical stack for turning messy data and business workflows into dependable AI products." },
    contactHeading: { type: String, default: "Let’s build something data-driven and useful." },
    contactBody: { type: String, default: "Tell me what your customers keep asking and I’ll reply with a clear plan for a useful AI assistant." },
    contactCta: { type: String, default: "Book a Free Call" },

    // Contact / socials
    whatsappUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    kaggleUrl: { type: String, default: "" },
    facebookUrl: { type: String, default: "" },
    instagramUrl: { type: String, default: "" },
    email: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    location: { type: String, default: "Islamabad, Pakistan" },

    // SEO
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    allowAiCrawlers: { type: Boolean, default: true },
    llmsTxtSummary: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.SiteSettings ||
  mongoose.model("SiteSettings", SiteSettingsSchema);
