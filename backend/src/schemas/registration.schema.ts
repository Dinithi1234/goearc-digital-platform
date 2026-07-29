import { z } from "zod";

export const registrationSchema = z.object({
  caregiverName: z
    .string()
    .trim()
    .min(2, "Caregiver name is required.")
    .max(100),

  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(150),

  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(30),

  participantFirstName: z
    .string()
    .trim()
    .min(1, "Participant first name is required.")
    .max(80),

  participantAge: z.coerce
    .number()
    .int()
    .min(1, "Age must be at least 1.")
    .max(100, "Age must be 100 or below."),

  retreatPreference: z.enum([
    "DAY_RETREAT",
    "OVERNIGHT_RETREAT",
    "NOT_SURE",
  ]),

  preferredRetreat: z
    .string()
    .trim()
    .max(150)
    .optional()
    .or(z.literal("")),

  message: z
    .string()
    .trim()
    .max(1500)
    .optional()
    .or(z.literal("")),

  contactConsent: z.literal(true, {
    error: "Consent is required before submitting.",
  }),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;