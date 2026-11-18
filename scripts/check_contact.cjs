// Exercise the real route with a mocked provider. Never sends an email.
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const assert = require('node:assert/strict')
const ts = require('typescript')

const file = path.join(__dirname, '../app/api/contact/route.ts')
const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText
const env = {}
let fetchCalls = []
let provider = async () => Response.json({ id: 'test-message-id' })
const sandbox = {
  exports: {}, require, Request, Response, Uint8Array, TextDecoder, AbortSignal,
  process: { env }, console: { warn() {} },
  fetch: async (...args) => { fetchCalls.push(args); return provider(...args) },
}
vm.runInNewContext(source, sandbox, { filename: file })
const valid = { name: 'Test visitor', email: 'visitor@example.com', subject: 'Python role', message: 'A contact form test.', company: '' }
let checks = 0
async function post(payload, expected, raw = false) {
  fetchCalls = []
  const response = await sandbox.exports.POST(new Request('https://www.aakshat.in/api/contact', {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: raw ? payload : JSON.stringify(payload),
  }))
  assert.equal(response.status, expected)
  checks++
  return response.json()
}

async function main() {
  assert.equal((await post(valid, 200)).reason, 'not_configured')
  assert.equal(fetchCalls.length, 0)
  for (const payload of [null, [], 3, 'text']) await post(payload, 400)
  await post('{bad json', 400, true)
  for (const payload of [
    { ...valid, name: {} }, { ...valid, email: 'bad' }, { ...valid, message: '' },
    { ...valid, subject: 'Header\r\nInjection' }, { ...valid, name: 'x'.repeat(121) },
    { ...valid, message: 'x'.repeat(5001) },
  ]) { await post(payload, 422); assert.equal(fetchCalls.length, 0) }
  await post('x'.repeat(32769), 413, true)
  env.RESEND_API_KEY = 'test-secret-not-real'
  env.CONTACT_FROM_EMAIL = 'Portfolio <contact@example.com>'
  env.CONTACT_TO_EMAIL = 'owner@example.com'
  assert.equal((await post({ ...valid, company: 'bot' }, 200)).accepted, true)
  assert.equal(fetchCalls.length, 0)
  assert.equal((await post({ ...valid, name: '<script>name</script>', message: '<b>hello</b>\nNext line' }, 200)).accepted, true)
  assert.equal(fetchCalls.length, 1)
  const options = fetchCalls[0][1]
  const email = JSON.parse(options.body)
  assert.deepEqual(email.to, ['owner@example.com'])
  assert.equal(email.reply_to, valid.email)
  assert(email.html.includes('&lt;script&gt;name&lt;/script&gt;'))
  assert(email.html.includes('&lt;b&gt;hello&lt;/b&gt;<br/>Next line'))
  assert(!email.html.includes('<script>'))
  assert(email.text.includes('<b>hello</b>'))
  assert(options.signal instanceof AbortSignal)
  provider = async () => Response.json({ error: 'rejected' }, { status: 403 })
  assert.equal((await post(valid, 200)).reason, 'provider_error')
  provider = async () => { throw new Error('network uncertainty') }
  assert.equal((await post(valid, 200)).reason, 'delivery_uncertain')
  assert.equal(fetchCalls.length, 1, 'Do not retry an uncertain email send')
  provider = async () => Response.json({})
  assert.equal((await post(valid, 200)).reason, 'delivery_uncertain')
  console.log(`PASS: ${checks} contact-route cases; validation, size limits, bot field, email escaping, reply-to and provider failure handling`)
}
main().catch(error => { console.error(error); process.exitCode = 1 })
