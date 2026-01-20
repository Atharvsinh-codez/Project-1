import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// Get connection string from environment
const connectionString =
  process.env.DATABASE_URL || process.env.DIRECT_DATABASE_URL;

// Create a lazy-initialized Prisma client
// This prevents build-time errors when DATABASE_URL is not set
const createPrismaClient = () => {
  if (!connectionString) {
    console.warn(
      "DATABASE_URL is not set. Database operations will fail at runtime."
    );
    // Return a proxy that throws helpful errors when accessed
    return new Proxy({} as PrismaClient, {
      get(_, prop) {
        if (prop === "then" || prop === "catch") return undefined;
        throw new Error(
          `DATABASE_URL environment variable must be set. ` +
          `Please create a .env file with your database connection string.`
        );
      },
    });
  }

  // Ensure DATABASE_URL is set for Prisma schema
  if (!process.env.DATABASE_URL) {
    process.env.DATABASE_URL = connectionString;
  }

  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// Prevent multiple instances of Prisma Client in development
if (process.env.NODE_ENV !== "production" && connectionString) {
  globalForPrisma.prisma = prisma;
}
