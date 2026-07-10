import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
)
const hookPath = path.join(repositoryRoot, 'hooks', 'session-start.mjs')
const fixturesPath = path.join(repositoryRoot, 'tests', 'fixtures')

function runFixture(name) {
  return spawnSync(process.execPath, [hookPath], {
    cwd: repositoryRoot,
    env: {
      ...process.env,
      CLAUDE_PROJECT_DIR: path.join(fixturesPath, name),
    },
    encoding: 'utf8',
  })
}

test('reports a React Start Vite application', () => {
  const result = runFixture('react-vite')

  assert.equal(result.status, 0, result.stderr)
  const output = JSON.parse(result.stdout)
  assert.equal(output.plugin, 'superpowers-tanstack-start')
  assert.deepEqual(output.detectedReactStartApps, [
    {
      directory: '.',
      version: '^1.168.27',
      buildTool: 'vite',
      packageManager: 'pnpm@10.12.1',
    },
  ])
})

test('stays silent outside a React Start application', () => {
  const result = runFixture('not-start')

  assert.equal(result.status, 0, result.stderr)
  assert.equal(result.stdout, '')
  assert.equal(result.stderr, '')
})

test('fails explicitly for an invalid relevant manifest', () => {
  const result = runFixture('invalid-start')

  assert.equal(result.status, 2)
  assert.match(result.stderr, /Invalid TanStack Start package manifest/)
  assert.equal(result.stdout, '')
})
