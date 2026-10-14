import type { SpecimenSection } from './specimens'

/** Storybook CSF modules (by path) as specimen sections. */
export declare function fromStories(
  modules: Record<string, Record<string, unknown>>,
  options?: {
    framework?: 'vue' | 'react'
    nav?: string
    decorators?: ((...args: never[]) => unknown)[]
    reactive?: <T extends object>(o: T) => T
    order?: Record<string, string[]>
  }
): SpecimenSection[]
