import { BottomNav } from "@/components/bottom-nav";
import {
  type ChapterApplicationStatus,
  type JoyVisitRequestRole,
  type JoyVisitRequestRow,
  type JoyVisitRequestStatus,
  type JoyVisitRequestType,
  getChapterApplications,
  getJoyVisitRequests,
  getPendingAdminRequests,
  getPendingHours,
  requireAdmin,
} from "@/lib/admin";
import {
  decideAdminRequest,
  updateApplicationStatus,
  updateHoursStatus,
  updateJoyVisitRequestStatus,
} from "./actions";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const APPLICATION_STATUS_STYLES: Record<ChapterApplicationStatus, string> = {
  new: "bg-amber-100 text-amber-700",
  in_review: "bg-sky-100 text-sky-700",
  approved: "bg-teal/15 text-teal",
  declined: "bg-coral/10 text-coral",
};

const APPLICATION_NEXT_STATUSES: ChapterApplicationStatus[] = [
  "in_review",
  "approved",
  "declined",
];

function applicationLabel(status: ChapterApplicationStatus) {
  if (status === "in_review") return "In review";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

const JOY_VISIT_STATUS_STYLES: Record<JoyVisitRequestStatus, string> = {
  new: "bg-amber-100 text-amber-700",
  in_review: "bg-sky-100 text-sky-700",
  closed: "bg-slate-200 text-slate-700",
};

const JOY_VISIT_NEXT_STATUSES: JoyVisitRequestStatus[] = [
  "in_review",
  "closed",
];

const JOY_VISIT_ROLE_LABELS: Record<JoyVisitRequestRole, string> = {
  student: "Student",
  parent: "Parent",
  hospital_staff: "Hospital staff",
  donor: "Donor",
  guest: "Guest",
  other: "Other",
};

const JOY_VISIT_TYPE_LABELS: Record<JoyVisitRequestType, string> = {
  request: "Request a Joy Visit",
  suggest_guest: "Suggest a Guest",
  become_guest: "Become a Guest",
  donate_sponsor: "Donate / Sponsor",
};

function joyVisitStatusLabel(status: JoyVisitRequestStatus) {
  if (status === "in_review") return "In review";
  return status.charAt(0).toUpperCase() + status.slice(1);
}

export default async function AdminPage() {
  await requireAdmin();

  const [pendingHours, applications, joyVisitRequests, adminRequests] =
    await Promise.all([
      getPendingHours(),
      getChapterApplications(),
      getJoyVisitRequests(),
      getPendingAdminRequests(),
    ]);

  const newJoyVisitCount = joyVisitRequests.filter(
    (r: JoyVisitRequestRow) => r.status === "new",
  ).length;

  return (
    <>
      <header className="border-b border-border bg-white">
        <div className="page-container py-4">
          <h1 className="text-xl font-bold text-navy sm:text-2xl">Admin</h1>
          <p className="text-sm text-muted">
            Review pending hours and chapter applications
          </p>
        </div>
      </header>

      <main className="page-container space-y-8 py-6 pb-24 lg:pb-8">
        {adminRequests.length > 0 && (
          <section>
            <h2 className="mb-3 flex items-center gap-2 font-bold text-navy">
              Admin access requests
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
                {adminRequests.length}
              </span>
            </h2>
            <ul className="space-y-2">
              {adminRequests.map((req) => (
                <li
                  key={req.id}
                  className="rounded-2xl border border-border bg-white p-4 shadow-sm"
                >
                  <p className="font-semibold text-navy">
                    {req.user_name ?? req.user_email}
                  </p>
                  <p className="text-xs text-muted">{req.user_email}</p>
                  {req.reason && (
                    <p className="mt-2 rounded-lg bg-surface px-3 py-2 text-xs italic leading-5 text-navy">
                      &ldquo;{req.reason}&rdquo;
                    </p>
                  )}
                  <p className="mt-1 text-[10px] text-muted">
                    Requested {formatDate(req.created_at)}
                  </p>
                  <div className="mt-3 flex gap-2">
                    <form action={decideAdminRequest}>
                      <input type="hidden" name="id" value={req.id} />
                      <input type="hidden" name="user_id" value={req.user_id} />
                      <input
                        type="hidden"
                        name="decision"
                        value="approved"
                      />
                      <button
                        type="submit"
                        className="rounded-full bg-teal px-4 py-1.5 text-xs font-semibold text-white hover:bg-teal/90"
                      >
                        Grant admin
                      </button>
                    </form>
                    <form action={decideAdminRequest}>
                      <input type="hidden" name="id" value={req.id} />
                      <input type="hidden" name="user_id" value={req.user_id} />
                      <input
                        type="hidden"
                        name="decision"
                        value="declined"
                      />
                      <button
                        type="submit"
                        className="rounded-full border border-coral px-4 py-1.5 text-xs font-semibold text-coral hover:bg-coral/10"
                      >
                        Decline
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="mb-3 flex items-center gap-2 font-bold text-navy">
            Pending hours
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
              {pendingHours.length}
            </span>
          </h2>
          {pendingHours.length === 0 ? (
            <p className="rounded-2xl border border-border bg-white p-6 text-center text-sm text-muted">
              No pending hours. You&apos;re all caught up.
            </p>
          ) : (
            <ul className="space-y-2">
              {pendingHours.map((entry) => (
                <li
                  key={entry.id}
                  className="rounded-2xl border border-border bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-navy">{entry.activity}</p>
                      <p className="text-xs text-muted">
                        {formatDate(entry.occurred_on)}
                        {entry.location ? ` · ${entry.location}` : ""}
                      </p>
                      {entry.notes && (
                        <p className="mt-1 text-xs text-muted">{entry.notes}</p>
                      )}
                      <p className="mt-1 text-xs">
                        <span className="text-muted">Volunteer: </span>
                        <span className="font-medium text-navy">
                          {entry.volunteer_name ?? entry.volunteer_email}
                        </span>
                        {entry.volunteer_name && (
                          <span className="text-muted">
                            {" "}
                            · {entry.volunteer_email}
                          </span>
                        )}
                      </p>
                    </div>
                    <p className="shrink-0 font-bold text-navy">
                      {Number(entry.hours).toFixed(2)}h
                    </p>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <form action={updateHoursStatus}>
                      <input type="hidden" name="id" value={entry.id} />
                      <input type="hidden" name="status" value="approved" />
                      <button
                        type="submit"
                        className="rounded-full bg-teal px-4 py-1.5 text-xs font-semibold text-white hover:bg-teal/90"
                      >
                        Approve
                      </button>
                    </form>
                    <form action={updateHoursStatus}>
                      <input type="hidden" name="id" value={entry.id} />
                      <input type="hidden" name="status" value="rejected" />
                      <button
                        type="submit"
                        className="rounded-full border border-coral px-4 py-1.5 text-xs font-semibold text-coral hover:bg-coral/10"
                      >
                        Reject
                      </button>
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="mb-3 flex items-center gap-2 font-bold text-navy">
            Chapter applications
            <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700">
              {applications.length}
            </span>
          </h2>
          {applications.length === 0 ? (
            <p className="rounded-2xl border border-border bg-white p-6 text-center text-sm text-muted">
              No applications yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {applications.map((app) => (
                <li
                  key={app.id}
                  className="rounded-2xl border border-border bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-navy">
                        {app.first_name} {app.last_name}
                        {app.grade ? ` · Grade ${app.grade}` : ""}
                      </p>
                      <p className="text-xs text-muted">{app.email}</p>
                      <p className="mt-1 text-xs">
                        <span className="font-medium text-navy">
                          {app.school_name}
                        </span>{" "}
                        <span className="text-muted">
                          · {app.school_city}, {app.school_state}
                        </span>
                      </p>
                      {app.why && (
                        <p className="mt-2 text-xs italic text-muted">
                          &ldquo;{app.why}&rdquo;
                        </p>
                      )}
                      <p className="mt-1 text-[10px] text-muted">
                        Submitted {formatDate(app.created_at)}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${APPLICATION_STATUS_STYLES[app.status]}`}
                    >
                      {app.status.replace("_", " ")}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {APPLICATION_NEXT_STATUSES.map((status) => (
                      <form key={status} action={updateApplicationStatus}>
                        <input type="hidden" name="id" value={app.id} />
                        <input type="hidden" name="status" value={status} />
                        <button
                          type="submit"
                          disabled={app.status === status}
                          className="rounded-full border border-border px-3 py-1 text-xs font-medium text-navy hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {applicationLabel(status)}
                        </button>
                      </form>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className="mb-3 flex items-center gap-2 font-bold text-navy">
            Joy Visit requests
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">
              {newJoyVisitCount} new
            </span>
            <span className="text-xs font-medium text-muted">
              · {joyVisitRequests.length} total
            </span>
          </h2>
          {joyVisitRequests.length === 0 ? (
            <p className="rounded-2xl border border-border bg-white p-6 text-center text-sm text-muted">
              No Joy Visit requests yet.
            </p>
          ) : (
            <ul className="space-y-2">
              {joyVisitRequests.map((req) => (
                <li
                  key={req.id}
                  className="rounded-2xl border border-border bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-semibold text-navy">{req.name}</p>
                      <p className="text-xs text-muted">{req.email}</p>
                      <p className="mt-1 text-xs">
                        <span className="rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-semibold uppercase text-teal">
                          {JOY_VISIT_TYPE_LABELS[req.request_type]}
                        </span>
                        <span className="ml-2 text-muted">
                          {JOY_VISIT_ROLE_LABELS[req.role]}
                        </span>
                      </p>
                      {req.guest_info && (
                        <p className="mt-2 text-xs">
                          <span className="text-muted">Guest: </span>
                          <span className="text-navy">{req.guest_info}</span>
                        </p>
                      )}
                      {req.hospital_or_city && (
                        <p className="text-xs">
                          <span className="text-muted">Hospital/city: </span>
                          <span className="text-navy">
                            {req.hospital_or_city}
                          </span>
                        </p>
                      )}
                      {req.message && (
                        <p className="mt-2 text-xs italic leading-relaxed text-muted">
                          &ldquo;{req.message}&rdquo;
                        </p>
                      )}
                      <p className="mt-1 text-[10px] text-muted">
                        Submitted {formatDate(req.created_at)}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${JOY_VISIT_STATUS_STYLES[req.status]}`}
                    >
                      {req.status.replace("_", " ")}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {JOY_VISIT_NEXT_STATUSES.map((status) => (
                      <form key={status} action={updateJoyVisitRequestStatus}>
                        <input type="hidden" name="id" value={req.id} />
                        <input type="hidden" name="status" value={status} />
                        <button
                          type="submit"
                          disabled={req.status === status}
                          className="rounded-full border border-border px-3 py-1 text-xs font-medium text-navy hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          {joyVisitStatusLabel(status)}
                        </button>
                      </form>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <BottomNav />
    </>
  );
}
