# API Restful CRUD N3

Esta é uma API RESTful desenvolvida em Node.js utilizando Express e MongoDB (Mongoose) para operações CRUD de pessoas.

## Funcionalidades
- **Criar pessoa**: POST `/person`
- **Listar pessoas**: GET `/person`
- **Buscar pessoa por ID**: GET `/person/:id`
- **Atualizar pessoa**: PATCH `/person/:id`
- **Deletar pessoa**: DELETE `/person/:id`

## Tecnologias
- Node.js
- Express
- MongoDB (Mongoose)
- Jest + Supertest (testes)
- ESLint (análise estática)

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Configure o arquivo `.env` com suas credenciais do MongoDB:
   ```env
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   ```
3. Inicie o servidor:
   ```bash
   npm start
   ```

## Frontend (React + Vite)
- Código do frontend está em `frontend/`.
- Em desenvolvimento, use o servidor do Vite; em produção, o backend serve o build de `frontend/dist`.

### Desenvolvimento
```bash
cd frontend
npm install
npm run dev
```
O app abrirá (por padrão) em `http://localhost:5173`. Para a API, configure o `.env` do Vite (opcional):
```
VITE_API_URL=http://localhost:3000
```

### Build de produção e servir pelo backend
```bash
cd frontend
npm run build
```
Isso gera `frontend/dist`. Com o servidor backend iniciado (`npm start` na raiz), acesse `http://localhost:3000/` para ver o SPA.

### Rotas do SPA
- `/` (Home)
- `/cadastro` (Criar contato)
- `/cadastro/:id` (Editar contato)
- `/listagem` (Listar contatos)
- Rota inválida → exibe página de 404 do SPA

## Testes e Cobertura
- Para rodar os testes:
  ```bash
  npm test
  ```
- Para gerar o relatório de cobertura:
  ```bash
  npm run test:coverage
  ```
  O relatório estará em `coverage/lcov-report/index.html`.

### Teste headless das rotas do frontend
Há um teste E2E simples com navegador headless (Puppeteer) para validar as rotas do SPA já servidas pelo backend.

1) Garanta que o backend esteja rodando e sirva o build do frontend (ou use `VITE_API_URL` apontando para o backend):
```bash
npm start
```

2) Em outro terminal, no diretório `frontend`, instale dependências e rode o teste:
```bash
cd frontend
npm install
npm run build   # se ainda não gerou o dist
npm run test:routes
```
O script acessa `http://localhost:3000` por padrão. Para alterar, defina `E2E_BASE_URL`:
```bash
E2E_BASE_URL=http://localhost:4000 npm run test:routes
```

## Padrões de Código
- O projeto utiliza ESLint para garantir boas práticas de código.
- Para rodar a análise estática:
  ```bash
  npm run lint
  ```

## Estrutura de Pastas
```
models/         # Modelos Mongoose
routes/         # Rotas da API
server.js       # Arquivo principal
package.json    # Configurações do projeto
```

## Cobertura de Testes
- O projeto possui mais de 80% de cobertura de testes, incluindo cenários de sucesso e erro para todas as rotas.

## Autor
João Maia

---
Projeto para estudos e demonstração de API RESTful com Node.js.
