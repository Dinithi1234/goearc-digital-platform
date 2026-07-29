import type { Request, Response } from "express";

import { prisma } from "../lib/prisma.js";
import { registrationSchema } from "../schemas/registration.schema.js";
import { generateRegistrationReference } from "../utils/reference-number.js";

export async function createRegistration(
  request: Request,
  response: Response,
) {
  const parsed = registrationSchema.safeParse(request.body);

  if (!parsed.success) {
    return response.status(400).json({
      success: false,
      message: "Please review the registration form.",
      errors: parsed.error.flatten().fieldErrors,
    });
  }

  const data = parsed.data;

  try {
    const registration = await prisma.registration.create({
      data: {
        referenceNumber: generateRegistrationReference(),
        caregiverName: data.caregiverName,
        email: data.email.toLowerCase(),
        phone: data.phone,
        participantFirstName: data.participantFirstName,
        participantAge: data.participantAge,
        retreatPreference: data.retreatPreference,
        preferredRetreat: data.preferredRetreat || null,
        message: data.message || null,
        contactConsent: data.contactConsent,
      },
      select: {
        id: true,
        referenceNumber: true,
        caregiverName: true,
        email: true,
        participantFirstName: true,
        retreatPreference: true,
        status: true,
        createdAt: true,
      },
    });

    return response.status(201).json({
      success: true,
      message: "Registration received successfully.",
      registration,
    });
  } catch (error) {
    console.error("Registration creation failed:", error);

    return response.status(500).json({
      success: false,
      message:
        "We could not save the registration. Please try again shortly.",
    });
  }
}