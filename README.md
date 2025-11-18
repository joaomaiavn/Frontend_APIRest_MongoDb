# API Restful CRUD N3

Esta é uma API RESTful desenvolvida em Node.js utilizando Express e MongoDB (Mongoose) para operações CRUD de pessoas.

## Funcionalidades
- **Criar pessoa**: POST `/person`
- **Listar pessoas**: GET `/person`
- **Buscar pessoa por ID**: GET `/person/:id`
- **Atualizar pessoa**: PATCH `/person/:id`
- **Deletar pessoa**: DELETE `/person/:id`

### Campos do recurso `Person`
Os registros possuem os campos abaixo (todos opcionais, exceto `name`):
```json
{
  "name": "João da Silva",        
  "email": "joao@email.com",     
  "phone": "+55 11 99999-9999",  
  "salary": 5000,                 
  "approved": true                
}
```

## Tecnologias
- Node.js
- Express
- MongoDB (Mongoose)
- Jest + Supertest (testes)
- ESLint (análise estática)

## Pré-requisitos
- Node.js 18+ e npm
- Conta/instância MongoDB (Atlas ou local)
- URL de conexão (usuário e senha) para configurar no `.env`

## Clonar o repositório e instalar
Os artefatos gerados (ex.: `node_modules/`, `frontend/dist/`, `coverage/`, `.env`) estão no `.gitignore` e não vêm no repositório. Após clonar, você precisa instalar e (se for o caso) gerar o build novamente.

Clone via HTTPS (ou use SSH se preferir):
```bash
git clone https://github.com/joaomaiavn/Frontend_APIRest_MongoDb.git
cd Frontend_APIRest_MongoDb
```

Instale as dependências da raiz (backend) e do frontend:
```bash
npm install
cd frontend
npm install
cd ..
```

### Instalação recomendada (automática via package.json)
- Sempre prefira usar `npm install` na raiz e dentro de `frontend/`. Isso garante a instalação exata conforme `package.json`/`package-lock.json`.

### Instalação manual dos pacotes (opcional)
Use apenas se estiver reconstruindo do zero sem `node_modules` e quiser instalar pacote a pacote conforme este projeto.

Backend (raiz):
```bash
# Dependências de execução
npm install express mongoose mongodb cors dotenv nodemon

# Dependências de desenvolvimento (testes e lint)
npm install -D jest supertest babel-jest @babel/preset-env eslint eslint-plugin-jest
```

Frontend (`frontend/`):
```bash
cd frontend
# Dependências de execução
npm install react@^18 react-dom@^18 react-router-dom@^7 react-router@^7 bootstrap bootstrap-icons

# Dependências de desenvolvimento (build, lint e e2e)
npm install -D vite@^7 eslint eslint-plugin-react puppeteer
```

Observação: após a instalação manual, confirme que os scripts funcionam:
```bash
# raiz
npm start

# frontend (dev)
cd frontend
npm run dev
```

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

Observações importantes sobre o `.gitignore`:
- `node_modules/`, `frontend/dist/`, `coverage/` e `.env` não são versionados.
- Após clonar, sempre rode `npm install` (raiz e `frontend/`). Para produção, gere o build com `npm run build` dentro de `frontend/`.

### Rotas do SPA
- `/` (Home)
- `/cadastro` (Criar contato — Nome, E-mail, Telefone, Salário, Aprovado)
- `/cadastro/:id` (Editar contato — Nome, E-mail, Telefone, Salário, Aprovado)
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
