#!/usr/bin/env node

import { readFile, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
)
const errors = []

function report(file, message) {
  errors.push(`${path.relative(repositoryRoot, file)}: ${message}`)
}

async function fileExists(file) {
  try {
    return (await stat(file)).isFile()
  } catch {
    return false
  }
}

async function directories(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name)
}

async function markdownFiles(directory) {
  const results = []
  const entries = await readdir(directory, { withFileTypes: true })

  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue
    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      results.push(...(await markdownFiles(entryPath)))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(entryPath)
    }
  }

  return results
}

function frontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n/)
  if (!match) return null

  const values = {}
  for (const line of match[1].split('\n')) {
    const field = line.match(/^([a-zA-Z][a-zA-Z0-9-]*):\s*(.*)$/)
    if (field) values[field[1]] = field[2].trim()
  }
  return values
}

async function validateRequiredFiles() {
  const required = [
    'README.md',
    'LICENSE',
    'AGENTS.md',
    '.claude/CLAUDE.md',
    'package.json',
    '.claude-plugin/plugin.json',
    '.claude-plugin/marketplace.json',
    'hooks/hooks.json',
    'hooks/session-start.mjs',
    'docs/README.md',
    'docs/sources.md',
  ]

  for (const relativeFile of required) {
    const file = path.join(repositoryRoot, relativeFile)
    if (!(await fileExists(file))) report(file, 'required file is missing')
  }
}

async function validateJson() {
  for (const relativeFile of [
    'package.json',
    '.claude-plugin/plugin.json',
    '.claude-plugin/marketplace.json',
    'hooks/hooks.json',
  ]) {
    const file = path.join(repositoryRoot, relativeFile)
    try {
      JSON.parse(await readFile(file, 'utf8'))
    } catch (error) {
      report(file, `invalid JSON: ${error.message}`)
    }
  }
}

async function validateSkills() {
  const skillsRoot = path.join(repositoryRoot, 'skills')
  const skillNames = await directories(skillsRoot)
  if (skillNames.length !== 8) {
    report(skillsRoot, `expected 8 skills, found ${skillNames.length}`)
  }

  for (const skillName of skillNames) {
    const skillRoot = path.join(skillsRoot, skillName)
    const skillFile = path.join(skillRoot, 'SKILL.md')
    const metadataFile = path.join(skillRoot, 'agents', 'openai.yaml')

    if (!(await fileExists(skillFile))) {
      report(skillFile, 'SKILL.md is missing')
      continue
    }
    if (!(await fileExists(metadataFile))) {
      report(metadataFile, 'Codex UI metadata is missing')
    }

    const source = await readFile(skillFile, 'utf8')
    const metadata = frontmatter(source)
    if (!metadata) {
      report(skillFile, 'frontmatter is missing')
      continue
    }
    if (metadata.name !== skillName) {
      report(skillFile, `frontmatter name must equal directory name ${skillName}`)
    }
    if (!metadata.description || metadata.description.length < 80) {
      report(skillFile, 'description must explain concrete triggers')
    }
    if (/\bTODO\b|\[TODO/i.test(source)) {
      report(skillFile, 'contains a placeholder')
    }

    if (await fileExists(metadataFile)) {
      const uiMetadata = await readFile(metadataFile, 'utf8')
      if (!uiMetadata.includes(`$${skillName}`)) {
        report(metadataFile, `default_prompt must mention $${skillName}`)
      }
    }
  }
}

async function validateAgentsAndCommands() {
  for (const folder of ['agents', 'commands']) {
    const folderPath = path.join(repositoryRoot, folder)
    const files = (await readdir(folderPath))
      .filter((name) => name.endsWith('.md'))
      .map((name) => path.join(folderPath, name))

    if (files.length === 0) report(folderPath, `no ${folder} found`)

    for (const file of files) {
      const source = await readFile(file, 'utf8')
      const metadata = frontmatter(source)
      if (!metadata) {
        report(file, 'frontmatter is missing')
        continue
      }
      if (!metadata.description) report(file, 'description is missing')
      if (folder === 'agents' && !metadata.name) report(file, 'name is missing')
      if (/\bTODO\b|\[TODO/i.test(source)) report(file, 'contains a placeholder')
    }
  }
}

async function validateHook() {
  const hooksFile = path.join(repositoryRoot, 'hooks', 'hooks.json')
  const scriptFile = path.join(repositoryRoot, 'hooks', 'session-start.mjs')
  const configuration = JSON.parse(await readFile(hooksFile, 'utf8'))
  const handler = configuration?.hooks?.SessionStart?.[0]?.hooks?.[0]

  if (handler?.type !== 'command') report(hooksFile, 'SessionStart must use a command hook')
  if (handler?.command !== 'node') report(hooksFile, 'hook must invoke Node directly')
  if (!Array.isArray(handler?.args) || handler.args.length !== 1) {
    report(hooksFile, 'hook must use exec-form args with one script path')
  }
  if (handler?.args?.[0] !== '${CLAUDE_PLUGIN_ROOT}/hooks/session-start.mjs') {
    report(hooksFile, 'hook script must resolve from CLAUDE_PLUGIN_ROOT')
  }

  const source = await readFile(scriptFile, 'utf8')
  const forbidden = [
    /\bcurl\b/,
    /\bwget\b/,
    /\bnpx\b/,
    /npm\s+(?:install|add)/,
    /\brm\s+-/,
    /child_process/,
    /\bfetch\s*\(/,
  ]
  for (const pattern of forbidden) {
    if (pattern.test(source)) report(scriptFile, `forbidden hook behavior: ${pattern}`)
  }
}

async function validateLinks() {
  for (const file of await markdownFiles(repositoryRoot)) {
    const source = await readFile(file, 'utf8')
    const links = source.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)

    for (const match of links) {
      const rawTarget = match[1].trim().replace(/^<|>$/g, '')
      if (
        rawTarget.startsWith('http://') ||
        rawTarget.startsWith('https://') ||
        rawTarget.startsWith('#') ||
        rawTarget.startsWith('mailto:')
      ) {
        continue
      }

      const targetWithoutAnchor = rawTarget.split('#', 1)[0]
      const target = path.resolve(path.dirname(file), decodeURI(targetWithoutAnchor))
      if (!(await fileExists(target))) report(file, `broken local link: ${rawTarget}`)
    }
  }
}

async function validateSourceCoverage() {
  const file = path.join(repositoryRoot, 'docs', 'sources.md')
  const source = await readFile(file, 'utf8')
  if (!source.includes('React Start Markdown pages audited: 43')) {
    report(file, 'audit page count is missing')
  }
  if (!source.includes('a3e24c35a58d9ac149a05d6321f68aa5d541b6b4')) {
    report(file, 'TanStack source commit is missing')
  }
}

async function main() {
  await validateRequiredFiles()
  await validateJson()
  await validateSkills()
  await validateAgentsAndCommands()
  await validateHook()
  await validateLinks()
  await validateSourceCoverage()

  if (errors.length > 0) {
    for (const error of errors) process.stderr.write(`ERROR ${error}\n`)
    process.stderr.write(`Validation failed with ${errors.length} error(s).\n`)
    process.exitCode = 1
    return
  }

  process.stdout.write('Validated plugin manifests, skills, agents, commands, hook safety, documentation links, and source coverage.\n')
}

main().catch((error) => {
  process.stderr.write(`Validation crashed: ${error.stack ?? error.message}\n`)
  process.exitCode = 1
})
