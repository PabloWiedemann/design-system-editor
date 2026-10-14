#!/usr/bin/env node
import { main } from '../src/cli/index.mjs'

main(process.argv.slice(2)).catch((e) => {
  console.error(e instanceof Error ? e.message : e)
  process.exit(1)
})
