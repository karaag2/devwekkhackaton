import { z } from "zod";

// ==================== AUTH SCHEMAS ====================

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// ==================== USER PROFILE SCHEMAS ====================

export const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  bio: z.string().max(500, "Bio must be less than 500 characters").optional(),
  github: z.string().url().optional().or(z.literal("")),
  gitlab: z.string().url().optional().or(z.literal("")),
  linkedin: z.string().url().optional().or(z.literal("")),
  website: z.string().url().optional().or(z.literal("")),
  skills: z.array(z.string()).optional(),
  experienceLevel: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(),
  interests: z.array(z.string()).optional(),
});

// ==================== TEAM SCHEMAS ====================

export const createTeamSchema = z.object({
  name: z.string().min(2, "Team name must be at least 2 characters").max(50),
  description: z.string().max(500).optional(),
  lookingFor: z.string().max(200).optional(),
});

export const joinTeamSchema = z.object({
  inviteCode: z.string().min(1, "Invite code is required"),
});

// ==================== EVENT SCHEMAS ====================

export const createEventSchema = z.object({
  name: z.string().min(3, "Event name must be at least 3 characters"),
  description: z.string().optional(),
  rules: z.string().optional(),
  maxTeamSize: z.number().min(1).max(10),
  minTeamSize: z.number().min(1).max(10),
  registrationStart: z.date(),
  registrationEnd: z.date(),
  hackingStart: z.date(),
  hackingEnd: z.date(),
  judgingStart: z.date(),
  judgingEnd: z.date(),
});

// ==================== SUBMISSION SCHEMAS ====================

export const submissionSchema = z.object({
  name: z.string().min(3, "Project name must be at least 3 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  repoUrl: z
    .string()
    .url("Invalid repository URL")
    .optional()
    .or(z.literal("")),
  demoUrl: z.string().url("Invalid demo URL").optional().or(z.literal("")),
  videoUrl: z.string().url("Invalid video URL").optional().or(z.literal("")),
  pitchDeckUrl: z
    .string()
    .url("Invalid pitch deck URL")
    .optional()
    .or(z.literal("")),
});

// ==================== SCORING SCHEMAS ====================

export const scoreSchema = z.object({
  score: z.number().min(0).max(10),
  comment: z.string().max(1000).optional(),
});

// ==================== TICKET SCHEMAS ====================

export const ticketSchema = z.object({
  category: z.enum(["TECHNICAL", "TEAM", "GENERAL"]),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).default("NORMAL"),
});

// ==================== RESOURCE SCHEMAS ====================

export const resourceSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  url: z.string().url("Invalid URL"),
  category: z.enum(["API", "DATASET", "TUTORIAL", "DOCS", "TOOL"]),
  tags: z.array(z.string()).optional(),
});

// ==================== WORKSHOP SCHEMAS ====================

export const workshopSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().optional(),
  speaker: z.string().optional(),
  meetingLink: z.string().url().optional().or(z.literal("")),
  startTime: z.date(),
  endTime: z.date(),
});

// ==================== ANNOUNCEMENT SCHEMAS ====================

export const announcementSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  target: z
    .enum(["ALL", "PARTICIPANTS", "MENTORS", "JUDGES", "SPECIFIC_TEAM"])
    .default("ALL"),
  targetId: z.string().optional(),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"]).default("NORMAL"),
});

// Type exports
export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type CreateTeamInput = z.infer<typeof createTeamSchema>;
export type JoinTeamInput = z.infer<typeof joinTeamSchema>;
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type SubmissionInput = z.infer<typeof submissionSchema>;
export type ScoreInput = z.infer<typeof scoreSchema>;
export type TicketInput = z.infer<typeof ticketSchema>;
export type ResourceInput = z.infer<typeof resourceSchema>;
export type WorkshopInput = z.infer<typeof workshopSchema>;
export type AnnouncementInput = z.infer<typeof announcementSchema>;

export const hackathonInscriptionSchema = z
  .object({
    // Step 1: Account
    name: z.string().min(2, "Le nom est requis"),
    email: z.string().email("Email invalide"),
    password: z.string().min(8, "8 caractères minimum"),
    confirmPassword: z.string(),
    // Step 2: Tech
    role: z.enum([
      "FRONTEND",
      "BACKEND",
      "FULLSTACK",
      "MOBILE",
      "AI",
      "DESIGN",
    ]),
    level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
    github: z.string().url("URL GitHub invalide").optional().or(z.literal("")),
    // Step 3: Motivation
    motivation: z.string().min(20, "Dites-nous en un peu plus (20 car. min)"),
    hasTeam: z.boolean().default(false),
    teamName: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

export type HackathonInscriptionInput = z.infer<
  typeof hackathonInscriptionSchema
>;
