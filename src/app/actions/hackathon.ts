"use server";

import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { hackathonInscriptionSchema, type HackathonInscriptionInput } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function submitHackathonRegistration(data: HackathonInscriptionInput) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "You must be logged in to complete registration." };
  }

  try {
    const validated = hackathonInscriptionSchema.parse(data);

    // Update the user record with additional info and mark as onboarded
    await db.user.update({
      where: { id: session.user.id },
      data: {
        name: validated.name,
        phone: validated.phone,
        city: validated.city,
        country: validated.country,
        status: validated.status,
        schoolOrCompany: validated.schoolOrCompany,
        experienceLevel: validated.level,
        skills: validated.skills,
        bio: validated.bio,
        github: validated.github,
        linkedin: validated.linkedin,
        portfolio: validated.portfolio,
        trackInterest: validated.trackInterest,
        tshirtSize: validated.tshirtSize,
        dietaryRestrictions: validated.dietaryRestrictions,
        motivation: validated.motivation,
        hasTeam: validated.hasTeam,
        agreeToRules: validated.agreeToRules,
        onboarded: true,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/hackatonInscriptionForm");

    return { success: true };
  } catch (error: any) {
    console.error("Hackathon registration error:", error);
    return { error: error.message || "Failed to save registration." };
  }
}

export async function getUserProfile() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return null;

  const user = await db.user.findUnique({
    where: { id: session.user.id }
  });

  return user;
}
