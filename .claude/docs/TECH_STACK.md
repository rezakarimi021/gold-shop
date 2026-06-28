# Technical Stack

Project: Gold Shop

Version: 1.0

Status: Approved

---

# 1. Core Philosophy

The project must prioritize:

Scalability

Maintainability

Performance

Developer Experience

Type Safety

Accessibility

SEO

Future Expansion

Every technology decision should support long-term growth.

Avoid technologies that increase unnecessary complexity.

---

# 2. Frontend Framework

Framework

Next.js 15+

Reason:

App Router

Server Components

Streaming

SEO

Performance

Metadata API

Image Optimization

Route Groups

Parallel Routes

Future Ready

---

# 3. Language

TypeScript

Strict Mode Enabled

No JavaScript files.

Everything should be strongly typed.

---

# 4. Runtime

Node.js LTS

Latest stable version.

---

# 5. Package Manager

pnpm

Reasons:

Fast

Efficient

Reliable

Workspace support

Excellent dependency management

---

# 6. Styling

Tailwind CSS v4

Reason:

Performance

Maintainability

Modern Architecture

Design Token Friendly

Excellent DX

---

# 7. UI Components

shadcn/ui

Customized.

Never use default appearance.

Every component must follow the project's design system.

---

# 8. Icons

Lucide React

Consistent.

Lightweight.

Tree-shakeable.

---

# 9. Animations

Framer Motion

Use only when interaction benefits usability.

Avoid decorative animations.

---

# 10. Fonts

Primary

Geist

Secondary

Vazirmatn

Fallback

System Fonts

Fonts should be optimized using Next.js Font Optimization.

---

# 11. Forms

React Hook Form

Validation

Zod

Reason:

Performance

Type Safety

Developer Experience

---

# 12. State Management

Global State

Zustand

Server State

TanStack Query

Local State

React State

Never misuse global state.

---

# 13. API Layer

REST First

Future GraphQL Compatible

API client should remain centralized.

Never scatter fetch logic.

---

# 14. Authentication

Better Auth (or NextAuth if project requirements change)

Support:

Login

Register

Session

Role Management

Future OAuth

Future MFA

---

# 15. Data Fetching

Server Components whenever possible.

Client Components only when interaction requires it.

Prefer Server Actions where appropriate.

Minimize client-side fetching.

---

# 16. Project Architecture

The project must follow Feature-Based Architecture.

Avoid organizing code only by file type.

Every feature should own its components, hooks, types and logic whenever possible.

Recommended top-level structure:

app/
components/
features/
hooks/
lib/
services/
store/
types/
utils/
styles/
public/

The architecture should remain modular and scalable.

---

# 17. App Router Standards

Use Next.js App Router exclusively.

Every route should contain only the files it needs.

Possible route files:

page.tsx

layout.tsx

loading.tsx

error.tsx

not-found.tsx

template.tsx

route.ts

Prefer nested layouts.

Avoid duplicated layouts.

---

# 18. Component Architecture

Components should be divided into:

UI Components

Shared Components

Feature Components

Layout Components

Business Components

Never create large monolithic components.

Maximum recommended component size:

200–250 lines.

Split complex components into smaller reusable parts.

---

# 19. Folder Naming

Folders:

kebab-case

Examples:

product-card

shopping-cart

user-profile

Files:

PascalCase for React Components

camelCase for utilities

Examples:

ProductCard.tsx

Navbar.tsx

formatPrice.ts

validatePhone.ts

---

# 20. Code Style

Use:

Arrow Functions

Named Exports

Explicit Types

Early Returns

Small Functions

Readable Variables

Avoid:

Anonymous exports

Deep nesting

Long functions

Magic numbers

Hardcoded strings

Duplicated logic

---

# 21. TypeScript Rules

Strict Mode enabled.

Never use:

any

Prefer:

unknown

Generics

Discriminated Unions

Utility Types

Type inference where appropriate.

Every API response should have explicit types.

---

# 22. Styling Rules

Use Tailwind CSS only.

Avoid CSS Modules unless absolutely necessary.

Avoid inline styles.

Create reusable utility classes when patterns repeat.

Spacing should follow the design system.

---

# 23. Design Tokens

Centralize:

Colors

Typography

Spacing

Radius

Shadow

Border

Transitions

Breakpoints

Never hardcode design values repeatedly.

---

# 24. Image Strategy

Use Next.js Image component.

Requirements:

Responsive images

Lazy loading

Optimized formats

Width & Height defined

Blur placeholder when appropriate

Avoid oversized assets.

---

# 25. Font Strategy

Load fonts using next/font.

Minimize font weights.

Avoid layout shift.

Use display swap behavior.

---

# 26. Icons

