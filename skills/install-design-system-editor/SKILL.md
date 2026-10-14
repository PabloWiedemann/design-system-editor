---
name: install-design-system-editor
description: Install the design system editor (github.com/PabloWiedemann/design-system-editor) in a repo that uses Tailwind v4. Writes a self-contained design/ folder (config, setup, specimens), adds a `design` script, and verifies that every section renders. Use when asked to add, set up or update the design system editor in a repository.
---

# Install the design system editor

The editor runs the repo's own dev server with a page at `/__dse` where
designers browse and edit tokens and components, then copy their changes
as llm.txt. Everything it needs from the repo lives in `design/`. Your job
is to write that folder so every component renders as it does in the app.

Read the package README (`README.md` in the editor repo, or
`node_modules/design-system-editor/README.md` after installing) before you
start: it documents the config, setup and specimen formats.

Notes per stack:

| Stack | What to expect |
| --- | --- |
| Vue + Vite | `setup` installs the plugins (`app.use(…)`); cva kits get variant rows from `auto`. |
| React + Vite | `setup` default-exports a wrapper component with the providers. |
| Next.js | Client components render under Vite with `next/*` stubbed; server components don't. Fonts from `next/font` go in `head`. shadcn themes (`@theme inline` pointing at `:root` variables) work as they are. |
| Nuxt | No `setup`: the editor is a page of the app. Components styled with plain CSS variables get token rows from their CSS rules. |
| Monorepo with Storybook | One `systems` entry per design system, each with `stories`, its own `setup` and, for apps with their own `public/`, `public`. Copy the app's Vite `define` constants into `vite.define`. |

## Ground rules

- Only add `design/` and one `package.json` script (plus the dependency, if
  you install it). Don't change app code, configs or CSS to make the editor
  work. If something can't render without a change, say so in your report
  instead.
- Use the components and CSS as the app does. Never restyle them in specimens.
- Don't commit unless the user asks you to.

## 1. Survey the repo

Find these and write them down before writing any file:

1. **The app root(s).** The folder with the app's `package.json` and
   bundler config. In a monorepo, list every app or package that has its
   own design system: a kit folder, or its own theme CSS.
2. **Framework.** `nuxt`, `react` (Vite or Next.js) or `vue` (Vite).
   Astro sites count as `vue` or `react` by their component framework.
3. **Theme CSS.** Files with `@theme` (search `@theme` in `*.css`, outside
   `node_modules`). Include CSS files that hold the `:root` variables the
   theme points at (shadcn: `--color-primary: var(--primary)`), and token
   files imported from packages (e.g.
   `node_modules/@acme/design-system/src/css/palette.css`).
4. **CSS entry.** The CSS the app imports at startup (the file with
   `@import 'tailwindcss'`, or the one that imports it).
5. **Kit.** The shared component folder(s): `components/ui`, `src/ui`,
   `packages/ui/src`… Search for `cva(` and `tv(`: variant files outside
   the component folder (a variants package) are part of the kit too.
6. **Storybook.** `.storybook/` and `*.stories.*` files. If they cover the
   kit, use `stories` instead of writing specimens.
7. **Providers.** What the app installs before rendering: read the entry
   (`main.ts`, `app/layout.tsx`, `_app.tsx`, `app.vue`, Nuxt plugins) and
   `.storybook/preview.*`. Typical ones: i18n, a store (Pinia, Redux),
   a router, a query client, a tooltip/toast provider, a UI library
   (PrimeVue), a theme class on `<html>` (`dark`, `dark-theme`).
8. **Build-time globals and aliases.** `define` and `resolve.alias` in the
   Vite config that the kit's imports depend on (`__APP_VERSION__`,
   `astro:env/client`). The editor already reads `tsconfig` paths.
9. **Public assets** imported by absolute path (`/icons/x.svg`) from an
   app's `public/` folder that isn't the root's.
10. **Verify commands.** The repo's lint, typecheck and test scripts, and any
    token or design checks (`check:tokens`).
11. **Fonts** loaded outside CSS (`next/font`, a `<link>` in `index.html`).

## 2. Install

