/**
 * The repo the editor runs in, as the dev server describes it
 * (`/__dse/project.json`): its theme CSS, its code, and where things live.
 * Filled once by startEditor() before the app mounts; everything else
 * reads it lazily.
 */
export type Framework = 'vue' | 'react' | 'nuxt'

export interface SystemInfo {
  id: string
  label: string
  /** The kit (shared components) folders, relative to the app root. The
   *  first is the main one; others hold more of it (a variants package). */
  kits: string[]
  /** Theme CSS files with `@theme` blocks, relative to the app root. */
  theme: string[]
}

export interface ProjectData {
  name: string
  framework: Framework
  /** Absolute path of the app root (to map component files). */
  root: string
  /** The app root relative to the git repo, '' when they're the same. */
  repoPrefix: string
  systems: { id: string; label: string }[]
  system: SystemInfo
  /** Theme CSS by path (relative to the app root). */
  theme: Record<string, string>
  /** Source files by path (relative to the app root). */
  code: Record<string, string>
  /** URL of the running app for the Prototype tab, if any. */
  prototype: string | null
  /** Commands an agent should run to verify its edits. */
  verify: string[]
  /** Class put around every rendered component (repos that scope their
   *  styles under one class). */
  scopeClass: string
}

export const project = {
  name: '',
  framework: 'vue',
  root: '',
  repoPrefix: '',
  systems: [],
  system: { id: 'default', label: 'Default', kits: [], theme: [] },
  theme: {},
  code: {},
  prototype: null,
  verify: [],
  scopeClass: ''
} as ProjectData

export function setProject(data: ProjectData): void {
  Object.assign(project, data)
}

/** A path as an agent in the repo sees it (from the git root). */
export const repoPath = (path: string): string =>
  project.repoPrefix ? `${project.repoPrefix}/${path}` : path

/** All theme CSS as one string (declarations and their comments). */
export const themeText = (): string => Object.values(project.theme).join('\n')

/** The main theme file, from the git root. */
export const themeFile = (): string => repoPath(project.system.theme[0] ?? 'tokens.css')

/** The kit folders, from the git root. */
export const kitDir = (): string => project.system.kits.map(repoPath).join(', ') || repoPath('')

/** Whether a file (relative to the app root) is part of the kit. An
 *  empty kit list means the whole app is. */
export const inKit = (path: string): boolean =>
  !project.system.kits.length || project.system.kits.some((k) => path.startsWith(`${k}/`))

/** A storage key scoped to this repo and system. */
export const storageKey = (what: string): string =>
  `dse:${project.name}:${project.system.id}:${what}`
