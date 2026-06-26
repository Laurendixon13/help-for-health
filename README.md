# Help 4 Health

Help 4 Health is a student-led organization that helps children in hospitals through fundraisers, service projects, care packages, cards, and special moments of encouragement.

## About

The main goal is to make kids feel supported while they are going through a hard time. Students can earn volunteer hours, but the real purpose is helping children in hospitals feel cared for, remembered, and hopeful.

Help 4 Health can grow nationally through student-led chapters, city groups, and a virtual chapter. Students lead the work, while adults and hospitals help with safety, approvals, and verified service hours.

**Joy Visits** is a featured program that brings athletes, musicians, creators, authors, and other inspiring people to encourage children through visits, video messages, or performances.

## Student authentication

This app uses [Clerk](https://clerk.com) for student login. Dashboard routes require sign-in.

1. Copy `.env.example` to `.env.local`
2. Add your Clerk keys from [dashboard.clerk.com](https://dashboard.clerk.com/~/api-keys)
3. Restart the dev server

On first run without keys, Clerk may offer **Keyless** mode in the app — click "Configure your application" to link your account.

| Route | Purpose |
|-------|---------|
| `/sign-in` | Student login |
| `/sign-up` | Create student account |
| `/dashboard` | Protected volunteer dashboard |

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — create a production build
- `npm run start` — run the production server
- `npm run lint` — run ESLint

## Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- TypeScript
- Clerk (student authentication)