Use Lucide React exclusively.

Do not mix multiple icon libraries.

Maintain consistent sizes and stroke widths.

---

# 27. Forms

React Hook Form

-

Zod

Every form should support:

Validation

Loading state

Success state

Error state

Accessible labels

Keyboard navigation

---

# 28. State Management

Use:

React State → Local UI

Zustand → Global UI State

TanStack Query → Server State

Never use global state for temporary UI interactions.

---

# 29. Data Fetching

Prefer:

Server Components

Server Actions

Streaming

Suspense

Cache where appropriate.

Avoid unnecessary client fetching.

---

# 30. API Layer

All API communication should be centralized.

Never call fetch directly from random components.

Create reusable service modules.

Separate:

Authentication

Products

Orders

Users

Blog

Search

Settings

---

# 31. Code Quality

Every commit must pass:

Type Checking

Linting

Formatting

No TypeScript errors

No ESLint errors

No console errors

No hydration warnings

No duplicated code

No dead code

Readable architecture

Production-ready implementation

---

# 32. Linting

Use:

ESLint 9+

Latest Next.js configuration

Strict TypeScript rules

Unused imports must be removed automatically.

Warnings should be treated seriously.

---

# 33. Formatting

Use:

Prettier

Automatically format on save.

Maintain one consistent coding style across the project.

Never manually fight the formatter.

---

# 34. Git Hooks

Use Husky.

Required hooks:

Pre Commit

Run:

Type Check

ESLint

Prettier

Prevent broken commits.

---

# 35. Commit Convention

Use Conventional Commits.

Examples:

feat: add product gallery

fix: improve mobile navbar

refactor: optimize product card

style: update typography

docs: update architecture

test: add checkout tests

chore: upgrade dependencies

---

# 36. Testing Strategy

Preferred testing stack:

Unit Testing

Vitest

Component Testing

React Testing Library

End-to-End Testing

Playwright

Critical flows should always be tested:

Authentication

Cart

Checkout

Orders

Profile

Search

---

# 37. Security Standards

Always validate user input.

Escape user-generated content.

Never expose secrets.

Use secure cookies.

Use HTTPS in production.

Protect authentication routes.

Follow OWASP recommendations where applicable.

---

# 38. Environment Variables

Never hardcode secrets.

Environment variables should be organized by purpose.

Examples:

Application

Authentication

API

Analytics

Storage

Future Payment Gateway

Future Email Provider

Future SMS Provider

---

# 39. Logging

Development:

Readable console output.

Production:

Structured logging.

Never expose sensitive user information.

---

# 40. Monitoring

Future monitoring support should allow integration with:

Sentry

Vercel Analytics

Google Analytics

Google Search Console

Microsoft Clarity

Performance monitoring should be available from the first production deployment.

---

# 41. Performance Rules

Target:

Lighthouse Performance ≥ 95

Accessibility ≥ 95

SEO ≥ 95

Best Practices ≥ 95

Requirements:

Lazy Loading

Image Optimization

Streaming

Server Components

Code Splitting

Bundle Optimization

Minimal Client JavaScript

Avoid Layout Shift

Avoid unnecessary re-renders.

---

# 42. SEO Technical Standards

Support:

Metadata API

Canonical URLs

Structured Data

Open Graph

Twitter Cards

Robots.txt

XML Sitemap

Dynamic Metadata

Optimized heading hierarchy

Descriptive image alt text

Readable URLs

Internal linking

---

# 43. Deployment

Preferred deployment:

Vercel

The application should also remain compatible with:

Docker

Self-hosted Node.js

Cloud platforms supporting Next.js

Deployment should require minimal configuration.

---

# 44. CI/CD

Future pipeline should support:

Type Checking

Linting

Formatting

Testing

Production Build

Preview Deployment

Production Deployment

No deployment should occur if quality checks fail.

---

# 45. Production Readiness Checklist

Before every production deployment verify:

Build succeeds.

TypeScript passes.

Lint passes.

Tests pass.

No console errors.

No hydration warnings.

No accessibility blockers.

No broken links.

Images optimized.

Metadata complete.

Responsive behavior verified.

Performance targets achieved.

---

# 46. Technical Principles

Every implementation should prioritize:

Maintainability

Readability

Scalability

Performance

Accessibility

Reusability

Consistency

Developer Experience

Long-term stability

When multiple solutions exist, choose the one that provides the best balance between simplicity, maintainability and scalability.

---

# Final Statement

The Gold Shop technical stack is intentionally modern, scalable and production-focused.

Technology choices should never be based on trends alone.

Every dependency, architectural decision and implementation must provide measurable value.

The project should remain maintainable for years, support future growth and deliver a premium user experience across all modern devices.
