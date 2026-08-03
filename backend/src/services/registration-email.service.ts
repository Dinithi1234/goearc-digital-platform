import "dotenv/config";

import sgMail from "@sendgrid/mail";

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

type SendGridError = {
  message?: string;
  code?: number;
  response?: {
    statusCode?: number;
    body?: unknown;
  };
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

function logSendGridError(label: string, error: unknown): void {
  const sendGridError = error as SendGridError;

  console.error(label, {
    message: sendGridError?.message,
    code: sendGridError?.code,
    statusCode: sendGridError?.response?.statusCode,
    body: sendGridError?.response?.body,
  });
}

export async function sendRegistrationEmails(
  data: RegistrationEmailData,
): Promise<EmailDeliveryResult> {
  console.log("sendRegistrationEmails called for:", data.email);

  const emailEnabled =
    (process.env.EMAIL_ENABLED ?? "false").toLowerCase() === "true";

  const apiKey = process.env.SENDGRID_API_KEY?.trim();
  const senderEmail = process.env.SENDGRID_FROM_EMAIL?.trim();
  const senderName =
    process.env.SENDGRID_FROM_NAME?.trim() || "GOEARC Beta";
  const adminEmail =
    process.env.ADMIN_NOTIFICATION_EMAIL?.trim();

  if (!emailEnabled) {
    console.log("Registration emails are disabled.");

    return {
      adminSent: false,
      familySent: false,
    };
  }

  if (!apiKey || !senderEmail || !adminEmail) {
    console.error("SendGrid email configuration is incomplete.", {
      hasApiKey: Boolean(apiKey),
      hasSenderEmail: Boolean(senderEmail),
      hasAdminEmail: Boolean(adminEmail),
    });

    return {
      adminSent: false,
      familySent: false,
    };
  }

  sgMail.setApiKey(apiKey);

  const preference = escapeHtml(
    formatPreference(data.retreatPreference),
  );

  const adminHtml = `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;background:#edf5ef;font-family:Arial,Helvetica,sans-serif;color:#20392c;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="padding:30px 15px;">
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                style="max-width:650px;background:#ffffff;border-radius:20px;overflow:hidden;"
              >
                <tr>
                  <td style="background:#2f7654;padding:28px 32px;color:#ffffff;">
                    <p style="margin:0;font-size:12px;font-weight:700;letter-spacing:2px;">
                      GOEARC REGISTRATION
                    </p>

                    <h1 style="margin:10px 0 0;font-size:26px;">
                      New family registration
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding:32px;line-height:1.7;">
                    <p>A new registration of interest has been submitted.</p>

                    <div style="background:#edf5ef;border-radius:14px;padding:18px;margin:22px 0;">
                      <p style="margin:0;color:#607368;font-size:13px;">
                        Reference number
                      </p>

                      <p style="margin:6px 0 0;font-size:21px;font-weight:700;color:#163f2d;">
                        ${escapeHtml(data.referenceNumber)}
                      </p>
                    </div>

                    <p>
                      <strong>Caregiver:</strong>
                      ${escapeHtml(data.caregiverName)}
                    </p>

                    <p>
                      <strong>Email:</strong>
                      ${escapeHtml(data.email)}
                    </p>

                    <p>
                      <strong>Phone:</strong>
                      ${escapeHtml(data.phone)}
                    </p>

                    <p>
                      <strong>Participant:</strong>
                      ${escapeHtml(data.participantFirstName)}
                    </p>

                    <p>
                      <strong>Age:</strong>
                      ${data.participantAge}
                    </p>

                    <p>
                      <strong>Preferred experience:</strong>
                      ${preference}
                    </p>

                    ${
                      data.preferredRetreat
                        ? `
                          <p>
                            <strong>Preferred retreat or date:</strong>
                            ${escapeHtml(data.preferredRetreat)}
                          </p>
                        `
                        : ""
                    }

                    ${
                      data.message
                        ? `
                          <h2 style="margin-top:28px;font-size:18px;color:#163f2d;">
                            Family message
                          </h2>

                          <p style="line-height:1.7;white-space:pre-wrap;">
                            ${escapeHtml(data.message)}
                          </p>
                        `
                        : ""
                    }

                    <p style="margin-top:28px;color:#607368;font-size:13px;">
                      Submitted:
                      ${escapeHtml(data.createdAt.toISOString())}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const familyHtml = `
    <!doctype html>
    <html lang="en">
      <body style="margin:0;background:#edf5ef;font-family:Arial,Helvetica,sans-serif;color:#20392c;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="padding:30px 15px;">
              <table
                role="presentation"
                width="100%"
                cellspacing="0"
                cellpadding="0"
                style="max-width:650px;background:#ffffff;border-radius:20px;overflow:hidden;"
              >
                <tr>
                  <td style="background:#2f7654;padding:32px;text-align:center;color:#ffffff;">
                    <h1 style="margin:0;font-size:30px;">
                      Welcome to GOEARC
                    </h1>

                    <p style="margin:10px 0 0;color:#e5f3e9;">
                      Garden of Eden Autism Retreat Centre
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="padding:34px;line-height:1.75;font-size:16px;">
                    <p>
                      Dear
                      <strong>${escapeHtml(data.caregiverName)}</strong>,
                    </p>

                    <p>
                      Thank you for taking this first step and connecting with
                      the Garden of Eden Autism Retreat Centre.
                    </p>

                    <p>
                      We understand that every family's journey is unique.
                      Reaching out for support can take courage, and we are
                      truly grateful that you have chosen to share this step
                      with us.
                    </p>

                    <p>
                      Your registration for
                      <strong>${escapeHtml(data.participantFirstName)}</strong>
                      has been safely received. A member of the GOEARC team
                      will carefully review the information and contact you
                      regarding the next steps.
                    </p>

                    <div style="background:#edf5ef;border-left:5px solid #2f7654;border-radius:12px;padding:20px;margin:28px 0;">
                      <p style="margin:0;color:#607368;font-size:13px;">
                        Your registration reference
                      </p>

                      <p style="margin:7px 0 18px;font-size:22px;font-weight:700;color:#163f2d;">
                        ${escapeHtml(data.referenceNumber)}
                      </p>

                      <p style="margin:0 0 8px;">
                        <strong>Participant:</strong>
                        ${escapeHtml(data.participantFirstName)}
                      </p>

                      <p style="margin:0;">
                        <strong>Preferred experience:</strong>
                        ${preference}
                      </p>

                      ${
                        data.preferredRetreat
                          ? `
                            <p style="margin:8px 0 0;">
                              <strong>Preferred retreat or date:</strong>
                              ${escapeHtml(data.preferredRetreat)}
                            </p>
                          `
                          : ""
                      }
                    </div>

                    <h2 style="font-size:20px;color:#2f7654;">
                      What happens next?
                    </h2>

                    <ul style="padding-left:22px;line-height:1.9;">
                      <li>Our team will carefully review your registration.</li>
                      <li>We will contact you if any clarification is needed.</li>
                      <li>
                        We will discuss retreat options that may suit your
                        family.
                      </li>
                      <li>
                        Availability and further steps will be confirmed
                        separately.
                      </li>
                    </ul>

                    <p>
                      At GOEARC, we believe every individual deserves to feel
                      understood, every caregiver deserves support, and every
                      family deserves opportunities to reconnect, recharge,
                      and grow together.
                    </p>

                    <p>
                      Please keep your registration reference for future
                      communication.
                    </p>

                    <p style="margin-top:28px;">
                      With warmth,<br>
                      <strong>The GOEARC Team</strong><br>
                      Garden of Eden Autism Retreat Centre
                    </p>
                  </td>
                </tr>

                <tr>
                  <td style="background:#f8faf7;padding:22px;text-align:center;color:#607368;font-size:13px;line-height:1.7;">
                    info@autismretreat.ca<br>
                    autismretreat.ca
                    <br><br>
                    <em>
                      Where nature nurtures, families reconnect, and hope grows.
                    </em>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  let adminSent = false;
  let familySent = false;

  try {
    const [response] = await sgMail.send({
      to: {
        email: adminEmail,
        name: "GOEARC Administrator",
      },
      from: {
        email: senderEmail,
        name: senderName,
      },
      replyTo: {
        email: data.email,
        name: data.caregiverName,
      },
      subject: `New GOEARC registration — ${data.referenceNumber}`,
      text: [
        "A new GOEARC registration has been submitted.",
        `Reference: ${data.referenceNumber}`,
        `Caregiver: ${data.caregiverName}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Participant: ${data.participantFirstName}`,
        `Age: ${data.participantAge}`,
        `Preferred experience: ${formatPreference(
          data.retreatPreference,
        )}`,
      ].join("\n"),
      html: adminHtml,
      categories: ["goearc-registration-admin"],
    });

    adminSent = response.statusCode === 202;

    console.log("Admin email accepted by SendGrid:", {
      statusCode: response.statusCode,
    });
  } catch (error) {
    logSendGridError("Admin SendGrid email failed:", error);
  }

  try {
    const [response] = await sgMail.send({
      to: {
        email: data.email,
        name: data.caregiverName,
      },
      from: {
        email: senderEmail,
        name: senderName,
      },
      replyTo: {
        email: adminEmail,
        name: "GOEARC Team",
      },
      subject: `Welcome to GOEARC — registration ${data.referenceNumber}`,
      text: [
        `Dear ${data.caregiverName},`,
        "",
        "Thank you for connecting with the Garden of Eden Autism Retreat Centre.",
        `Your registration for ${data.participantFirstName} has been received.`,
        `Registration reference: ${data.referenceNumber}`,
        `Preferred experience: ${formatPreference(
          data.retreatPreference,
        )}`,
        "",
        "A member of the GOEARC team will review your information and contact you regarding the next steps.",
        "",
        "With warmth,",
        "The GOEARC Team",
      ].join("\n"),
      html: familyHtml,
      categories: ["goearc-registration-family"],
    });

    familySent = response.statusCode === 202;

    console.log("Family email accepted by SendGrid:", {
      statusCode: response.statusCode,
    });
  } catch (error) {
    logSendGridError("Family SendGrid email failed:", error);
  }

  return {
    adminSent,
    familySent,
  };
}