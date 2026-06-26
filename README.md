# Richard Dewey Personal Site

One-page Next.js implementation of Richard Dewey's personal site.

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
npm run typecheck
```

## Structure

- `src/app`: App Router shell, metadata, local font wiring, and viewport helpers.
- `src/components/sections/home-page.tsx`: primary page experience.
- `src/components/controls/theme-toggle.tsx`: animated light/dark mode control.
- `src/styles`: design tokens and global CSS.
- `public/assets`: publication and social logos.

The page uses local Suisse Int'l Mono font files and Tailwind design tokens for the responsive timeline, platform index, filters, and theme states.
