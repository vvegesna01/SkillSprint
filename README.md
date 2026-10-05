# SkillSprint

Upload your resume, describe a target role, and get project recommendations
that close the exact skills you're missing — ranked by how much of your
skill gap each one closes.

The app has two parts:
- **Frontend** — this Next.js app (`src/`). Handles the resume/profile UI,
  project catalog, filtering, and saved-project tracking.
- **Backend** — a FastAPI service (`backend/`) that does the actual skill
  extraction and gap matching using sentence-transformer embeddings, so
  "AWS" and "Amazon Web Services" are recognized as the same skill. See
  [`backend/README.md`](./backend/README.md) for how that matching
  pipeline works. If the backend isn't running, the frontend falls back
  to a lightweight offline matcher (`src/lib/skillTaxonomy.ts`) that does
  synonym-aware keyword matching instead of true embeddings.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

For real semantic skill matching (rather than the offline fallback), also
run the backend service — see [`backend/README.md`](./backend/README.md)
for setup.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
