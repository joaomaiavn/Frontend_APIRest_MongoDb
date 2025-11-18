import puppeteer from 'puppeteer'

const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:3000'

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now()
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url, { method: 'GET' })
      if (res.ok) return true
    } catch (_) {
      // ignore until up
    }
    await new Promise(r => setTimeout(r, 500))
  }
  throw new Error(`Servidor não respondeu em ${timeoutMs}ms: ${url}`)
}

async function waitForText(page, text, timeout = 8000) {
  return page.waitForFunction(
    t => document.body && document.body.innerText.includes(t),
    { timeout },
    text
  )
}

async function run() {
  await waitForServer(BASE_URL)

  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()

  const checks = [
    {
      path: '/',
      texts: ['Bem-vindo à Agenda de Contatos', 'Agenda de Contatos']
    },
    {
      path: '/cadastro',
      texts: ['Nome', 'Salvar']
    },
    {
      path: '/listagem',
      texts: ['Listagem de Contatos', 'Nenhum contato cadastrado']
    },
    {
      path: '/cadastro/123',
      texts: ['Nome', 'Salvar']
    },
    {
      path: '/rota-que-nao-existe',
      texts: ['Página não encontrada']
    },
  ]

  let failed = 0

  for (const check of checks) {
    const url = `${BASE_URL}${check.path}`
    try {
      await page.goto(url, { waitUntil: 'networkidle0' })
      // accept any of the expected texts for this route
      let ok = false
      for (const t of check.texts) {
        try {
          await waitForText(page, t, 6000)
          ok = true
          break
        } catch (_) {
          // try next expected text
        }
      }
      if (!ok) throw new Error(`Conteúdo esperado não encontrado em ${url}`)
      console.log(`✔ Rota OK: ${check.path}`)
    } catch (err) {
      console.error(`✖ Falha na rota ${check.path}:`, err.message)
      failed++
    }
  }

  await browser.close()

  if (failed > 0) {
    console.error(`\n${failed} rota(s) falharam.`)
    process.exit(1)
  } else {
    console.log('\nTodas as rotas renderizaram com sucesso.')
  }
}

run().catch(err => {
  console.error('Erro no teste de rotas:', err)
  process.exit(1)
})
