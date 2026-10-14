# Design system editor

A visual editor for Tailwind v4 design systems that runs inside your own repo.
You browse the real tokens and components, change them live, and copy the
changes as **llm.txt**: precise, file-by-file instructions that a coding agent
(Claude Code, Cursor, Codex…) turns into a pull request.

It's meant for designers. Nothing in the repo changes while you work: edits
stay in a draft in your browser until you hand them to an agent.

- **Tokens.** Every token in the theme (colors, type, radius, shadows, motion…), grouped the way Tailwind groups them, with usage counts. Select one to edit it with an OKLCH picker, merge it into another, or copy a reference.
- **Components.** Every kit component in its variants and states, rendered by your app's own code and CSS. Select one to swap the tokens behind it, try its props in a playground, and see where it's used.
- **Consolidate.** Find near-duplicate tokens and merge them by hand or with your own rules, or hand the job to your agent.
- **Prototype.** Your running app, with the draft applied, to see changes in context.
- **llm.txt.** The draft as instructions: which file, which class or declaration, from what to what, and how to verify.

## How it works

`dse dev` starts your app's dev server (Vite, or Nuxt's) with the editor added
at `/__dse`. The editor is a prebuilt bundle with its own styles (prefixed
`dse:`, so it never collides with yours). Your components render inside it
with your framework, your providers and your CSS. The editor reads your theme
CSS and your source to learn the tokens, the cva variants and where things
are used.

Everything the editor needs from a repo lives in one folder, `design/`:

```
design/
  dse.config.ts      where the theme, the kit and the app are
  setup.ts           what components need around them (i18n, store, providers)
  specimens/*.ts     what the Components tab shows (optional with Storybook)
```

Deleting `design/` removes it completely.

Supported: **Vue + Vite**, **React + Vite**, **Next.js** (client components,
with `next/*` stubbed), **Nuxt**, and **Astro sites with Vue or React
components**. Monorepos can have several design systems. Tailwind v4 is
required.

## Install in a repo

### With an agent (recommended)

This repo ships a skill, [`skills/install-design-system-editor`](skills/install-design-system-editor/SKILL.md).
Ask your agent:

> Install the design system editor from github.com/PabloWiedemann/design-system-editor in this repo. Follow its install skill.

The skill finds the theme, the kit and the providers, writes `design/`, and
checks that every section renders.

### By hand

1. Add the package, or run it with npx (see below):

   ```sh
   pnpm add -D github:PabloWiedemann/design-system-editor
   ```

2. Add a script to `package.json`:

   ```json
   { "scripts": { "design": "dse dev" } }
   ```

