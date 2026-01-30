# AI Coding Agent Instructions for TK-NeT

## Project Overview
**TK-NeT** (警備員予約システム) is a Next.js-based security staff reservation and management system. The application provides interfaces for staff scheduling, site reservations, document management, and reporting.

**Tech Stack:**
- Next.js 16 with App Router (`/app` directory)
- TypeScript (strict mode)
- React 18+ with "use client" patterns
- Radix UI primitives for accessible components
- Tailwind CSS for styling
- Form handling via @hookform/resolvers

## Architecture Patterns

### 1. Component Structure
- **UI Components** (`/components/ui/`): 50+ Radix UI-wrapped components using `class-variance-authority` (CVA) for variants
- **Page Components** (`/app/*/page.tsx`): Server components by default; use `"use client"` only when needed (e.g., forms, interactivity)
- **Layout Components** (`/components/*-layout.tsx`): Client components managing navigation and page structure
- **Feature Components** (`/components/*-form.tsx`, `/components/*-content.tsx`): Domain-specific UI

### 2. Styling Conventions
- Use Tailwind CSS exclusively; avoid inline styles
- Apply `cn()` utility ([lib/utils.ts](lib/utils.ts)) to merge class names: `cn('base-classes', className)`
- UI components export `buttonVariants` patterns using CVA for consistent size/variant APIs
- All components support `className` pass-through for customization
- Use semantic color tokens: `text-primary`, `bg-accent`, `border-ring` (defined in Tailwind config)

### 3. Component Patterns
**Wrapper Pattern** (Radix UI):
```tsx
// /components/ui/accordion.tsx example
function Accordion({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}
```
- All UI components spread props to underlying Radix primitives
- Add `data-slot` attributes for CSS targeting
- Preserve composability: `Accordion > AccordionItem > AccordionTrigger > AccordionContent`

### 4. Routing & Navigation
- **App structure**: Nested routes use file-based routing (`/app/dashboard/[section]/page.tsx`)
- **Main routes**:
  - `/` → Login page
  - `/register` → Registration
  - `/dashboard` → User dashboard with sub-routes (reservation, calendar, documents, reports, settings)
  - `/admin` → Admin panel (separate dashboard, members, offices, reservations management)
- Use `usePathname()` from `next/navigation` for active route detection ([components/dashboard-layout.tsx](components/dashboard-layout.tsx))

### 5. Form Handling
- Forms use `@hookform/resolvers` for validation
- Components like `LoginForm`, `RegisterForm`, `ReservationForm` handle user input
- No forms in Server Components; always mark form parents with `"use client"`

### 6. Theme Management
- Next-themes integration ([components/theme-provider.tsx](components/theme-provider.tsx)) handles light/dark mode
- Wrap app in `<ThemeProvider>` (already in layout)
- Use CSS custom properties for color tokens (Tailwind-generated)

## Development Workflow

### Build & Run Commands
```bash
npm run dev       # Start dev server (http://localhost:3000)
npm run build     # Production build
npm run start     # Run production build
npm run lint      # Run ESLint
```

### Build Configuration
- TypeScript: Strict mode enabled; ESLint configured
- Next.js config ([next.config.mjs](next.config.mjs)): 
  - `ignoreBuildErrors: true` (allows TypeScript errors during build)
  - `unoptimized: true` (images not optimized)

## Key Conventions

### Import Paths
- Use `@/` alias for absolute imports (configured in [tsconfig.json](tsconfig.json))
- Example: `import { cn } from '@/lib/utils'`

### Accessibility
- All interactive components inherit Radix UI accessibility (ARIA, keyboard navigation)
- Focus states: use `focus-visible:ring-ring/50 focus-visible:ring-[3px]` Tailwind pattern
- Disabled states: consistently applied via `disabled:pointer-events-none disabled:opacity-50`

### Responsive Design
- Mobile-first approach: Start with mobile styles, add `lg:`, `md:` breakpoints
- Mobile menu pattern: `useState(false)` for sidebar toggle, hide on mobile, show on lg+
- Use `hidden lg:flex` pattern ([components/dashboard-layout.tsx](components/dashboard-layout.tsx))

### Code Organization
- **Prefer composition**: Build pages from smaller, reusable components
- **Client vs Server**: Keep Server Components where possible; only `"use client"` for interactivity
- **Constants**: Store navigation, URLs in component files (see `LOGO_URL`, `navigation` array in layouts)

## Integration Points

### External Dependencies
- **Lucide Icons** (`lucide-react`): 60+ icons; import specific icon names as needed
- **Date handling** (`date-fns`): Use for date formatting and calculations
- **Carousel** (`embla-carousel-react`): Composable carousel component
- **Command palette** (`cmdk`): Search/command interface

### State Management
- No Redux/Zustand detected; use React `useState` for local state
- For complex flows (multi-step forms), lift state to parent or use component composition

## File Creation Guidelines
- UI components go in `/components/ui/`
- Page-level components in `/components/`
- New routes in `/app/[section]/page.tsx`
- Utility functions in `/lib/`
- Styles inline via Tailwind; avoid separate CSS files

## Common Pitfalls to Avoid
1. **Don't add inline styles** — Use Tailwind CSS classes instead
2. **Don't recreate UI components** — Check `/components/ui/` for existing primitives first
3. **Don't use relative imports** — Always use `@/` alias
4. **Don't skip `"use client"` for forms** — Client interactivity is required
5. **Don't ignore TypeScript** — Maintain strict typing; don't use `any`

---

**Last Updated:** January 2026  
**Project Type:** Next.js App Router (mobile-first SaaS platform)
