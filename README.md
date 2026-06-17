# ICA Blog

A simple blog platform built with Next.js 16, TypeScript, and shadcn/ui.

## Getting Started

```bash
pnpm install
pnpm dev
```

Then open http://localhost:3000 in your browser.

## Features

- Browse all blog posts with title, date, and summary
- Read full individual posts
- Create new posts with server-side validation
- Edit existing posts
- Delete posts with confirmation dialog
- Field-level error messages on forms
- Custom 404 and error pages

## Architecture Decisions

### Server vs Client Components

The route pages are implemented as Server Components and fetch data directly from the store.

Interactive parts are Client Components:
- `PostForm` – uses `useActionState` and `useFormStatus`
- `DeleteButton` – uses `useTransition` for pending states

This approach keeps the client-side JavaScript as light as possible.

### Server Actions over API Routes

I used Next.js Server Actions for all mutations (create, edit, delete) instead of traditional API routes. Since the frontend is the only consumer, adding a full HTTP API layer felt like unnecessary overhead. Server Actions handle validation with Zod and redirect on success.

### In-Memory Store

Posts are stored in a simple array in `lib/store.ts`. Data resets on server restart.

This was a conscious choice for this assignment to keep things focused. In a real project, I'd replace it with a proper database (PostgreSQL + Prisma or Drizzle).

### Forms & Validation

Validation happens entirely on the server using Zod. The form inputs use `defaultValue` so they stay uncontrolled. On validation errors, the Server Action returns both the errors and the submitted values, allowing the form to repopulate. Successful submissions redirect and naturally reset the form.

### Type Safety

- `Post` interface for the data shape
- `PostSchema` with Zod that mirrors the interface
- Typed `ActionState` for Server Action responses
- `params` typed as `Promise<{ id: string }>` (Next.js 15+ pattern)
- No `any` types anywhere

## What I Would Add With More Time

- Real persistence — PostgreSQL with Prisma or Drizzle
- Static generation with `generateStaticParams()` — blog content rarely changes, SSG makes sense
- Automated tests — unit tests for the store and schema, E2E with Playwright
- Rich text editing with Markdown support
- Pagination for larger post collections
- Error monitoring with Sentry

## Intentional Trade-offs

1. **In-memory store** – Kept it simple to focus on Next.js patterns rather than database setup.
2. **Server Actions** – Cleaner and more direct than building REST endpoints for a single-consumer app.
3. **Uncontrolled forms** – Simpler and works well with Server Actions. No need for extra client state.
4. **No global state management** – Zustand, Redux, or TanStack Query weren't necessary here. No shared client state, no external data fetching layer.
5. **No loading states** – Everything is synchronous from memory, so they didn't add value.
6. **globalThis in dev** – The store uses `globalThis` to survive hot reloads in development. Without it, each module reload resets the array. Not needed in production.

## Tech Stack

- [Next.js 16](https://nextjs.org/) – App Router, Server Components, Server Actions
- [TypeScript](https://www.typescriptlang.org/)
- [Zod](https://zod.dev/) – schema validation
- [shadcn/ui](https://ui.shadcn.com/) + [Tailwind CSS](https://tailwindcss.com/)
- ESLint + Husky