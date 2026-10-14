import { PROP_LABEL } from './inspect/classes'
import type { TokenRow } from './inspect/inspect'
import { COMPONENTS, kitFileOf } from './inspect/registry'
import { componentUsage, kitSource, snippetsOf, usageOf } from './inspect/usage'
import { inKit, project, repoPath, themeFile } from './project'
import { namespaceOf } from './theme'
import { cssVarName, groupLabel, shortName, tokensIn, type Token } from './tokens'
import { isChanged, valueOf } from './tweaks'

/**
 * "Copy reference": a precise, paste-ready description of one component
 * or token for an LLM. Exact files, the variants and props, the tokens
 * involved with their values, and where it's used, so the model can act
 * on it without guessing which thing you mean.
 */
const fileLine = (f: { path: string; count: number }): string =>
  `  - ${repoPath(f.path)} (${f.count}×)`

/** The `{ … }` body after `at` (first brace), without nested blocks. */
function topLevelBody(src: string, at: number): string {
  let depth = 0
  let body = ''
  for (let i = src.indexOf('{', at); i >= 0 && i < src.length; i++) {
    if (src[i] === '{') depth++
    else if (src[i] === '}' && --depth === 0) break
    if (depth === 1 && src[i] !== '{') body += src[i]
  }
  return body
}

/** Props: `defineProps<{ … }>()` in a .vue file, or a `…Props` interface /
 *  type in a .tsx file. */
function propsOf(src: string): string[] {
  const at =
    src.indexOf('defineProps<{') >= 0
      ? src.indexOf('defineProps<{')
      : src.search(/(?:interface\s+\w*Props\b[^{]*|type\s+\w*Props\s*=[^{]*)\{/)
  if (at < 0) return []
  return [...topLevelBody(src, at).matchAll(/^\s*([\w$]+)(\??):\s*([^\n]+)/gm)].map(
    (m) => `${m[1]}${m[2]}: ${m[3]!.trim().replace(/[,;]$/, '')}`
  )
}

/** First line in the code that renders `<Name …>`, outside the kit. */
function exampleOf(name: string): string | null {
  const re = new RegExp(`<${name}(?=[\\s/>])`)
  for (const [path, src] of Object.entries(project.code)) {
    if (project.system.kits.length && inKit(path)) continue
    const lines = src.split('\n')
    const line = lines.findIndex((l) => re.test(l))
    if (line >= 0) return `${repoPath(path)}:${line + 1} → ${lines[line]!.trim()}`
  }
  return null
}

export function componentReference(
  name: string,
  here?: { options?: Record<string, string>; rows?: TokenRow[] }
): string {
  const file = kitFileOf(name)
  const src = file ? kitSource(file) : ''
  const cva = COMPONENTS.find((c) => c.name === name)
  const usage = componentUsage(name)
  const lines = [`# Component: ${name}`, '']
  if (file) lines.push(`- Component file: ${repoPath(file)}`)
  if (cva && cva.file !== file) lines.push(`- Variant classes (cva): ${repoPath(cva.file)}`)
  if (cva)
    for (const [axis, opts] of Object.entries(cva.def.axes))
      lines.push(`- \`${axis}\`: ${Object.keys(opts).join(' | ')}`)
  const props = src ? propsOf(src) : []
  if (props.length) lines.push('- Props:', ...props.map((p) => `  - ${p}`))
  if (here?.options && Object.keys(here.options).length)
    lines.push(
      `- This instance: ${Object.entries(here.options)
        .map(([k, v]) => `${k}="${v}"`)
        .join(' ')}`
    )
  if (here?.rows?.length)
    lines.push(
      '- Design tokens it uses here:',
      ...here.rows.map(
        (r) =>
          `  - ${PROP_LABEL[r.use.kind]}${r.use.states.length ? ` (${r.use.states.join(', ')})` : ''}: \`${r.use.cls}\` → --${r.use.token.name}: ${valueOf(r.use.token)}`
      )
    )
  lines.push(
    `- Used ${usage.total}× in ${usage.files.length} files, e.g.:`,
    ...usage.files.slice(0, 5).map(fileLine)
  )
  const ex = exampleOf(name)
  if (ex) lines.push(`- Example: ${ex}`)
  return lines.join('\n')
}

/** Where a token is declared: theme file and line. */
export function declarationOf(t: Token): string | null {
  for (const [path, css] of Object.entries(project.theme)) {
    const lines = css.split('\n')
    const i = lines.findIndex((l) => l.trimStart().startsWith(`--${t.name}:`))
    if (i >= 0) return `${repoPath(path)}:${i + 1} → ${lines[i]!.trim()}`
  }
  return null
}

/** The utilities a token is used through, without variant prefixes
 *  (hover:, group-data-[…]:) or var(). */
export function utilitiesOf(t: Token): string[] {
  const u = usageOf(t)
  return [
    ...new Set(
      u.files
        .flatMap((f) => f.utilities)
        .filter((x) => !x.startsWith('var('))
        .map((x) => x.replace(/^.*:/, ''))
    )
  ].slice(0, 8)
}

export function tokenReference(t: Token): string {
  const ns = namespaceOf(t.parent ?? t.name)
  const u = usageOf(t)
  const utilities = utilitiesOf(t)
  const lines = [
    `# Design token: --${t.name}`,
    '',
    `- Value: \`${valueOf(t)}\`${isChanged(t) ? ` (draft; source has \`${t.value}\`)` : ''}`,
    `- Group: ${groupLabel(t.group)} (Tailwind theme namespace \`--${ns.prefix}*\`)`,
    `- Declared in: ${declarationOf(t) ?? themeFile()}`,
    t.parent ? `- Carried by \`--${t.parent}\`: applies wherever its utility is used.` : '',
    `- Use it as: ${[...utilities.map((x) => `\`${x}\``), `\`var(--${cssVarName(t)})\``].join(', ')}`,
    t.alias ? `- Value lives in \`--${t.alias}\` (on :root); \`--${t.name}\` points at it.` : '',
    `- Used ${u.total}× in ${u.files.length} files, e.g.:`,
    ...u.files.slice(0, 5).map(fileLine),
    ...snippetsOf(t, 2).map((s) => `- Example: ${repoPath(s.path)}:${s.line} → ${s.code}`)
  ]
  return lines.filter(Boolean).join('\n')
}

export function groupReference(group: string): string {
  const tokens = tokensIn(group)
  return [
    `# Design tokens: ${groupLabel(group)} (${tokens.length})`,
    '',
    `Declared in ${themeFile()} (Tailwind v4 \`@theme\`).`,
    '',
    ...tokens.map((t) => `- --${t.name}: ${valueOf(t)} (${usageOf(t).total}×, \`${shortName(t)}\`)`)
  ].join('\n')
}
