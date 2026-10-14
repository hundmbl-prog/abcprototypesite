import { readFileSync } from 'node:fs'
import path from 'node:path'

/**
 * Reads colour tokens straight from src/styles/tokens.css, so the style guide can never drift
 * from the real values. Only used at build time by statically generated pages.
 */
export function readColorTokens(): Record<string, string> {
  const css = readFileSync(path.join(process.cwd(), 'src/styles/tokens.css'), 'utf8')
  const tokens: Record<string, string> = {}
  for (const match of css.matchAll(/--color-([a-z0-9-]+):\s*(#[0-9a-f]{6})\s*;/gi)) {
    const [, name, value] = match
    if (name && value) tokens[name] = value.toLowerCase()
  }
  return tokens
}
