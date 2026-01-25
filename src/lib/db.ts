import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  // IMPORTANT: In Serverless (Vercel), each function is a separate instance.
  // Setting 'max: 1' ensures we don't hoard connections on Render.
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 1, // Only 1 connection per Vercel instance
  });
  const adapter = new PrismaPg(pool);
  
  return new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
    adapter,
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
