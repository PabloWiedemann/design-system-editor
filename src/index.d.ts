import type { Plugin } from 'vite'

export interface SystemConfig {
  /** Stable id, used in the URL (`/__dse?system=app`) and storage keys. */
  id: string
  /** Shown in the system switcher. */
  label?: string
  /** CSS files with the tokens: `@theme` blocks and `:root` variables. Globs, relative to `root`. */
  theme?: string | string[]
  /** The CSS the app loads (its Tailwind entry). Defaults to `theme`. */
  css?: string | string[]
  /** Source scanned for usage counts and examples. Defaults to all code under `root`. */
  code?: string | string[]
  /** The kit: folder(s) with the shared components and their cva variants. */
  kit?: string | string[]
  /** Specimen files (sections of the Components tab), relative to this config. Default `specimens/**`. */
  specimens?: string | string[]
  /** Storybook stories turned into sections, relative to `root`, e.g. `src/**\/*.stories.ts`. */
  stories?: string | string[]
  /** What components need to render, relative to this config. See the README. */
  setup?: string
  /** Static folders served at `/` (like Vite's publicDir), relative to `root`. */
  public?: string | string[]
  /** Commands an agent runs to check its edits; overrides the top-level list. */
  verify?: string | string[]
}

export interface Config extends Omit<SystemConfig, 'id' | 'label'> {
  /** Shown in the top bar and the llm.txt header. Defaults to the folder name. */
  name?: string
  /** Defaults to the detected one: nuxt, react (incl. Next.js) or vue. */
  framework?: 'vue' | 'react' | 'nuxt'
  /** The app folder, relative to this config. Defaults to the folder that holds `design/`. */
  root?: string
  /** More than one design system in the repo (a monorepo). */
  systems?: SystemConfig[]
  /** URL (or path on the dev server) of the running app, for the Prototype tab. */
  prototype?: string | null
  /** Commands an agent runs to check its edits, listed in llm.txt. */
  verify?: string | string[]
  /** A class put around every rendered component, for repos that scope their styles. */
  scopeClass?: string
  /** Extra HTML for the editor page's <head> (fonts the app loads elsewhere). */
  head?: string
  /** Vite options for the editor's dev server (Vue and React repos). */
  vite?: {
    /** Use the repo's own Vite config file instead of a minimal one. */
    config?: string
    alias?: Record<string, string>
    define?: Record<string, string>
    plugins?: Plugin[]
  }
  port?: number
}

export declare function defineConfig(config: Config): Config