Prefer a dev dependency, so `design/` files get types and the version is
pinned in the lockfile:

```sh
pnpm add -D github:PabloWiedemann/design-system-editor   # or npm / yarn / bun
```

Add the script to the `package.json` that sits next to `design/`:

```json
"design": "dse dev"
```

If the user doesn't want a dependency, use
`"design": "npx -y github:PabloWiedemann/design-system-editor dev"`. The CLI
resolves `design-system-editor` imports itself. Check that the repo's
typecheck and lint don't include `design/`: they would fail on those
imports. If they do include it, install the dependency instead.

## 3. Write design/

Put `design/` at the repo root (or next to the app in a monorepo where
that's the convention). Paths in the config are relative to `root`, except
`specimens` and `setup`, which are relative to the config file.

### dse.config.ts

```ts
import { defineConfig } from 'design-system-editor'

export default defineConfig({
  name: 'Acme',
  root: '..',                       // the app, relative to design/
  theme: ['src/styles/theme.css'],  // every token file
  css: 'src/styles/main.css',       // the CSS entry
  kit: 'src/components/ui',
  setup: 'setup.ts',
  verify: ['pnpm lint', 'pnpm typecheck'],
  prototype: '/'                    // or the app's dev URL; null if it needs a backend
})
```

For several design systems, use `systems: [{ id, label, theme, css, kit,
stories, setup, public, verify }, …]`.

### setup

Mirror the app's entry and Storybook preview, nothing more:

- Vue: `export default { setup(app) { app.use(pinia); app.use(i18n) }, wrapper: TooltipProvider }`.
  Set the app's default theme class on `document.documentElement` in `setup`.
- React: `export default function Wrapper({ children }) { … }` with the providers.
- Nuxt: no setup needed (the editor page is a page of the app).

### specimens (skip what Storybook covers)

One file per kit component (or per family: fields, overlays). For each:

- `components: { Name }` for every kit component the section shows, so it can be selected.
- If the component has a cva definition, `auto: { component, children }`
  generates the variant and size rows. Add `groups` for what cva doesn't
  cover: states (disabled, loading, invalid), with icons, compositions.
- A `playground` with controls for the props a designer would try.
- Real content: realistic labels, the app's icons and images (import
  them; `@repo/` is the app root). Never lorem ipsum.
- Overlays (dialogs, menus, popovers) render open and inline when the
  component allows it; otherwise use a trigger button. Use `contain: true`
  on items whose content is `position: fixed`.
- Order sections like the kit's docs or Storybook: actions, inputs,
  display, overlays, layout. Product-level compositions go under
  `nav: 'In the product'`.

With Storybook, set `stories` to the kit's stories glob. Then write
specimens only for sections that come out poorly. A specimen with the
same `id` (the story title, slugged: `components-button`) replaces the
generated section.

## 4. Verify

1. Run `pnpm design` and open the printed URL (`/__dse`). For more than
   one system, check each (`/__dse?system=<id>`).
2. The page must load without errors in the console or the server log.
   Fix module resolution errors with `vite.alias`, `vite.define` or
   `public`, never by editing the app.
3. Check every section in the Components tab. Each specimen renders the
   way the app renders it (same fonts, colors, spacing). Empty cells, raw
   unstyled HTML, or missing icons mean a missing provider, CSS entry or
   asset path.
4. Click a kit component. The inspector should list token rows
   (Background, Text color, Radius…) with the component's file. Swap one
   token: the specimen should change. **Copy llm.txt** should name the
   exact file and class. Then **Discard draft**.
5. Open the Tokens tab. Every group from the theme should be there with
   values (not empty swatches).

Use a headless browser (Playwright) for these checks when you can, and
look at a screenshot of each tab.

## 5. Report

Tell the user:

- How to run it (`pnpm design`, the URL) and what it shows: systems,
  section count, and what comes from Storybook versus specimens.
- What you added: `design/` files, the script, the dependency.
- Anything that doesn't render, and why (a server component, a backend
  call, a missing provider), with the change in the app that would fix it.
- How to remove it: delete `design/`, the script and the dependency.
