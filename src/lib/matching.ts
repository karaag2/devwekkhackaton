import { SKILL_CATEGORIES, ALL_SKILLS } from "@/types";

interface UserProfile {
  id: string;
  skills: string[];
  interests: string[];
  experienceLevel: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
}

interface TeamProfile {
  id: string;
  name: string;
  lookingFor: string[]; // Skills needed
  members: UserProfile[];
}

/**
 * Calculates a match score (0-100) between a user and a team
 */
export function calculateMatchScore(
  user: UserProfile,
  team: TeamProfile
): number {
  let score = 0;

  // 1. Skill Match (40 points)
  // Check if user has skills the team is looking for
  const userSkillsLower = user.skills.map((s) => s.toLowerCase());
  const lookingForLower = team.lookingFor.map((s) => s.toLowerCase());

  const skillMatches = lookingForLower.filter((skill) =>
    userSkillsLower.some(
      (userSkill) => userSkill.includes(skill) || skill.includes(userSkill)
    )
  );

  if (lookingForLower.length > 0) {
    score += (skillMatches.length / lookingForLower.length) * 40;
  }

  // 2. Skill Complementarity (30 points)
  // If team has mostly backend, and user is frontend, that's good.
  const teamSkills = team.members.flatMap((m) => m.skills);
  const teamCategories = getSkillCategories(teamSkills);
  const userCategories = getSkillCategories(user.skills);

  // Simple logic: if user adds a category the team completely lacks
  const missingCategories = Object.keys(SKILL_CATEGORIES).filter(
    (cat) => !teamCategories.includes(cat)
  );

  const fillsGap = userCategories.some((cat) =>
    missingCategories.includes(cat)
  );
  if (fillsGap) {
    score += 30;
  }

  // 3. Experience Balance (20 points)
  // Avoid teams of all beginners or all advanced? Or mix?
  // Let's bias towards mixed teams for hackathons
  const teamLevels = team.members.map((m) => m.experienceLevel);
  const hasAdvanced = teamLevels.includes("ADVANCED");
  const hasBeginner = teamLevels.includes("BEGINNER");

  if (user.experienceLevel === "ADVANCED" && !hasAdvanced) score += 20;
  if (user.experienceLevel === "BEGINNER" && hasAdvanced) score += 20; // Mentorship opp

  // 4. Interest Alignment (10 points)
  // Todo: check interest overlap

  return Math.min(Math.round(score), 100);
}

function getSkillCategories(skills: string[]): string[] {
  const categories = new Set<string>();

  skills.forEach((skill) => {
    Object.entries(SKILL_CATEGORIES).forEach(([category, catSkills]) => {
      // @ts-ignore
      if (catSkills.some((s) => s.toLowerCase() === skill.toLowerCase())) {
        categories.add(category);
      }
    });
  });

  return Array.from(categories);
}
