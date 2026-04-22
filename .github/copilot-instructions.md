# Copilot Instructions for Entraiot Website

This document provides guidance for Copilot (or other AI assistants) working on the Entraiot Solutions website codebase.

## Build, Test, and Lint Commands

### Development
```bash
npm run dev              # Start dev server with Turbopack (http://localhost:3000)
```

### Production
```bash
npm run build            # Build static export
npm start                # Start production server on port 3000
```

### Code Quality
```bash
npm run lint             # Run ESLint on the codebase
```

### Testing
```bash
npm test                 # Run Playwright end-to-end tests
npm run test:ui          # Run tests with UI mode for debugging
npm run test:debug       # Run tests in debug mode
```

### Image Optimization
```bash
npm run optimize-images        # Optimize all images
npm run compress-images        # Compress images with quality settings
npm run optimize-large-images  # Optimize images >1MB
npm run replace-optimized      # Replace original images with optimized versions
```

### Single Test Execution
- **Unit tests**: Not yet implemented. Use Playwright for end-to-end testing instead.
- **Single test**: `npm test tests/example.spec.ts` - Run a specific test file
- **Single test case**: `npm test tests/example.spec.ts -g "should display navigation"` - Run tests matching a pattern
- **With UI**: `npm run test:ui` - Interactive test runner with browser preview

## High-Level Architecture

### Project Structure
- **Next.js 15** with App Router (static export, not server-side rendering)
- **Static Site** (`output: 'export'` in next.config.ts) - builds to `/out` directory
- **Component-driven** architecture with feature-based organization

### Directory Organization
```
src/
├── app/                 # Next.js pages and layouts (App Router)
│   ├── page.tsx        # Homepage
│   ├── about/page.tsx  # About page
│   ├── contact/        # Contact page
│   ├── solutions/      # Solutions page
│   ├── industries/     # Industries page
│   ├── layout.tsx      # Root layout with metadata
│   └── globals.css     # Global styles
├── components/          # Reusable React components
│   ├── ui/             # Base UI components (button, card, input, etc.)
│   ├── forms/          # Form components (multi-step form)
│   ├── sections/       # Page sections (hero, about, contact, solutions, industries)
│   ├── layout/         # Layout components (header, footer)
│   ├── navigation/     # Navigation components (quick-nav)
│   ├── intro/          # 3D intro animations (AI scene, overlay)
│   └── seo/            # SEO components (canonical-url, internal-links)
├── lib/                # Utilities and helpers
└── public/             # Static assets (images, icons, etc.)
```

### Key Technologies
- **Next.js 15** with App Router for file-based routing
- **React 19** with Server Components (RSC) as default
- **TypeScript** with strict mode enabled
- **Tailwind CSS 4** with PostCSS
- **shadcn/ui** for UI component primitives
- **Radix UI** for accessible component base
- **Framer Motion** for animations
- **React Hook Form** + **Zod** for form handling and validation
- **Three.js + React Three Fiber** for 3D graphics
- **EmailJS** for contact form emails (see EMAILJS_SETUP.md)
- **Lucide React** for icons
- **ESLint 9** with Next.js config
- **Playwright** for end-to-end testing

## Key Conventions

### Code Style
- **Functional components only** - no classes
- **Use `'use client'` sparingly** - prefer React Server Components (RSC)
- **Lowercase with dashes** for directory names (e.g., `multi-step-form`, `scroll-animations`)
- **PascalCase** for React component files (e.g., `Header.tsx`)
- **Descriptive variable names** with auxiliary verbs: `isLoading`, `hasError`, `shouldRender`
- **Early returns** and guard clauses for error handling

### Component Organization
Each component file typically includes:
1. Imports
2. Type definitions (interfaces, props)
3. Component function
4. Subcomponents (if any)
5. Helper functions
6. Static content/constants
7. Export statement

Example structure:
```typescript
"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface ComponentProps {
  title: string;
  onSubmit?: () => void;
}

export function MyComponent({ title, onSubmit }: ComponentProps) {
  return <Button onClick={onSubmit}>{title}</Button>;
}
```

