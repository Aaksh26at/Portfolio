// Offline security and persistence regressions. No live services or real secrets.
const fs = require('node:fs')
const path = require('node:path')
const vm = require('node:vm')
const assert = require('node:assert/strict')
const ts = require('typescript')
const root = path.resolve(__dirname, '..')
const env = { NODE_ENV: 'production' }
let cookieValue
let fetchImpl = async () => { throw new Error('Unexpected network request') }
const modules = new Map()
function load(file) {
  const full = path.join(root, file)
  if (modules.has(full)) return modules.get(full).exports
  const mod = { exports: {} }; modules.set(full, mod)
  const source = ts.transpileModule(fs.readFileSync(full, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText
  const customRequire = id => {
    if (id === 'server-only') return {}
    if (id === 'react') return { cache: fn => fn }
    if (id === 'next/headers') return { cookies: async () => ({ get: () => cookieValue ? { value: cookieValue } : undefined }) }
    if (id.startsWith('@/')) return load(id.slice(2) + '.ts')
    if (id.startsWith('.')) return load(path.relative(root,path.resolve(path.dirname(full), id + '.ts')))
    return require(id)
  }
  vm.runInNewContext(source, { exports: mod.exports, require: customRequire, process: { env }, Request, Response, Headers, URL, Buffer, AbortSignal, structuredClone, Date, console: { warn() {} }, fetch: (...args) => fetchImpl(...args) }, { filename: full })
  return mod.exports
}
const auth = load('lib/admin-auth.ts'), content = load('lib/admin-content.ts'), store = load('lib/admin-store.ts')
const login = load('app/api/admin/login/route.ts'), dataRoute = load('app/api/admin/content/route.ts'), inbox = load('app/api/admin/messages/route.ts')
function request(route, method, body, origin = 'https://www.aakshat.in') {
  return new Request('https://www.aakshat.in/api/admin/' + route, { method, headers: { 'Content-Type': 'application/json', Origin: origin }, ...(method === 'GET' ? {} : { body: JSON.stringify(body) }) })
}
let checks = 0
function check(value, message) { assert(value, message); checks++ }
async function main() {
  check(!auth.validSession('anything'), 'Unconfigured admin must stay locked')
  check((await login.POST(request('login','POST',{password:'x'}))).status === 503)
  check((await dataRoute.GET(request('content','GET'))).status === 401)
  check((await inbox.GET(request('messages','GET'))).status === 401)
  env.PORTFOLIO_ADMIN_PASSWORD = 'offline-test-password-123456'
  env.PORTFOLIO_ADMIN_SESSION_SECRET = 'offline-test-secret-12345678901234567890'
  env.PORTFOLIO_SUPABASE_URL = 'https://example.supabase.co'
  env.PORTFOLIO_SUPABASE_SERVICE_ROLE_KEY = 'offline-test-only'
  check(auth.checkPassword(env.PORTFOLIO_ADMIN_PASSWORD))
  check(!auth.checkPassword('wrong-password'))
  const session = auth.createSession()
  check(auth.validSession(session))
  check(!auth.validSession(session + 'tampered'))
  check(!auth.validSession('not-json.bad-signature'))
  check(auth.sameOrigin(new Request('http://localhost:3011/api/admin/login', { headers: { host: '127.0.0.1:3011', origin: 'http://127.0.0.1:3011' } })))
  check(!auth.sameOrigin(new Request('http://localhost:3011/api/admin/login', { headers: { host: 'www.aakshat.in', origin: 'https://attacker.example', 'x-forwarded-host': 'attacker.example' } })))
  env.PORTFOLIO_ADMIN_PASSWORD += '-rotated'
  check(!auth.validSession(session), 'Rotating the password invalidates sessions')
  check((await login.POST(request('login','POST',{password:env.PORTFOLIO_ADMIN_PASSWORD},'https://attacker.example'))).status === 403)
  fetchImpl = async () => Response.json(false)
  check((await login.POST(request('login','POST',{password:env.PORTFOLIO_ADMIN_PASSWORD}))).status === 429)
  fetchImpl = async () => Response.json(true)
  check((await login.POST(request('login','POST',{password:'wrong'}))).status === 401)
  const signedIn = await login.POST(request('login','POST',{password:env.PORTFOLIO_ADMIN_PASSWORD}))
  check(signedIn.status === 200)
  const cookie = signedIn.headers.get('set-cookie')
  check(cookie.includes('HttpOnly') && cookie.includes('Secure') && cookie.includes('SameSite=strict'))
  cookieValue = auth.createSession()
  check((await dataRoute.PUT(request('content','PUT',{content:content.defaultContent, revision:0},'https://attacker.example'))).status === 403)
  const valid = content.validateContent(structuredClone(content.defaultContent))
  check(valid.projects.length > 0, 'Built-in content must be saveable')
  let invalid = structuredClone(valid); invalid.projects[0].links.demo = 'javascript:alert(1)'
  assert.throws(() => content.validateContent(invalid), /https/); checks++
  invalid = structuredClone(valid); invalid.projects.push(invalid.projects[0])
  assert.throws(() => content.validateContent(invalid), /unique/); checks++
  invalid = structuredClone(valid); invalid.profile.email = 'bad-address'
  assert.throws(() => content.validateContent(invalid), /email/); checks++
  const draft = structuredClone(valid); draft.projects[0].published = false; draft.projects[0].problem = ''
  check(content.validateContent(draft).projects[0].problem === '', 'Incomplete drafts can be saved')
  draft.projects[0].published = true
  assert.throws(() => content.validateContent(draft)); checks++
  fetchImpl = async () => Response.json(null)
  check((await dataRoute.PUT(request('content','PUT',{content:valid, revision:2}))).status === 409, 'Do not overwrite a concurrent save')
  fetchImpl = async (url, options) => { check(url.endsWith('rpc/portfolio_save_content')); const payload = JSON.parse(options.body); check(payload.expected_revision === 2); return Response.json({ revision:3, updated_at:'2026-11-19T00:00:00Z' }) }
  check((await dataRoute.PUT(request('content','PUT',{content:valid, revision:2}))).status === 200)
  fetchImpl = async () => Response.json([{id:'example-message'}])
  check(await store.saveMessage({name:'Visitor',email:'visitor@example.com',subject:'Role',message:'Hello'}) === 'example-message')
  cookieValue = undefined
  check((await inbox.PATCH(request('messages','PATCH',{id:'x',status:'read'}))).status === 401)
  console.log(`PASS: ${checks} admin checks; locked defaults, cookie signing, password rotation, origin checks, rate limits, content validation, draft rules, inbox protection and concurrent saves.`)
}
main().catch(e => { console.error(e); process.exitCode = 1 })
