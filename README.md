# API Restful CRUD N3

Esta é uma API RESTful desenvolvida em Node.js utilizando Express e MongoDB (Mongoose) para operações CRUD de pessoas, com frontend em React.

## Funcionalidades

### Backend (API)
- **Criar pessoa**: POST `/person`
- **Listar pessoas**: GET `/person`
- **Buscar pessoa por ID**: GET `/person/:id`
- **Atualizar pessoa**: PATCH `/person/:id`
- **Deletar pessoa**: DELETE `/person/:id`

### Frontend (React)
- **Home**: Página inicial com apresentação do sistema
- **Cadastro**: Formulário para cadastrar pessoas (nome, salário, status de aprovação)
- **Listagem**: Visualização de todas as pessoas cadastradas com opção de deletar

## Tecnologias

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- CORS
- Jest + Supertest (testes)
- ESLint (análise estática)

### Frontend
- React 18
- React Router DOM
- Bootstrap 5
- Vite (bundler)

## Como rodar o projeto

### Backend (API)

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
   O servidor estará rodando em `http://localhost:3000`

### Frontend (Desenvolvimento)

1. Navegue até a pasta do frontend:
   ```bash
   cd frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
   O frontend estará disponível em `http://localhost:5173`

### Frontend (Produção)

1. Gere o build do frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Inicie o servidor backend (que servirá o frontend):
   ```bash
   cd ..
   npm start
   ```
3. Acesse o sistema completo em `http://localhost:3000`

O servidor Express servirá automaticamente os arquivos estáticos do frontend gerados em `frontend/dist`.

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
frontend/       # Aplicação React
  ├── src/
  │   ├── pages/     # Páginas da aplicação
  │   ├── App.jsx    # Componente principal
  │   ├── main.jsx   # Entry point
  │   └── api.js     # Integração com API
  ├── dist/          # Build de produção (gerado)
  └── package.json   # Dependências do frontend
server.js       # Arquivo principal do backend
package.json    # Dependências do backend
```

## Cobertura de Testes
- O projeto possui mais de 80% de cobertura de testes, incluindo cenários de sucesso e erro para todas as rotas.

## CORS
- O backend está configurado com CORS habilitado para permitir requisições do frontend durante o desenvolvimento.

## Documentação Adicional
- Para mais informações sobre o frontend, consulte [frontend/README.md](frontend/README.md)

## Autor
João Maia

---
Projeto para estudos e demonstração de API RESTful com Node.js e React.

