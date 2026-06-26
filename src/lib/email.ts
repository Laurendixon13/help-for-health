import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const FROM = process.env.RESEND_FROM_EMAIL ?? "Help 4 Health <onboarding@resend.dev>";

export type ChapterEmailStatus = "in_review" | "approved" | "declined";

const SUBJECTS: Record<ChapterEmailStatus, string> = {
  in_review: "Your Help 4 Health chapter application is under review",
  approved: "Your Help 4 Health chapter is approved!",
  declined: "Update on your Help 4 Health chapter application",
};

function bodyFor(
  status: ChapterEmailStatus,
  firstName: string,
  schoolName: string,
) {
  switch (status) {
    case "in_review":
      return `Hi ${firstName},

Thanks for applying to start a Help 4 Health chapter at ${schoolName}. Our team has started reviewing your application and we'll be in touch soon.

Help 4 Health is grateful for student leaders like you.

— The Help 4 Health team`;

    case "approved":
      return `Hi ${firstName},

Congratulations — your Help 4 Health chapter at ${schoolName} has been approved!

We'll follow up shortly with onboarding details so you can start building your chapter and helping kids in hospitals feel cared for.

— The Help 4 Health team`;

    case "declined":
      return `Hi ${firstName},

Thank you for your interest in starting a Help 4 Health chapter at ${schoolName}. After reviewing your application, we aren't able to move forward at this time.

We deeply appreciate your passion for helping kids in hospitals and hope you'll stay involved through other Help 4 Health programs.

— The Help 4 Health team`;
  }
}

export async function sendChapterStatusEmail(params: {
  to: string;
  firstName: string;
  schoolName: string;
  status: ChapterEmailStatus;
}): Promise<{ ok: boolean; reason?: string }> {
  if (!resend) {
    console.warn(
      "RESEND_API_KEY is not set — skipping chapter status email to",
      params.to,
    );
    return { ok: false, reason: "no_api_key" };
  }

  const { to, firstName, schoolName, status } = params;
  const { error } = await resend.emails.send({
    from: FROM,
    to,
    subject: SUBJECTS[status],
    text: bodyFor(status, firstName, schoolName),
  });

  if (error) {
    console.error("Resend error sending chapter status email:", error);
    return { ok: false, reason: error.message };
  }
  return { ok: true };
}
