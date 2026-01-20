import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// For Next.js API routes (not Edge Functions), we can use standard PrismaClient
// The Neon adapter is only needed for serverless/edge environments
// Ensure DATABASE_URL is set (Prisma 6 reads from env("DATABASE_URL") in schema)
const connectionString =
  process.env.DATABASE_URL || process.env.DIRECT_DATABASE_URL;

if (!connectionString) {
  throw new Error(
    "DATABASE_URL or DIRECT_DATABASE_URL environment variable must be set. " +
      "Please create a .env file in your project root with:\n" +
      'DATABASE_URL="postgresql://user:password@host:5432/database?sslmode=require"'
  );
}

// Ensure DATABASE_URL is set for Prisma schema
if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = connectionString;
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

// Prevent multiple instances of Prisma Client in development
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// In production (serverless), each function gets its own instance
// which is fine and expected behavior
