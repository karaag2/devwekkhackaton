// User roles for RBAC
export type UserRole =
  | "PARTICIPANT"
  | "MENTOR"
  | "JUDGE"
  | "ORGANIZER"
  | "SPONSOR";

// Event statuses
export type EventStatus =
  | "DRAFT"
  | "REGISTRATION"
  | "HACKING"
  | "JUDGING"
  | "COMPLETED";

// Experience levels
export type ExperienceLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

// Sponsor tiers
export type SponsorTier = "PLATINUM" | "GOLD" | "SILVER";

// Ticket categories
export type TicketCategory = "TECHNICAL" | "TEAM" | "GENERAL";

// Ticket/Announcement priority
export type Priority = "LOW" | "NORMAL" | "HIGH" | "URGENT";

// Resource categories
export type ResourceCategory = "API" | "DATASET" | "TUTORIAL" | "DOCS" | "TOOL";

// Notification types
export type NotificationType =
  | "ANNOUNCEMENT"
  | "TEAM_INVITE"
  | "SUBMISSION"
  | "SCORE"
  | "SYSTEM";

// Schedule item types
export type ScheduleItemType =
  | "REGISTRATION"
  | "TEAM_FORMATION"
  | "WORKSHOP"
  | "HACKING"
  | "SUBMISSION"
  | "JUDGING"
  | "CEREMONY";

// Skill categories for matching
export const SKILL_CATEGORIES = {
  FRONTEND: [
    "React",
    "Vue",
    "Angular",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "HTML/CSS",
    "Tailwind",
  ],
  BACKEND: ["Node.js", "Python", "Go", "Rust", "Java", "C#", "PHP", "Ruby"],
  DATABASE: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Prisma", "Supabase"],
  MOBILE: ["React Native", "Flutter", "Swift", "Kotlin", "iOS", "Android"],
  DEVOPS: ["Docker", "Kubernetes", "AWS", "GCP", "Azure", "CI/CD"],
  AI_ML: ["TensorFlow", "PyTorch", "Machine Learning", "Data Science", "NLP"],
  DESIGN: ["Figma", "UI/UX", "Graphic Design", "Prototyping", "User Research"],
  OTHER: ["Blockchain", "IoT", "Security", "Game Dev", "AR/VR"],
} as const;

// All skills flat array
export const ALL_SKILLS = Object.values(SKILL_CATEGORIES).flat();

// Navigation items based on role
export const NAV_ITEMS = {
  PUBLIC: [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Resources", href: "/resources" },
  ],
  PARTICIPANT: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "My Team", href: "/team" },
    { label: "Workspace", href: "/workspace/default" },
    { label: "Submissions", href: "/submissions" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Help", href: "/support" },
  ],
  MENTOR: [
    { label: "Dashboard", href: "/mentor" },
    { label: "Sessions", href: "/mentor/sessions" },
    { label: "Teams", href: "/mentor/teams" },
  ],
  JUDGE: [
    { label: "Dashboard", href: "/judge" },
    { label: "Projects", href: "/judge/projects" },
    { label: "Scores", href: "/judge/scores" },
  ],
  ORGANIZER: [
    { label: "Admin", href: "/admin" },
    { label: "Events", href: "/admin/events" },
    { label: "Teams", href: "/admin/teams" },
    { label: "Users", href: "/admin/users" },
    { label: "Announcements", href: "/admin/announcements" },
    { label: "Tickets", href: "/admin/tickets" },
  ],
  SPONSOR: [
    { label: "Dashboard", href: "/sponsor" },
    { label: "Showcase", href: "/sponsors" },
  ],
} as const;