3. Write `design/dse.config.ts` (see [Config](#config)) and, unless you
   have Storybook, a few specimens.

4. Run `pnpm design` and open `http://localhost:5290/__dse`.

To run it without adding a dependency, use
`npx -y github:PabloWiedemann/design-system-editor dev`. The CLI resolves
`design-system-editor` imports in `design/` itself. If your type checker or
linter covers `design/`, install the package instead so the imports have
types.

## Using it (for designers)

1. Run `pnpm design` (or the script your repo uses) and open the URL it prints.
2. **Components**: click a component. The inspector on the right shows
   the tokens it uses: background, text, border, radius, and so on. Pick
   another token to see the change everywhere that variant appears.
   **Variants** drives the playground; **Info** shows the files and where
   the component is used.
3. **Tokens**: click a token to edit its value, or merge it into another.
   Every component using it updates.
4. Use **Prototype** to see the draft in the running app (when the repo sets it up).
5. Use **Copy llm.txt** (top bar) to copy every change. Paste it into your
   coding agent and ask it to open a pull request. Each component's footer
   has its own Copy llm.txt for just that component.
6. **Discard draft** starts over. The draft is saved in your browser, per
   repo and design system.

## Config

`design/dse.config.ts`:

```ts
import { defineConfig } from 'design-system-editor'

export default defineConfig({
  name: 'Acme',
  // Where the app is, relative to this file. Default: the folder holding design/.
  root: '../apps/web',
  // CSS with the tokens: `@theme` blocks and `:root` variables.
  theme: 'src/styles/theme.css',
  // The CSS the app loads (its Tailwind entry). Default: `theme`.
  css: 'src/styles/main.css',
  // The kit: folder(s) with the shared components and their cva variants.
  kit: 'src/components/ui',
  // Commands an agent runs to check its edits (listed in llm.txt).
  verify: ['pnpm lint', 'pnpm typecheck'],
  // The running app, for the Prototype tab (a path on this server or a URL).
  prototype: '/'
})
```

| Option | What it's for |
| --- | --- |
| `name` | Top bar and llm.txt header. Defaults to the folder name. |
| `framework` | `vue`, `react` or `nuxt`. Detected from `package.json`. |
| `root` | The app folder, relative to the config. |
| `theme` | Token CSS files (globs, relative to `root`). Required. |
| `css` | The app's CSS entry. Defaults to `theme`. |
| `code` | Source scanned for usage. Defaults to all code under `root`. |
| `kit` | Folder(s) with the shared components and their `cva()` variants. |
| `specimens` | Specimen files, relative to the config. Default `specimens/**`. |
| `stories` | Storybook stories to show as sections, relative to `root`. |
| `setup` | Setup file, relative to the config. |
| `public` | Static folder(s) served at `/` (a monorepo app's `public/`). |
| `verify` | Commands for the agent to run after editing. |
| `prototype` | URL or path of the running app for the Prototype tab. |
| `scopeClass` | A class put around rendered components, for repos that scope styles. |
| `head` | Extra `<head>` HTML (fonts the app loads elsewhere, e.g. `next/font`). |
| `vite` | `{ config, alias, define, plugins }` for the editor's Vite server. |
| `systems` | Several design systems, each with its own `theme`, `kit`, `stories`… |
| `port` | Default 5290. |

### Several design systems

A monorepo with an app kit and a marketing site:

```ts
export default defineConfig({
  root: '..',
  systems: [
    { id: 'app', label: 'App', theme: 'packages/ui/theme.css', kit: ['src/components/ui', 'packages/ui/src'], stories: 'src/**/*.stories.ts', setup: 'setup/app.ts' },
    { id: 'site', label: 'Website', theme: 'apps/site/src/styles/global.css', kit: 'apps/site/src/components/ui', public: 'apps/site/public', setup: 'setup/site.ts' }
  ]
})
```

The switcher in the top bar moves between them. Each gets its own token
list, components, draft and llm.txt. Imports resolve per app (each app's
own `tsconfig` paths), so `@/` can mean a different folder in each.

## Setup

What your components need around them, as the app's entry or Storybook
preview provides it.

Vue: a function that receives the app, or `{ setup, wrapper }`:

```ts
import { createPinia } from 'pinia'
import { i18n } from '@/i18n'
import TooltipProvider from '@/components/ui/tooltip/TooltipProvider.vue'

export default {
  setup(app) {
    app.use(createPinia())
    app.use(i18n)
  },
  // Every cell renders inside this.
  wrapper: TooltipProvider
}
```

React: a wrapper component.

```tsx
export default function Wrapper({ children }) {
  const [client] = useState(() => new QueryClient())
  return <QueryClientProvider client={client}><TooltipProvider>{children}</TooltipProvider></QueryClientProvider>
}
```

Nuxt needs no setup: the editor page is a page of your app, with its
plugins and modules.

## Specimens

A *specimen* (Storybook calls it a *story*) is one component rendered with
given props: a primary button, a disabled input, a card with an image. The
Components tab is a list of sections, one per component, each made of
specimens. The editor lays them out the same way in every repo; specimens
only say what to render.

```ts
import { defineSpecimens } from 'design-system-editor/specimens'
import Button from '@/components/ui/Button.vue'

export default defineSpecimens({
  id: 'button',
  title: 'Button',
  description: 'One primary per surface.',
  // Kit components in this section, by name: makes them selectable.
  components: { Button },
  // Variant and size rows, generated from the component's cva().
  auto: { component: Button, children: 'Continue' },
  // A live sample, driven from the inspector's Variants tab.
  playground: {
    component: Button,
    controls: [
      { key: 'variant', label: 'Variant', type: 'select', options: ['primary', 'secondary', 'ghost'] },
      { key: 'disabled', label: 'Disabled', type: 'toggle' }
    ],
    defaults: { variant: 'primary', disabled: false },
    children: 'Continue'
  },
  // Hand-written rows.
  groups: [
    {
      title: 'State',
      prop: 'disabled',
      items: [{ label: 'disabled', component: Button, props: { disabled: true }, children: 'Continue' }]
    }
  ]
})
```

- An item is `{ label, component, props, children }`, or `{ label, render }`
  for anything else (Vue: return `h(…)`; React: return JSX).
- `@repo/` imports from the app root; your `tsconfig` paths work too.
- Item options: `fill` (stretch to the cell width), `bleed` (no padding),
  `span: 2 | 'full'`, `contain` (keep `position: fixed` content in the cell).
- Section options: `nav` (nav group, default "Components"), `order`,
  `content` (a whole demo after the groups).
- Specimen files reload live as you edit them.

### Storybook

If the repo has Storybook, point `stories` at the stories files:

```ts
stories: 'src/components/ui/**/*.stories.ts'
```

Each stories file becomes a section. The playground is driven by its
`argTypes` and starts from the `Default` story. Variant rows come from the
component's cva, and there is one cell per story. Decorators are applied.
A specimen with the same `id` replaces the generated section, so you can
improve a section without touching the stories.

## llm.txt

What **Copy llm.txt** produces, for a token swap on a component:

```
# Design system changes - Acme

Apply exactly these edits in this repo. Do not change anything else.
…

### 1. Button: use --color-destructive instead of --color-primary
File: components/ui/button.tsx
In `variants.variant.default` of the cva() definition, replace the class `bg-primary` with `bg-destructive`.
Change only that one class. Keep every other class and its order.

## Verify
- `pnpm lint` passes
```

Token edits name the theme file and declaration. CSS-rule edits (for
components styled with plain CSS) name the rule and the declaration.
Merges list every file that uses the merged token.

## Removing it

Delete `design/`, the `design` script, and the dependency if you added one.
Nothing else in the repo was touched.

## Trying it on a repo without adding design/

`--config` and `--root` let you keep the config outside the repo, for
example to try the editor on a checkout you don't want to change:

```sh
node bin/dse.mjs dev --config ~/dse-configs/acme/dse.config.ts --root ~/code/acme/apps/web
```

## Developing

```sh
pnpm install
pnpm build        # the editor bundle, dist/editor (committed)
pnpm typecheck
```

- `src/editor`: the editor app (Vue, Reka UI, Tailwind with the `dse` prefix).
- `src/cli`: `dse dev`, config loading, the Vite plugin, and the Vite and Nuxt hosts.
- `src/adapters`: render the repo's components (Vue, React) into the editor.
- `src/stories.mjs`: Storybook stories as specimens.
- `src/shims/next`: stand-ins for `next/*` modules under Vite.
- `src/nuxt`: the Nuxt module that adds the `/__dse` page.

`dist/` is committed, so installing from GitHub needs no build. Rebuild it
after changing `src/editor`.

## Limits

- Tailwind v4 themes only (`@theme`, `:root` variables).
- Next.js: client components render; server components and server data don't.
- Astro: Vue and React components render; `.astro` components don't.
- The draft lives in the browser (localStorage), so it isn't shared between machines.

## License

MIT
