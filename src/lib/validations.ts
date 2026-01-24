import { z } from "zod";

export const hackathonInscriptionSchema = z.object({
  // Step 1
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  phone: z.string().optional(),
  city: z.string().min(2, "City is required"),
  country: z.string().min(2, "Country is required"),

  // Step 2
  status: z.enum(["STUDENT", "PROFESSIONAL", "OTHER"], {
    required_error: "Please select a status",
  }),
  schoolOrCompany: z.string().min(2, "Organization name is required"),
  role: z.enum(["FRONTEND", "BACKEND", "FULLSTACK", "AI"], {
    required_error: "Please select a role",
  }),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"], {
    required_error: "Please select your level",
  }),
  skills: z.string().min(2, "Please list at least one skill"),
  bio: z.string().optional(),

  // Step 3
  github: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  portfolio: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  trackInterest: z.enum(["AI", "SECURITY", "INTERFACE", "GENERAL"], {
    required_error: "Please select a track",
  }),
  tshirtSize: z.enum(["XS", "S", "M", "L", "XL", "XXL"], {
    required_error: "Please select a size",
  }),
  dietaryRestrictions: z.string().optional(),

  // Step 4
  motivation: z.string().min(20, "Please ensure your motivation is descriptive enough (min 20 chars)"),
  hasTeam: z.boolean().default(false),
  agreeToRules: z.boolean().refine((val) => val === true, {
    message: "You must agree to the rules to participate",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export type HackathonInscriptionInput = z.infer<typeof hackathonInscriptionSchema>;