### Styling
- **Tailwind CSS** for all styling
- **Mobile-first approach** - start with mobile styles, add `md:`, `lg:`, `xl:` for larger screens
- **Custom CSS** only for animations or complex layouts (in component files or globals.css)
- **Class variance authority** for component variants: `cva()` from `class-variance-authority`
- **clsx** and **tailwind-merge** for combining class names dynamically

### TypeScript
- **Strict mode enabled** - leverage TypeScript for type safety
- **Import types explicitly**: `import type { ... } from "..."`
- **Export interfaces** from components for external use
- **Use utility types**: `Pick`, `Omit`, `Record`, `Partial`, etc.

### Forms
- **React Hook Form** for form state management
- **Zod** for schema validation and type inference
- **Resolver pattern**: `zodResolver(schema)` to connect form and validation
- Always validate on submit and provide user feedback
- See `src/components/forms/multi-step-form.tsx` for patterns

### Images and Media
- **Next.js Image component** from `next/image` (use custom `OptimizedImage` wrapper if available)
- **WebP and AVIF formats** preferred (configured in next.config.ts)
- **Lazy loading** enabled by default
- **Size data included** for responsive images
- Use image optimization scripts before deployment

### SEO
- **Metadata** in layout.tsx (titles, descriptions, OpenGraph tags)
- **Structured data** using JSON-LD (Organization, Service schemas)
- **Canonical URLs** via `CanonicalUrl` component
- **Internal linking** strategy via `InternalLinks` component
- Page-specific metadata should override defaults

### Animations
- **Framer Motion** for DOM animations
- **React Three Fiber** for 3D animations
- **Scroll animations** via `ScrollAnimation` component (custom implementation)
- Use `'use client'` only when animations require client-side interactivity

### Testing
- **End-to-end tests** via Playwright (`tests/` directory)
- **Test structure**: Tests are colocated in `tests/` with `.spec.ts` suffix
- **Run tests**: `npm test` or `npm run test:ui` for interactive debugging
- **Test patterns**: Use descriptive test names with `test.describe()` for test suites
- **Best practices**:
  - Wait for elements before interacting: `await expect(element).toBeVisible()`
  - Use semantic queries: `page.getByRole()`, `page.getByLabel()` instead of selectors
  - Test user behavior, not implementation details
  - Include tests for forms, navigation, and critical user flows

### Build and Deployment
- **Static export** (const nextConfig = {};

module.exports = nextConfig;) - no Node.js server needed
- Builds to `/out` directory
- All dynamic features must work in static context
- No API routes or server-side rendering
- Environment variables prefixed with `NEXT_PUBLIC_` are accessible to browser

### Environment Variables
- **`.env.local`** (git-ignored) for local development
- **`NEXT_PUBLIC_` prefix** for variables exposed to the browser
- **EmailJS credentials** required for contact form:
  - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
  - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
  - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`
- See `EMAILJS_SETUP.md` for configuration details

### Path Aliases
- **`@/*`** resolves to `src/*`
- Use `import` from `@/components/...`, `@/lib/...`, etc. instead of relative paths

## Important Notes

- **Dev server**: Do NOT run `npm run dev` in agent mode (Cursor rules) - it's already running in terminal
- **Static export**: This is a static site. All pages are pre-rendered at build time
- **Contact form**: Requires EmailJS setup in `.env.local` - see `EMAILJS_SETUP.md`
- **3D animations**: Intro section uses Three.js - ensure canvas rendering works on target devices
- **Performance**: Image optimization scripts are critical before production builds

## File Locations for Common Tasks

| Task | Location |
|------|----------|
| Add new page | `src/app/[page-name]/page.tsx` |
| Add UI component | `src/components/ui/[component-name].tsx` |
| Add page section | `src/components/sections/[section-name].tsx` |
| Global styles | `src/app/globals.css` |
| Site metadata | `src/app/layout.tsx` |
| Form components | `src/components/forms/` |
| Utilities/helpers | `src/lib/` |
| Environment config | `.env.local` (local) |

## References

- **Existing Documentation**: See `WEBSITE_OVERVIEW.md` for complete feature list and `EMAILJS_SETUP.md` for contact form setup
- **Next.js Docs**: https://nextjs.org/docs
- **Cursor Rules**: `.cursor/rules/general.mdc` contains additional coding guidelines
