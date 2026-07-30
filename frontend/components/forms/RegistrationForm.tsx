"use client";

import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";
import { FormEvent, useState } from "react";

type RetreatPreference =
  | "DAY_RETREAT"
  | "OVERNIGHT_RETREAT"
  | "NOT_SURE";

type RegistrationResponse = {
  success: boolean;
  message: string;
  registration?: {
    id: string;
    referenceNumber: string;
    caregiverName: string;
    email: string;
    participantFirstName: string;
    retreatPreference: RetreatPreference;
    status: string;
    createdAt: string;
  };
  errors?: Record<string, string[]>;
};

type RegistrationFormData = {
  caregiverName: string;
  email: string;
  phone: string;
  participantFirstName: string;
  participantAge: string;
  retreatPreference: RetreatPreference | "";
  preferredRetreat: string;
  message: string;
  contactConsent: boolean;
};

const initialFormData: RegistrationFormData = {
  caregiverName: "",
  email: "",
  phone: "",
  participantFirstName: "",
  participantAge: "",
  retreatPreference: "",
  preferredRetreat: "",
  message: "",
  contactConsent: false,
};

const inputStyles =
  "mt-2 min-h-12 w-full rounded-2xl border border-[var(--goearc-border)] bg-white px-4 py-3 text-[var(--goearc-text)] outline-none transition placeholder:text-[var(--goearc-muted)]/65 focus:border-[var(--goearc-primary)] focus:ring-4 focus:ring-[rgb(47_118_84_/_0.12)]";

