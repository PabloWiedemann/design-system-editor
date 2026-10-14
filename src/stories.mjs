// Storybook stories as specimens. A repo with Storybook already has a
// "story" for each state of each component (CSF: a default export with
// the component, and one named export per story). Each stories file
// becomes a section: a playground driven by its argTypes, the cva
// variants when the component has them, and a cell per story.

const SKIP = new Set(['default', '__namedExportsOrder'])

const startCase = (s) =>
  s
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/^./, (c) => c.toUpperCase())
const slug = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const isStoryExport = (meta, key) => {
  if (SKIP.has(key)) return false
  const match = (rule) =>
    Array.isArray(rule) ? rule.includes(key) : rule instanceof RegExp ? rule.test(key) : false
  if (meta.includeStories && !match(meta.includeStories)) return false
  if (meta.excludeStories && match(meta.excludeStories)) return false
  return true
}

/** A Storybook control as an editor control. */
function controlOf(key, argType, value) {
  const type = typeof argType?.control === 'string' ? argType.control : argType?.control?.type
  if (argType?.control === false || argType?.table?.disable) return null
  // `default` / `children` are the slot content.
  const label = argType?.name && argType.name !== key ? argType.name : /^(default|children)$/.test(key) ? 'Content' : startCase(key)
  const options = (argType?.options ?? []).filter((o) => typeof o === 'string')
  if (options.length && (!type || /select|radio|check/.test(type)))
    return { key, label, type: options.length <= 4 ? 'segment' : 'select', options }
  if (type === 'boolean' || (!type && typeof value === 'boolean')) return { key, label, type: 'toggle' }
  if (type === 'text' || (!type && typeof value === 'string')) return { key, label, type: 'text' }
  return null
}

/**
 * Decorators wrap a story: in Vue they return a component whose template
 * renders `<story />`; in React they get the story as a component.
 */
function decorate(framework, renderStory, decorators, context) {
  let current = renderStory
  for (const decorator of decorators) {
    const inner = current
    current =
      framework === 'react'
        ? () => decorator(() => inner(), context)
        : () => {
            const story = inner()
            const wrapped = decorator(() => story, context)
            if (!wrapped || typeof wrapped !== 'object') return story
            return { ...wrapped, components: { ...wrapped.components, story, Story: story } }
          }
  }
  return current
}

/**
 * @param {Record<string, Record<string, unknown>>} modules stories files by path
 * @param {{ framework?: 'vue' | 'react', nav?: string, decorators?: Function[], reactive?: <T>(o: T) => T, order?: Record<string, string[]> }} [options]
 *   `reactive`: Vue's, so stories get reactive args as in Storybook.
 *   `order`: story names per file in source order (namespaces sort them).
 */
export function fromStories(modules, options = {}) {
  const framework = options.framework ?? 'vue'
  const reactive = options.reactive ?? ((o) => o)
  const sections = []
  for (const [path, mod] of Object.entries(modules)) {
    const meta = mod.default
    if (!meta || typeof meta !== 'object') continue
    const parts = (meta.title ?? path.split('/').pop().replace(/\.stories\.\w+$/, '')).split('/')
    const title = parts.at(-1)
    const component = meta.component
    const componentName = component
      ? (component.__name ?? component.displayName ?? component.name ?? title)
      : undefined

    const names = mod.__namedExportsOrder ?? options.order?.[path] ?? []
    const rank = (key) => (names.includes(key) ? names.indexOf(key) : names.length)
    const stories = Object.entries(mod)
      .sort(([a], [b]) => rank(a) - rank(b))
      .filter(([key, s]) => isStoryExport(meta, key) && (typeof s === 'function' || (s && typeof s === 'object')))
      .map(([key, s]) => {
        const story = typeof s === 'function' ? { render: s, ...s } : s
        const args = reactive({ ...meta.args, ...story.args })
        const render = story.render ?? meta.render
        const context = { args, argTypes: { ...meta.argTypes, ...story.argTypes }, globals: {}, parameters: { ...meta.parameters, ...story.parameters }, name: story.name ?? key, id: key }
        const base = () =>
          render
            ? render(args, context)
            : framework === 'react'
              ? null
              : { render: () => null }
        const decorators = [...(story.decorators ?? []), ...(meta.decorators ?? []), ...(options.decorators ?? [])]
        return { key, story, args, render, context, decorators, decorated: decorate(framework, base, decorators, context) }
      })
    if (!stories.length) continue

    const argTypes = meta.argTypes ?? {}
    // The playground starts from the Default story, else the first.
    const main = stories.find((s) => s.key === 'Default') ?? stories[0]
    const defaults = { ...meta.args, ...main.args }
    const controls = [...new Set([...Object.keys(argTypes), ...Object.keys(defaults)])]
      .map((k) => controlOf(k, argTypes[k], defaults[k]))
      .filter(Boolean)

    // A story without its own render: the component with its args.
    const cell = (s) =>
      s.render || !component
        ? { render: () => s.decorated() }
        : { component, props: withoutSlots(s.args), children: s.args.default ?? s.args.children }

    const section = {
      id: slug(parts.join('-')),
      title,
      description: meta.parameters?.docs?.description?.component,
      nav: options.nav ?? (parts.length > 1 ? parts[0] : 'Components'),
      order: 200,
      components: component ? { [componentName]: component } : undefined,
      groups: [
        {
          title: 'Stories',
          cell: 'lg',
          items: stories.map((s) => ({ label: s.story.name ?? startCase(s.key), name: componentName, contain: true, span: 'full', ...cell(s) }))
        }
      ]
    }
    if (component) {
      // Variant and size rows from the component's cva, when it has one.
      section.auto = { component, name: componentName, children: defaults.default ?? defaults.children ?? title }
      if (controls.length) {
        const first = main
        section.playground = {
          component: first.render ? undefined : component,
          name: componentName,
          controls,
          defaults,
          ...(first.render
            ? {
                render: (props) => {
                  const args = reactive({ ...props })
                  const context = { ...first.context, args }
                  return decorate(framework, () => first.render(args, context), first.decorators, context)()
                }
              }
            : { children: (props) => props.default ?? props.children })
        }
      }
    }
    sections.push(section)
  }
  return sections
}

const withoutSlots = (args) => {
  const { default: _d, children: _c, ...rest } = args
  return rest
}
