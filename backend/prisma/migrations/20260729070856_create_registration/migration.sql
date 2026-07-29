-- CreateEnum
CREATE TYPE "RetreatPreference" AS ENUM ('DAY_RETREAT', 'OVERNIGHT_RETREAT', 'NOT_SURE');

-- CreateEnum
CREATE TYPE "RegistrationStatus" AS ENUM ('NEW', 'CONTACTED', 'REVIEWING', 'CLOSED');

-- CreateTable
CREATE TABLE "Registration" (
    "id" TEXT NOT NULL,
    "referenceNumber" TEXT NOT NULL,
    "caregiverName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "participantFirstName" TEXT NOT NULL,
    "participantAge" INTEGER NOT NULL,
    "retreatPreference" "RetreatPreference" NOT NULL,
    "preferredRetreat" TEXT,
    "message" TEXT,
    "contactConsent" BOOLEAN NOT NULL,
    "status" "RegistrationStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Registration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Registration_referenceNumber_key" ON "Registration"("referenceNumber");

-- CreateIndex
CREATE INDEX "Registration_email_idx" ON "Registration"("email");

-- CreateIndex
CREATE INDEX "Registration_createdAt_idx" ON "Registration"("createdAt");

-- CreateIndex
CREATE INDEX "Registration_status_idx" ON "Registration"("status");
