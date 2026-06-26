"use server";

export type ContactState = { error: string } | { ok: true } | undefined;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { error: "All fields are required." };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  // TODO: send via Resend/Postmark/SES. For now, log so the team can see it
  // in dev and we have a clear hook for the email integration.
  console.log("[contact]", { name, email, message });

  return { ok: true };
}
