# Guia de Teste - React + Bootstrap Frontend

Este documento descreve como testar a integração do frontend React com a API Express.

## Pré-requisitos

- Node.js instalado (versão 14+)
- MongoDB em execução (ou credenciais configuradas no .env)
- Dependências instaladas no backend e frontend

## Instalação

### Backend
```bash
# Na raiz do projeto
npm install
```

### Frontend
```bash
# Na pasta frontend
cd frontend
npm install
```

## Modo de Desenvolvimento

O modo de desenvolvimento permite hot reload no frontend e CORS habilitado para comunicação entre servidores.

### 1. Iniciar o Backend (Terminal 1)

```bash
# Na raiz do projeto
npm start
```

O backend estará rodando em `http://localhost:3000`

**Endpoints da API disponíveis:**
- `GET /person` - Lista todas as pessoas
- `POST /person` - Cria uma nova pessoa
- `GET /person/:id` - Busca pessoa por ID
- `PATCH /person/:id` - Atualiza pessoa
- `DELETE /person/:id` - Remove pessoa

### 2. Iniciar o Frontend (Terminal 2)

```bash
# Na pasta frontend
cd frontend
npm run dev
```

O frontend estará rodando em `http://localhost:5173`

### 3. Testar a Aplicação

Abra o navegador em `http://localhost:5173`

**Testes a realizar:**

#### Página Home (/)
- ✅ Verificar se a navbar aparece corretamente
- ✅ Verificar se os cards de navegação estão visíveis
- ✅ Clicar em "Ir para Cadastro" deve navegar para /cadastro
- ✅ Clicar em "Ir para Listagem" deve navegar para /listagem

#### Página Cadastro (/cadastro)
- ✅ Preencher apenas o nome e enviar (deve funcionar)
- ✅ Tentar enviar sem nome (deve mostrar erro)
- ✅ Preencher nome, salário e marcar aprovado
- ✅ Enviar formulário (deve mostrar mensagem de sucesso)
- ✅ Verificar se o formulário é limpo após sucesso
- ✅ Abrir DevTools Network e verificar chamada POST para http://localhost:3000/person

#### Página Listagem (/listagem)
- ✅ Verificar se a tabela carrega os dados
- ✅ Verificar formatação do salário (R$ X.XXX,XX)
- ✅ Verificar badges "Sim"/"Não" para aprovado
- ✅ Clicar em "Atualizar" para recarregar os dados
- ✅ Abrir DevTools Network e verificar chamada GET para http://localhost:3000/person

#### Navegação
- ✅ Clicar nos links da navbar para navegar entre páginas
- ✅ Usar botões de voltar/avançar do navegador
- ✅ Atualizar página em qualquer rota (deve manter a rota)

#### CORS
- ✅ Abrir DevTools Console
- ✅ Não deve haver erros de CORS
- ✅ Requisições para localhost:3000 devem funcionar

## Modo de Produção

No modo de produção, o Express serve os arquivos estáticos do build do React.

### 1. Fazer Build do Frontend

```bash
# Na pasta frontend
cd frontend
npm run build
```

Isso cria a pasta `frontend/dist` com os arquivos otimizados.

### 2. Iniciar o Backend

```bash
# Na raiz do projeto
npm start
```

### 3. Testar a Aplicação

Abra o navegador em `http://localhost:3000`

**Testes a realizar:**

#### Servindo Arquivos Estáticos
- ✅ Acessar http://localhost:3000 deve carregar a aplicação React
- ✅ Acessar http://localhost:3000/cadastro diretamente deve funcionar
- ✅ Acessar http://localhost:3000/listagem diretamente deve funcionar
- ✅ Atualizar qualquer página deve manter a rota (fallback funcionando)

#### API Funcionando
- ✅ Cadastrar pessoa deve funcionar
- ✅ Listar pessoas deve funcionar
- ✅ Chamadas são feitas para /person (mesmo domínio)

#### Performance
- ✅ Verificar no DevTools que arquivos CSS e JS estão minificados
- ✅ Verificar que imagens/assets são servidos corretamente

## Testes Automatizados

### Backend

```bash
# Na raiz do projeto
npm test
```

Testa os endpoints da API com 14 casos de teste.

### Lint

```bash
# Na raiz do projeto
npm run lint
```

Verifica o código backend (frontend é ignorado pelo ESLint).

## Troubleshooting

### CORS Error no Desenvolvimento
- Verificar se o backend está rodando em localhost:3000
- Verificar se `app.use(cors())` está presente no server.js
- Verificar se o frontend está fazendo requests para a URL correta

### 404 em Produção
- Verificar se o build foi gerado (`frontend/dist` existe)
- Verificar se o fallback está configurado corretamente no server.js
- Verificar se o path está correto no express.static

### Página em Branco
- Abrir DevTools Console para ver erros
- Verificar se os arquivos JS/CSS estão sendo carregados
- Verificar se há erro 404 para assets

### Dados Não Carregam
- Verificar se MongoDB está conectado (ver logs do backend)
- Verificar se há pessoas cadastradas no banco
- Verificar Network tab do DevTools para ver status das requisições

## Estrutura de URLs

### Desenvolvimento
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- API Endpoints: http://localhost:3000/person

### Produção
- Tudo em: http://localhost:3000
- Frontend: http://localhost:3000/
- API Endpoints: http://localhost:3000/person

## Checklist Final

Antes de considerar a feature completa, verificar:

- [ ] Backend inicia sem erros
- [ ] Frontend build sem erros
- [ ] Todos os testes do backend passam
- [ ] Lint sem erros
- [ ] CORS funciona em desenvolvimento
- [ ] Cadastro de pessoa funciona
- [ ] Listagem de pessoas funciona
- [ ] Navegação entre páginas funciona
- [ ] Refresh de página mantém a rota
- [ ] Produção serve frontend corretamente
- [ ] Sem vulnerabilidades críticas
- [ ] README atualizado
