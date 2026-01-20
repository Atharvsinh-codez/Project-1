import * as z from "zod";

// --- Sub-Schemas ---

export const step1Schema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required") // Ensures it's not empty
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),

  creatorHandle: z
    .string()
    .min(1, "Creator handle is required")
    .min(3, "Handle must be at least 3 characters")
    .max(30, "Handle cannot exceed 30 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Handle can only contain letters, numbers, and underscores"
    )
    .toLowerCase(),

  bio: z
    .string()
    .min(1, "Bio is required")
    .min(50, "Bio must be at least 50 characters to provide enough context")
    .max(500, "Bio cannot exceed 500 characters"),

  category: z.enum([
    "artist",
    "musician",
    "writer",
    "developer",
    "influencer",
    "entrepreneur",
    "other",
  ]), // Removed the config object to fix the overload error

  wallet: z
    .string()
    .min(1, "Solana wallet address is required")
    .min(32, "Wallet address is too short (min 32 characters)")
    .max(44, "Wallet address is too long (max 44 characters)")
    .regex(/^[A-HJ-NP-Za-km-z1-9]+$/, "Invalid Solana wallet address format"),

  phoneNumber: z.string().optional(),
});

export const step2Schema = z.object({
  tokenName: z
    .string()
    .min(1, "Token name is required")
    .min(2, "Token name must be at least 2 characters")
    .max(50, "Token name cannot exceed 50 characters"),

  tokenSymbol: z
    .string()
    .min(1, "Token symbol is required")
    .min(2, "Symbol must be at least 2 characters")
    .max(10, "Symbol cannot exceed 10 characters")
    .regex(/^[A-Z0-9]+$/, "Symbol must be uppercase alphanumeric (A-Z, 0-9)")
    .toUpperCase(),

  tokenPitch: z
    .string()
    .min(1, "Token pitch is required")
    .min(100, "Pitch must be at least 100 characters. Tell a compelling story!")
    .max(1000, "Pitch cannot exceed 1000 characters"),

  fundingGoal: z
    .string()
    .optional()
    .refine(
      (val) => !val || (!isNaN(Number(val)) && Number(val) > 0),
      "Funding goal must be a valid positive number"
    ),

  icoSupply: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d+$/.test(val),
      "Supply must be a valid positive integer (no decimals)"
    ),
});

export const step3Schema = z.object({
  socials: z
    .array(
      z.object({
        platform: z.enum([
          "twitter",
          "instagram",
          "youtube",
          "tiktok",
          "linkedin",
          "facebook",
          "other",
        ]),
        handle: z
          .string()
          .min(1, "Social handle is required")
          .max(100, "Handle is too long"),
        url: z
          .string()
          .min(1, "URL is required")
          .url("Please enter a valid URL (e.g., https://twitter.com/user)")
          .max(500, "URL is too long"),
      })
    )
    .min(1, "Please link at least one social media account"),
});

export const step4Schema = z.object({
  documents: z
    .array(
      z.object({
        type: z.enum([
          "identity",
          "proof_of_address",
          "business_license",
          "tax_document",
          "other",
        ]),
        fileUrl: z
          .string()
          .min(1, "File URL is required")
          .url("Invalid file URL generated"),
        notes: z
          .string()
          .max(500, "Notes cannot exceed 500 characters")
          .optional(),
      })
    )
    .min(1, "Please upload at least one verification document"),
});

export const step5Schema = z.object({
  // Logic: Must be boolean AND must be true
  contentOwnershipDeclared: z.boolean().refine((val) => val === true, {
    message: "You must declare content ownership and agree to terms to proceed",
  }),
});

// --- Combined Schema ---
export const onboardingSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema);

export type OnboardingFormData = z.infer<typeof onboardingSchema>;
