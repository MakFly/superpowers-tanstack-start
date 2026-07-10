#!/usr/bin/env node

import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'

const MAX_DEPTH = 3
const MAX_MANIFESTS = 200
const SKIPPED_DIRECTORIES = new Set([
  '.git',
  '.output',
  '.tanstack',
  'coverage',
  'dist',
  'node_modules',
])

/** @typedef {{ directory: string, version: string, buildTool: string, packageManager: string }} DetectedApp */

/**
 * Find package manifests without following symbolic links.
 * @param {string} directory
 * @param {number} depth
 * @param {string[]} manifests
 * @returns {Promise<void>}
 */
async function findManifests(directory, depth, manifests) {
  if (depth > MAX_DEPTH || manifests.length >= MAX_MANIFESTS) return

  const entries = await readdir(directory, { withFileTypes: true })
  for (const entry of entries) {
    if (manifests.length >= MAX_MANIFESTS) return

    const entryPath = path.join(directory, entry.name)
    if (entry.isFile() && entry.name === 'package.json') {
      manifests.push(entryPath)
      continue
    }

    if (
      entry.isDirectory() &&
      !SKIPPED_DIRECTORIES.has(entry.name) &&
      !entry.name.startsWith('.')
    ) {
      await findManifests(entryPath, depth + 1, manifests)
    }
  }
}

/**
 * Read a dependency version from all package dependency fields.
 * @param {Record<string, unknown>} manifest
 * @param {string} packageName
 * @returns {string | null}
 */
function dependencyVersion(manifest, packageName) {
  for (const field of [
    'dependencies',
    'devDependencies',
    'optionalDependencies',
    'peerDependencies',
  ]) {
    const dependencies = manifest[field]
    if (
      dependencies &&
      typeof dependencies === 'object' &&
      !Array.isArray(dependencies) &&
      typeof dependencies[packageName] === 'string'
    ) {
      return dependencies[packageName]
    }
  }

  return null
}

/**
 * Detect the active build tool from declared dependencies.
 * @param {Record<string, unknown>} manifest
 * @returns {string}
 */
function detectBuildTool(manifest) {
  if (dependencyVersion(manifest, '@rsbuild/core')) return 'rsbuild'
  if (dependencyVersion(manifest, 'vite')) return 'vite'
  return 'not declared'
}

/**
 * Return the explicit package-manager declaration.
 * @param {Record<string, unknown>} manifest
 * @returns {string}
 */
function detectPackageManager(manifest) {
  return typeof manifest.packageManager === 'string'
    ? manifest.packageManager
    : 'not declared'
}

/**
 * Parse one relevant TanStack Start manifest.
 * @param {string} manifestPath
 * @param {string} projectDirectory
 * @returns {Promise<DetectedApp | null>}
 */
async function inspectManifest(manifestPath, projectDirectory) {
  const source = await readFile(manifestPath, 'utf8')
  if (!source.includes('@tanstack/react-start')) return null

  let manifest
  try {
    manifest = JSON.parse(source)
  } catch (error) {
    throw new Error(
      `Invalid TanStack Start package manifest at ${manifestPath}: ${error.message}`,
    )
  }

  const version = dependencyVersion(manifest, '@tanstack/react-start')
  if (!version) return null

  const relativeDirectory = path.relative(projectDirectory, path.dirname(manifestPath))
  return {
    directory: relativeDirectory === '' ? '.' : relativeDirectory,
    version,
    buildTool: detectBuildTool(manifest),
    packageManager: detectPackageManager(manifest),
  }
}

async function main() {
  const projectDirectory = path.resolve(
    process.env.CLAUDE_PROJECT_DIR ?? process.cwd(),
  )
  const manifests = []
  await findManifests(projectDirectory, 0, manifests)

  const apps = []
  for (const manifestPath of manifests) {
    const app = await inspectManifest(manifestPath, projectDirectory)
    if (app) apps.push(app)
  }

  if (apps.length === 0) return

  process.stdout.write(
    `${JSON.stringify({
      plugin: 'superpowers-tanstack-start',
      detectedReactStartApps: apps,
      guidance:
        'Inspect installed APIs and project conventions before changing routes, server boundaries, rendering, or deployment.',
    })}\n`,
  )
}

main().catch((error) => {
  process.stderr.write(`superpowers-tanstack-start hook failed: ${error.message}\n`)
  process.exitCode = 2
})
