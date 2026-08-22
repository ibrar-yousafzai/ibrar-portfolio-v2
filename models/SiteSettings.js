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
