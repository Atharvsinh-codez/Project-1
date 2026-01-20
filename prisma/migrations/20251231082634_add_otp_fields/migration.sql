-- AlterTable
ALTER TABLE "waitlist" ADD COLUMN     "otp" TEXT,
ADD COLUMN     "otpExpiresAt" TIMESTAMP(3);
