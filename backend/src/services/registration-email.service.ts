import "dotenv/config";

import nodemailer from "nodemailer";

type RegistrationEmailData = {
  referenceNumber: string;
  caregiverName: string;
  email: string;
  phone: string;
  participantFirstName: string;
  participantAge: number;
  retreatPreference:
    | "DAY_RETREAT"
    | "OVERNIGHT_RETREAT"
    | "NOT_SURE";
  preferredRetreat: string | null;
  message: string | null;
  createdAt: Date;
};

type EmailDeliveryResult = {
  adminSent: boolean;
  familySent: boolean;
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatPreference(
  preference: RegistrationEmailData["retreatPreference"],
): string {
  const labels = {
    DAY_RETREAT: "Immersive Day Retreat",
    OVERNIGHT_RETREAT: "Overnight Sanctuary Stay",
    NOT_SURE: "Not Sure Yet",
  } as const;

  return labels[preference];
}

export async function sendRegistrationEmails(
  data: RegistrationEmailData,
): Promise<EmailDeliveryResult> {
  console.log("sendRegistrationEmails called for:", data.email);

  const emailEnabled =
    (process.env.EMAIL_ENABLED ?? "false").toLowerCase() === "true";

  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPassword = process.env.SMTP_APP_PASSWORD?.replace(/\s/g, "");
  const adminEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL?.trim() || smtpUser;
  const fromName = process.env.EMAIL_FROM_NAME?.trim() || "GOEARC Beta";

  if (!emailEnabled) {
    console.log("Registration emails are disabled.");

    return {
      adminSent: false,
      familySent: false,
    };
  }

  if (!smtpUser || !smtpPassword || !adminEmail) {
    console.error("Gmail SMTP configuration is incomplete.", {
      hasSmtpUser: Boolean(smtpUser),
      hasSmtpPassword: Boolean(smtpPassword),
      hasAdminEmail: Boolean(adminEmail),
    });

    return {
      adminSent: false,
      familySent: false,
    };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: smtpPassword,
    },
  });

  const sender = `"${fromName}" <${smtpUser}>`;

  const adminHtml = `
    <h2>New GOEARC registration</h2>

    <p><strong>Reference:</strong> ${escapeHtml(data.referenceNumber)}</p>
    <p><strong>Caregiver:</strong> ${escapeHtml(data.caregiverName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>
    <p><strong>Participant:</strong> ${escapeHtml(
      data.participantFirstName,
    )}</p>
    <p><strong>Age:</strong> ${data.participantAge}</p>
    <p><strong>Experience:</strong> ${escapeHtml(
      formatPreference(data.retreatPreference),
    )}</p>

    ${
      data.preferredRetreat
        ? `<p><strong>Preferred retreat/date:</strong> ${escapeHtml(
            data.preferredRetreat,
          )}</p>`
        : ""
    }

    ${
      data.message
        ? `<p><strong>Message:</strong><br>${escapeHtml(data.message)}</p>`
        : ""
    }

    <p><strong>Submitted:</strong> ${escapeHtml(
      data.createdAt.toISOString(),
    )}</p>
  `;

  const familyHtml = `
<div style="font-family: Arial, Helvetica, sans-serif; max-width:650px; margin:auto; background:#ffffff; border:1px solid #e8e8e8; border-radius:12px; overflow:hidden;">

  <div style="background:#3A7D44; padding:30px; text-align:center;">
    <h1 style="color:white; margin:0; font-size:30px;">
      Welcome to GOEARC
    </h1>
    <p style="color:#eef8ef; margin-top:10px; font-size:16px;">
      Garden of Eden Autism Retreat Centre
    </p>
  </div>

  <div style="padding:35px; color:#333; line-height:1.8; font-size:16px;">

    <p>Dear <strong>${escapeHtml(data.caregiverName)}</strong>,</p>

    <p>
      Thank you for taking the first step toward becoming part of the
      <strong>Garden of Eden Autism Retreat Centre (GOEARC)</strong> community.
    </p>

    <p>
      We know that every family's autism journey is unique, and reaching out for
      support is not always easy. We are truly honoured that you have chosen to
      connect with us.
    </p>

    <p>
      Your registration has been safely received and a member of our team will
      personally review your information before contacting you regarding the
      next steps.
    </p>

    <div style="background:#F5FBF6; border-left:5px solid #3A7D44; padding:20px; margin:30px 0; border-radius:8px;">

      <h3 style="margin-top:0; color:#2f6d39;">
        Your Registration Details
      </h3>

      <p><strong>Reference Number</strong><br>
      ${escapeHtml(data.referenceNumber)}</p>

      <p><strong>Participant</strong><br>
      ${escapeHtml(data.participantFirstName)}</p>

      <p><strong>Preferred Experience</strong><br>
      ${escapeHtml(formatPreference(data.retreatPreference))}</p>

      ${
        data.preferredRetreat
          ? `
            <p><strong>Preferred Retreat</strong><br>
            ${escapeHtml(data.preferredRetreat)}</p>
          `
          : ""
      }

    </div>

    <h3 style="color:#3A7D44;">
      What happens next?
    </h3>

    <ul style="padding-left:20px; line-height:1.9;">
      <li>Our team will carefully review your registration.</li>
      <li>We may contact you if additional information is needed.</li>
      <li>We'll discuss retreat options that best fit your family's needs.</li>
      <li>You'll receive guidance throughout every step of the process.</li>
    </ul>

    <p>
      At GOEARC, we believe every individual deserves to be understood,
      every caregiver deserves support,
      and every family deserves a place where they can reconnect, recharge,
      and thrive together.
    </p>

    <p>
      We are grateful you've entrusted us with a small part of your family's
      journey.
    </p>

    <p>
      If you have any questions before we contact you, please don't hesitate
      to reply to this email or reach out to our team.
    </p>

    <br>

    <p style="margin-bottom:5px;">
      With warmth,
    </p>

    <p style="margin-top:0;">
      <strong>The GOEARC Team</strong><br>
      Garden of Eden Autism Retreat Centre
    </p>

  </div>

  <div style="background:#F8F8F8; text-align:center; padding:20px; font-size:13px; color:#666;">

    <strong>Garden of Eden Autism Retreat Centre</strong><br>

    📧 info@autismretreat.ca<br>

    🌐 www.autismretreat.ca

    <br><br>

    <em>
      "Where nature nurtures, families reconnect, and hope grows."
    </em>

  </div>

</div>
`;

  let adminSent = false;
  let familySent = false;

  try {
    const adminInfo = await transporter.sendMail({
      from: sender,
      to: adminEmail,
      replyTo: data.email,
      subject: `New GOEARC registration — ${data.referenceNumber}`,
      html: adminHtml,
    });

    adminSent = true;

    console.log("Admin email sent successfully:", {
      messageId: adminInfo.messageId,
      accepted: adminInfo.accepted,
      rejected: adminInfo.rejected,
    });
  } catch (error) {
    console.error("Admin email failed:", error);
  }

  try {
    const familyInfo = await transporter.sendMail({
      from: sender,
      to: data.email,
      replyTo: adminEmail,
      subject: `GOEARC registration received — ${data.referenceNumber}`,
      html: familyHtml,
    });

    familySent = true;

    console.log("Family email sent successfully:", {
      messageId: familyInfo.messageId,
      accepted: familyInfo.accepted,
      rejected: familyInfo.rejected,
    });
  } catch (error) {
    console.error("Family email failed:", error);
  }

  return {
    adminSent,
    familySent,
  };
}