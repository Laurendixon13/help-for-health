import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ChapterForm } from "./chapter-form";

export const metadata = {
  title: "Start a chapter | Help 4 Health",
  description:
    "Bring Help 4 Health to your school — apply to start a student chapter.",
};

export default function StartAChapterPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-container py-10">
        <div className="mx-auto max-w-xl">
          <p className="text-xs font-bold uppercase tracking-wide text-teal">
            Get involved
          </p>
          <h1 className="mt-2 text-3xl font-bold text-navy">
            Start a chapter at your school
          </h1>
          <p className="mt-3 text-sm leading-6 text-muted">
            Help 4 Health chapters are student-led groups that run service
            events, fundraisers, and Joy Visits to support kids in hospitals.
            Tell us a bit about you and your school — a Help 4 Health student
            lead will follow up to help you get started.
          </p>
          <ChapterForm />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