export default function RegistrationForm() {
  const [formData, setFormData] =
    useState<RegistrationFormData>(initialFormData);

  const [fieldErrors, setFieldErrors] = useState<
    Record<string, string[]>
  >({});

  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  function updateField<K extends keyof RegistrationFormData>(
    field: K,
    value: RegistrationFormData[K],
  ) {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setFieldErrors((current) => {
      const updated = { ...current };
      delete updated[field];
      return updated;
    });

    setGeneralError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmitting(true);
    setGeneralError("");
    setFieldErrors({});

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      setGeneralError(
        "The registration service is not configured. Please contact GOEARC.",
      );
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/registrations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          caregiverName: formData.caregiverName,
          email: formData.email,
          phone: formData.phone,
          participantFirstName: formData.participantFirstName,
          participantAge: Number(formData.participantAge),
          retreatPreference: formData.retreatPreference,
          preferredRetreat: formData.preferredRetreat,
          message: formData.message,
          contactConsent: formData.contactConsent,
        }),
      });

      const result = (await response.json()) as RegistrationResponse;

      if (!response.ok || !result.success) {
        setFieldErrors(result.errors ?? {});
        setGeneralError(
          result.message ||
            "We could not submit your registration. Please review the form.",
        );
        return;
      }

      if (!result.registration) {
        throw new Error("Registration details were not returned.");
      }

      setReferenceNumber(result.registration.referenceNumber);
      setSubmittedEmail(result.registration.email);
      setFormData(initialFormData);
    } catch (error) {
      console.error("Registration submission failed:", error);

      setGeneralError(
        "We could not connect to the registration service. Please try again shortly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (referenceNumber) {
    return (
      <div className="rounded-[2rem] border border-[var(--goearc-border)] bg-white p-7 text-center shadow-[0_18px_50px_rgb(32_88_61_/_0.10)] sm:p-10">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--goearc-mist)] text-[var(--goearc-primary)]">
          <CheckCircle2 size={34} aria-hidden="true" />
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--goearc-primary)]">
          Registration received
        </p>

        <h2 className="mt-3 text-3xl font-semibold text-[var(--goearc-forest)]">
          Thank you for taking the first step.
        </h2>

        <p className="mx-auto mt-5 max-w-xl leading-8 text-[var(--goearc-muted)]">
          Your registration of interest has been saved. A member of the GOEARC
          team will review the information and contact you using the details
          provided.
        </p>

        <div className="mx-auto mt-7 max-w-md rounded-2xl bg-[var(--goearc-mist)] p-5">
          <p className="text-sm text-[var(--goearc-muted)]">
            Registration reference
          </p>

          <p className="mt-2 text-xl font-semibold tracking-wide text-[var(--goearc-forest)]">
            {referenceNumber}
          </p>
        </div>

        <p className="mt-6 text-sm text-[var(--goearc-muted)]">
          Registration associated with{" "}
          <span className="font-semibold text-[var(--goearc-text)]">
            {submittedEmail}
          </span>
        </p>

        <button
          type="button"
          onClick={() => {
            setReferenceNumber("");
            setSubmittedEmail("");
          }}
          className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--goearc-primary)] px-6 py-3 font-semibold text-white transition hover:bg-[var(--goearc-primary-dark)]"
        >
          Submit another registration
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[2rem] border border-[var(--goearc-border)] bg-white p-6 shadow-[0_18px_50px_rgb(32_88_61_/_0.09)] sm:p-8 lg:p-10"
      noValidate
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          label="Parent or caregiver name"
          htmlFor="caregiverName"
          required
          error={fieldErrors.caregiverName?.[0]}
        >
          <input
            id="caregiverName"
            name="caregiverName"
            type="text"
            autoComplete="name"
            value={formData.caregiverName}
            onChange={(event) =>
              updateField("caregiverName", event.target.value)
            }
            className={inputStyles}
            placeholder="Enter your full name"
          />
        </FormField>

        <FormField
          label="Email address"
          htmlFor="email"
          required
          error={fieldErrors.email?.[0]}
        >
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email}
            onChange={(event) => updateField("email", event.target.value)}
            className={inputStyles}
            placeholder="name@example.com"
          />
        </FormField>

        <FormField
          label="Phone number"
          htmlFor="phone"
          required
          error={fieldErrors.phone?.[0]}
        >
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={formData.phone}
            onChange={(event) => updateField("phone", event.target.value)}
            className={inputStyles}
            placeholder="647-555-0101"
          />
        </FormField>

        <FormField
          label="Participant's first name"
          htmlFor="participantFirstName"
          required
          error={fieldErrors.participantFirstName?.[0]}
        >
          <input
            id="participantFirstName"
            name="participantFirstName"
            type="text"
            value={formData.participantFirstName}
            onChange={(event) =>
              updateField("participantFirstName", event.target.value)
            }
            className={inputStyles}
            placeholder="First name only"
          />
        </FormField>

        <FormField
          label="Participant's age"
          htmlFor="participantAge"
          required
          error={fieldErrors.participantAge?.[0]}
        >
          <input
            id="participantAge"
            name="participantAge"
            type="number"
            min="1"
            max="100"
            inputMode="numeric"
            value={formData.participantAge}
            onChange={(event) =>
              updateField("participantAge", event.target.value)
            }
            className={inputStyles}
            placeholder="Age"
          />
        </FormField>

        <FormField
          label="Preferred experience"
          htmlFor="retreatPreference"
          required
          error={fieldErrors.retreatPreference?.[0]}
        >
          <select
            id="retreatPreference"
            name="retreatPreference"
            value={formData.retreatPreference}
            onChange={(event) =>
              updateField(
                "retreatPreference",
                event.target.value as RegistrationFormData["retreatPreference"],
              )
            }
            className={inputStyles}
          >
            <option value="">Select an option</option>
            <option value="DAY_RETREAT">Immersive day retreat</option>
            <option value="OVERNIGHT_RETREAT">
              Overnight sanctuary stay
            </option>
            <option value="NOT_SURE">Not sure yet</option>
          </select>
        </FormField>
      </div>

      <div className="mt-6">
        <FormField
          label="Preferred retreat or date"
          htmlFor="preferredRetreat"
          error={fieldErrors.preferredRetreat?.[0]}
          helpText="Optional. Enter a retreat name, preferred date, or leave this blank."
        >
          <input
            id="preferredRetreat"
            name="preferredRetreat"
            type="text"
            value={formData.preferredRetreat}
            onChange={(event) =>
              updateField("preferredRetreat", event.target.value)
            }
            className={inputStyles}
            placeholder="Example: Summer Family Retreat"
          />
        </FormField>
      </div>

      <div className="mt-6">
        <FormField
          label="How can GOEARC support your family?"
          htmlFor="message"
          error={fieldErrors.message?.[0]}
          helpText="Do not include medical records, health-card details, medication information, or other sensitive clinical information in this beta form."
        >
          <textarea
            id="message"
            name="message"
            rows={5}
            maxLength={1500}
            value={formData.message}
            onChange={(event) => updateField("message", event.target.value)}
            className={`${inputStyles} resize-y`}
            placeholder="Share any general questions, accessibility needs, or retreat preferences."
          />
        </FormField>
      </div>

      <div className="mt-7 rounded-2xl bg-[var(--goearc-mist)] p-5">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={formData.contactConsent}
            onChange={(event) =>
              updateField("contactConsent", event.target.checked)
            }
            className="mt-1 h-5 w-5 rounded border-[var(--goearc-border)] accent-[var(--goearc-primary)]"
          />

          <span>
            <span className="font-medium text-[var(--goearc-text)]">
              I consent to being contacted by GOEARC.
            </span>

            <span className="mt-1 block text-sm leading-6 text-[var(--goearc-muted)]">
              GOEARC may use the information submitted to respond to this
              registration of interest and discuss suitable retreat options.
            </span>
          </span>
        </label>

        {fieldErrors.contactConsent?.[0] && (
          <p className="mt-3 text-sm font-medium text-red-700">
            {fieldErrors.contactConsent[0]}
          </p>
        )}
      </div>

      {generalError && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-800"
        >
          <AlertCircle
            className="mt-0.5 shrink-0"
            size={20}
            aria-hidden="true"
          />

          <p className="text-sm leading-6">{generalError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-8 inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-[var(--goearc-primary)] px-7 py-3.5 font-semibold text-white shadow-lg transition hover:bg-[var(--goearc-primary-dark)] disabled:cursor-not-allowed disabled:opacity-65 sm:w-auto"
      >
        {isSubmitting ? (
          <>
            <LoaderCircle
              className="animate-spin"
              size={19}
              aria-hidden="true"
            />
            Submitting registration
          </>
        ) : (
          <>
            Submit registration
            <ArrowRight size={19} aria-hidden="true" />
          </>
        )}
      </button>

      <p className="mt-5 text-sm leading-6 text-[var(--goearc-muted)]">
        This is a registration of interest. Submission does not confirm a
        booking, clinical acceptance, pricing, or retreat availability.
      </p>
    </form>
  );
}

type FormFieldProps = {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
  error?: string;
  helpText?: string;
};

function FormField({
  label,
  htmlFor,
  children,
  required = false,
  error,
  helpText,
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="text-sm font-semibold text-[var(--goearc-text)]"
      >
        {label}

        {required && (
          <span
            className="ml-1 text-[var(--goearc-primary)]"
            aria-hidden="true"
          >
            *
          </span>
        )}
      </label>

      {children}

      {helpText && (
        <p className="mt-2 text-xs leading-5 text-[var(--goearc-muted)]">
          {helpText}
        </p>
      )}

      {error && (
        <p className="mt-2 text-sm font-medium text-red-700">{error}</p>
      )}
    </div>
  );
}