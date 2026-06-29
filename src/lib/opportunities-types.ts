export type OpportunityCategory =
  | "virtual"
  | "in_person"
  | "fundraiser"
  | "joy_visit";

export type SignupStatus = "signed_up" | "considering";

export type Opportunity = {
  id: string;
  title: string;
  description: string;
  category: OpportunityCategory;
  location: string | null;
  starts_at: string | null;
  source_url: string | null;
  age_range: string | null;
};

export type OpportunityWithSignup = Opportunity & {
  signup_status: SignupStatus | null;
};

export const CATEGORY_LABELS: Record<OpportunityCategory, string> = {
  virtual: "Virtual",
  in_person: "In person",
  fundraiser: "Fundraiser",
  joy_visit: "Joy Visit",
};

export const CATEGORY_ICONS: Record<OpportunityCategory, string> = {
  virtual: "💻",
  in_person: "🏥",
  fundraiser: "🎁",
  joy_visit: "✨",
};
