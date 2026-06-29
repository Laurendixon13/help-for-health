"use server";

import { sendContactMessage } from "@/lib/email";

export type ContactState = { error: string } | { ok: true } | undefined;

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim().slice(0, 100);
  const email = String(formData.get("email") ?? "").trim().slice(0, 200);
  const message = String(formData.get("message") ?? "").trim().slice(0, 5000);

  if (!name || !email || !message) {
    return { error: "All fields are required." };
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  const result = await sendContactMessage({
    fromName: name,
    fromEmail: email,
    message,
  });
  if (!result.ok) {
    return {
      error:
        "Sorry — we couldn't send your message right now. Please email hello@help4health.net directly.",
    };
  }

  return { ok: true };
}
