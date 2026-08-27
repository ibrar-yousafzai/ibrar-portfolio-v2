import mongoose from "mongoose";

const SkillGroupSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    items: { type: [String], default: [] },
  },
  { _id: false }
);

const RAGItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { _id: false }
);

const SiteSettingsSchema = new mongoose.Schema(
  {
    key: { type: String, default: "main", unique: true },

    // Hero
    name: { type: String, default: "Ibrar Yousafzai" },
    role: { type: String, default: "Data Scientist (Entry-Level) | AI & Machine Learning" },
    eyebrow: { type: String, default: "AI Engineer · Data Scientist" },
    heroTagline: {
      type: String,
      default:
        "I focus on Artificial Intelligence, Machine Learning, and data-driven analysis — building practical work that turns data into useful decisions.",
    },

    // About
    aboutIntro: { type: String, default: "" },
    aboutBody: { type: String, default: "" },
    howIWork: { type: [String], default: [] },
    openTo: { type: [String], default: [] },

    // Skills
    skills: { type: [SkillGroupSchema], default: [] },

    // RAG models
    ragIntro: {
      type: String,
      default:
        "Retrieval-Augmented Generation connects language models to trusted business data, making answers more accurate, current, and useful.",
    },
    ragModelTypes: {
      type: [RAGItemSchema],
      default: [
        { name: "Naive RAG", description: "Retrieve relevant chunks, then generate a grounded answer." },
        { name: "Advanced RAG", description: "Improve retrieval with query rewriting, reranking, and hybrid search." },
        { name: "Graph RAG", description: "Use entities and relationships to answer questions across connected data." },
        { name: "Multimodal RAG", description: "Retrieve and reason over text, images, tables, and documents together." },
      ],
    },
    ragIndustries: {
      type: [RAGItemSchema],
      default: [
        { name: "Healthcare", description: "Search clinical knowledge and policy documents with traceable answers." },
        { name: "Finance", description: "Query reports, regulations, and internal research with better control." },
        { name: "Education", description: "Build learning assistants grounded in courses and institutional content." },
        { name: "Legal", description: "Find clauses, precedents, and case evidence across large document sets." },
        { name: "E-commerce", description: "Power product discovery and support from live catalog and policy data." },
        { name: "Manufacturing", description: "Give teams fast access to manuals, maintenance, and safety knowledge." },
      ],
    },

    // Community
    communityName: { type: String, default: "Khyber Future Hub" },
    communityBlurb: { type: String, default: "" },
    communityJoinUrl: { type: String, default: "" },

    // Vision
    visionStatement: { type: String, default: "" },

    // Contact / socials
    whatsappUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    githubUrl: { type: String, default: "" },
    kaggleUrl: { type: String, default: "" },
    facebookUrl: { type: String, default: "" },
    email: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    location: { type: String, default: "Islamabad, Pakistan" },

    // SEO
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.SiteSettings ||
  mongoose.model("SiteSettings", SiteSettingsSchema);
