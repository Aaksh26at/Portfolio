// Test the browser event queue without loading Google or sending real events.
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const assert = require('node:assert/strict')
const ts = require('typescript')

const file = path.join(__dirname, '../lib/analytics.ts')
const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText
function load(id, browser = true) {
  const sandbox = { exports: {}, process: { env: { NEXT_PUBLIC_GA_ID: id } } }
  if (browser) sandbox.window = {}
  vm.runInNewContext(source, sandbox, { filename: file })
  return { api: sandbox.exports, window: sandbox.window }
}

for (const id of ['', undefined, 'UA-123456', "G-ABC123';alert(1)//"]) {
  const { api, window } = load(id)
  api.track('resume_download')
  assert.equal(api.GA_ID, '')
  assert.equal(window.dataLayer, undefined)
}
assert.doesNotThrow(() => load('G-ABC1234567', false).api.track('resume_download'))
const { api, window } = load(' G-ABC1234567 ')
api.track('resume_download', { email: 'private@example.com', message: 'private message' })
assert.equal(window.dataLayer.length, 3, 'Early click must queue after js and config')
assert.equal(window.dataLayer[1][0], 'config')
assert.equal(window.dataLayer[1][1], 'G-ABC1234567')
assert.equal(window.dataLayer[1][2].allow_google_signals, false)
assert.equal(window.dataLayer[2][1], 'resume_download')
assert.equal(window.dataLayer[2][2].file_name, 'aakshat-agarwal.pdf')
assert.equal(window.dataLayer[2][2].transport_type, 'beacon')
const slugs = ['kalash-accounts', 'next-move-job-agent']
api.trackProjectRoute('/', slugs)
api.trackProjectRoute('/projects/kalash-accounts', slugs)
api.trackProjectRoute('/projects/kalash-accounts', slugs)
assert.equal(window.dataLayer.filter(item => item[1] === 'project_view').length, 1, 'Repeated effects must not double-count')
api.trackProjectRoute('/projects/unknown', slugs)
assert.equal(window.dataLayer.filter(item => item[1] === 'project_view').length, 1, 'Unknown routes must not count')
api.trackProjectRoute('/projects/next-move-job-agent', slugs)
api.trackProjectRoute('/', slugs)
api.trackProjectRoute('/projects/kalash-accounts', slugs)
assert.equal(window.dataLayer.filter(item => item[1] === 'project_view').length, 3, 'Returning to a project is another view')
api.track('contact_submit', { name: 'Private Name', email: 'private@example.com', subject: 'Private Subject', message: 'private message' })
const last = window.dataLayer.at(-1)
assert.equal(last[1], 'contact_submit')
assert.equal(last[2].form_id, 'portfolio_contact')
assert.equal(last[2].send_to, 'G-ABC1234567')
const serialized = JSON.stringify(window.dataLayer)
for (const secret of ['Private Name', 'private@example.com', 'Private Subject', 'private message']) assert(!serialized.includes(secret))
assert.equal(window.dataLayer.filter(item => item[0] === 'config').length, 1, 'Configure Google once per document')
console.log('PASS: disabled/invalid setup, server rendering, early event queue, project-route counting, repeat-effect deduplication and contact-data exclusion')
