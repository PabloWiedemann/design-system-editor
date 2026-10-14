// `dse dev`: start the design system editor for the repo in the current
// folder (or --root), using design/dse.config.* (or --config).
import { loadContext } from './context.mjs'
import { runNuxt, runVite } from './hosts.mjs'

const HELP = `design-system-editor

Usage
  dse dev [--config design/dse.config.ts] [--root .] [--port 5290]

Starts your repo's dev server with the editor at /__dse.
Docs: https://github.com/PabloWiedemann/design-system-editor`

function parse(argv) {
  const out = { _: [] }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a.startsWith('--')) {
      const [k, v] = a.slice(2).split('=')
      out[k] = v ?? (argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true)
    } else out._.push(a)
  }
  return out
}

export async function main(argv) {
  const args = parse(argv)
  const cmd = args._[0]
  if (!cmd || args.help || cmd === 'help') return console.log(HELP)
  if (cmd !== 'dev') {
    console.error(`Unknown command "${cmd}".\n\n${HELP}`)
    process.exitCode = 1
    return
  }
  const ctx = await loadContext({ config: args.config, root: args.root, port: args.port })
  console.log(`  ${ctx.name}: ${ctx.framework}, ${ctx.systems.length} design system${ctx.systems.length === 1 ? '' : 's'}`)
  if (ctx.framework === 'nuxt') await runNuxt(ctx)
  else await runVite(ctx)
}
