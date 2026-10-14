import { usageOf } from './inspect/usage'
import { kitDir, project, repoPath, themeFile } from './project'
import { shortName, TOKENS, type Token } from './tokens'
import { draft, type Swap } from './tweaks'

/**
 * Turns draft changes into precise, copy-pasteable instructions for an
 * LLM (llm.txt): exact files, exact find/replace strings, nothing else.
 */
/** The theme file and line that declare `--name`. */
function declared(name: string): { file: string; line: string } | null {
  const re = new RegExp(`^\\s*--${name}:[^;]+;.*$`, 'm')
  for (const [path, css] of Object.entries(project.theme)) {
    const m = re.exec(css)
    if (m) return { file: repoPath(path), line: m[0].trim() }
  }
  return null
}
const declLine = (name: string): string | null => declared(name)?.line ?? null

function tokenValueStep(t: Token, value: string): string {
  const line = declLine(t.name) ?? `--${t.name}: ${t.value};`
  const next = line.replace(/(--[\w-]+:\s*)([^;]+)(;)/, `$1${value}$3`)
  const u = usageOf(t)
  return [
    `### Change the value of --${t.name}`,
    `File: ${declared(t.name)?.file ?? themeFile()}`,
    `Find:    ${line}`,
    `Replace: ${next}`,
    `Effect: every use of this token updates (${u.files.length} files, ${u.total} places). No other file changes.`
  ].join('\n')
}

function swapStep(s: Swap): string {
  if (s.axis === 'css')
    return [
      `### ${s.componentName}: use --${s.toToken} instead of --${s.fromToken}`,
      `File: ${repoPath(s.file)}`,
      `In the CSS rule \`${s.option}\`, change the declaration \`${s.from}\` to \`${s.to}\`.`,
      `Change only that declaration.`
    ].join('\n')
  const where =
    s.axis === 'base'
      ? 'the `base` classes of the cva() definition'
      : s.axis === 'file'
        ? 'the template/class string where it appears (it appears exactly once in this file)'
        : `\`variants.${s.axis}.${s.option}\` of the cva() definition`
  return [
    `### ${s.componentName}: use --${s.toToken} instead of --${s.fromToken}`,
    `File: ${repoPath(s.file)}`,
    `In ${where}, replace the class \`${s.from}\` with \`${s.to}\`.`,
    `Change only that one class. Keep every other class and its order.`
  ].join('\n')
}

const EXAMPLE: Partial<Record<string, (a: string, b: string) => string>> = {
  text: (a, b) => `\`text-${a}\` -> \`text-${b}\``,
  color: (a, b) => `\`bg-${a}\` -> \`bg-${b}\`, \`hover:text-${a}/60\` -> \`hover:text-${b}/60\``,
  radius: (a, b) =>
    `\`rounded-${a}\` -> \`rounded-${b}\`, \`rounded-t-${a}\` -> \`rounded-t-${b}\``,
  shadow: (a, b) => `\`shadow-${a}\` -> \`shadow-${b}\``
}

function mergeStep(fromName: string, toName: string): string {
  const from = TOKENS.find((t) => t.name === fromName)!
  const to = TOKENS.find((t) => t.name === toName)!
  const a = shortName(from)
  const b = shortName(to)
  const u = usageOf(from)
  const files = u.files.map((f) => `  - ${repoPath(f.path)} (${f.count}: ${f.utilities.join(', ')})`)
  const lines = [
    declLine(from.name),
    from.group === 'text' ? declLine(`${from.name}--line-height`) : null
  ]
    .filter(Boolean)
    .map((l) => `  ${l}`)
  return [
    `### Merge --${fromName} into --${toName} (remove ${a})`,
    `1. In each file below, replace every utility that ends in \`-${a}\` with the same utility ending in \`-${b}\`.`,
    `   Keep prefixes (hover:, focus-visible:, data-[…]:)${from.group === 'color' ? ' and opacity suffixes (/60)' : ''}. Example: ${EXAMPLE[from.group]?.(a, b) ?? `\`${a}\` -> \`${b}\``}.`,
    `   Also replace \`var(--${fromName})\` with \`var(--${toName})\`${from.group === 'text' ? ` and \`var(--${fromName}--line-height)\` with \`var(--${toName}--line-height)\`` : ''}.`,
    `   Match whole utilities only (\`text-${a}\` must not change \`text-${a}-foo\`).`,
    ...(files.length ? files : ['  (no uses found)']),
    `2. In ${declared(from.name)?.file ?? themeFile()}, delete:`,
    ...lines,
    `3. If the repo configures tailwind-merge with custom scales (extendTailwindMerge), remove '${a}' from its \`${from.group}\` list.`
  ].join('\n')
}

export interface LlmScope {
  tokens?: Token[]
  swaps?: Swap[]
  merges?: [string, string][]
}

/** llm.txt for the given changes (defaults to the whole draft). */
export function buildLlm(scope?: LlmScope): string {
  const tokens = scope?.tokens ?? TOKENS.filter((t) => draft.tokens[t.name] !== undefined)
  const swaps = scope?.swaps ?? draft.swaps
  const merges = scope?.merges ?? Object.entries(draft.merges)
  const steps = [
    ...tokens
      .filter((t) => draft.tokens[t.name] !== undefined)
      .map((t) => tokenValueStep(t, draft.tokens[t.name]!)),
    ...swaps.map(swapStep),
    ...merges.map(([f, t]) => mergeStep(f, t))
  ]
  if (!steps.length) return ''
  const verify = project.verify.length
    ? project.verify.map((v) => `- \`${v}\` passes`)
    : ['- Run the repo\'s formatter, type checker and linter; they pass.']
  return [
    `# Design system changes - ${project.name}`,
    '',
    'Apply exactly these edits in this repo. Do not change anything else.',
    `The design system lives in ${kitDir()} (tokens in ${themeFile()}).`,
    'These come from the design system editor: a designer previewed them live and wants them in code. Open a pull request with them when done.',
    '',
    ...steps.flatMap((s, i) => [s.replace(/^### /, `### ${i + 1}. `), '']),
    '## Verify',
    ...verify,
    '- Searching the repo for any removed token utility returns nothing.',
    ''
  ].join('\n')
}

export async function copyLlm(scope?: LlmScope): Promise<boolean> {
  const text = buildLlm(scope)
  if (!text) return false
  await navigator.clipboard.writeText(text)
  return true
}
