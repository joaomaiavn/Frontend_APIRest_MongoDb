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
server.js       # Arquivo principal
package.json    # Configurações do projeto
```

## Cobertura de Testes
- O projeto possui mais de 80% de cobertura de testes, incluindo cenários de sucesso e erro para todas as rotas.

## Autor
João Maia

---
Projeto para estudos e demonstração de API RESTful com Node.js.
