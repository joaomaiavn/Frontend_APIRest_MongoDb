// Script de teste E2E simples para verificar renderização das principais rotas da SPA.
// Usa Puppeteer para abrir cada rota e validar se algum dos textos esperados aparece.
// Em caso de falha, captura screenshot para facilitar diagnóstico.

import puppeteer from 'puppeteer'
import fs from 'fs'
import path from 'path'

// BASE_URL pode ser configurada via variável de ambiente E2E_BASE_URL.
// Padrão: aplicação servida pelo backend na porta 3000.
const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:3000'

// Aguarda o servidor ficar disponível antes de iniciar os testes.
// Faz polling em intervalos de 500ms até receber HTTP 200 ou estourar timeout.
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

// Aguarda texto aparecer no innerText do body.
// Retorna quando encontrado ou lança erro após timeout.
async function waitForText(page, text, timeout = 8000) {
  return page.waitForFunction(
    t => document.body && document.body.innerText.includes(t),
    { timeout },
    text
  )
}

// Função principal: inicializa browser, prepara página, configura listener de diálogos
// e itera sobre a lista de rotas a validar.
async function run() {
  await waitForServer(BASE_URL)

  const browser = await puppeteer.launch({ headless: 'new' })
  const page = await browser.newPage()

  // Dismiss qualquer alerta/confirm que possa bloquear a página (ex.: erro ao carregar contato)
  page.on('dialog', async (dialog) => {
    try {
      await dialog.dismiss()
    } catch (_) {}
  })

  // Lista de rotas a validar. Cada item aceita múltiplos textos; basta um deles aparecer.
  const checks = [
    {
      path: '/',
      texts: ['Bem-vindo à Agenda de Contatos', 'Agenda de Contatos']
    },
    {
      path: '/cadastro',
      texts: ['Nome', 'Salvar', 'E-mail', 'Telefone']
    },
    {
      path: '/listagem',
      texts: ['Listagem de Contatos', 'Nenhum contato cadastrado']
    },
    {
      path: '/cadastro/123',
      texts: ['Nome', 'Salvar', 'E-mail', 'Telefone']
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
      const waitUntil = check.path.startsWith('/cadastro/') ? 'domcontentloaded' : 'networkidle0'
      await page.goto(url, { waitUntil })
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
      // Captura screenshot da página atual para diagnóstico da falha.
      try {
        const dir = path.join(process.cwd(), 'screenshots')
        fs.mkdirSync(dir, { recursive: true })
        const sanitized = check.path.replace(/\//g, '_').replace(/^_+/, '') || 'root'
        const filePath = path.join(dir, `fail_${sanitized}.png`)
        await page.screenshot({ path: filePath, fullPage: true })
        console.error(`Screenshot salva em: ${filePath}`)
      } catch (scrErr) {
        console.error('Não foi possível salvar screenshot:', scrErr.message)
      }
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

// Execução protegida para garantir exit code != 0 em caso de erro geral.
run().catch(err => {
  console.error('Erro no teste de rotas:', err)
  process.exit(1)
})
