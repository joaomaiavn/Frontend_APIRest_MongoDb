# Frontend - Person CRUD

Frontend em React com Bootstrap para o sistema de gerenciamento de pessoas.

## Tecnologias

- React 19
- Vite
- Bootstrap 5
- React Router DOM

## Estrutura do Projeto

```
src/
├── pages/          # Páginas da aplicação
│   ├── Home.jsx    # Página inicial
│   ├── Cadastro.jsx # Formulário de cadastro
│   └── Listagem.jsx # Lista de pessoas
├── api.js          # Funções para comunicação com API
├── App.jsx         # Componente principal com rotas
├── main.jsx        # Entry point
└── styles.css      # Estilos customizados
```

## Como Executar

### Modo Desenvolvimento

1. Certifique-se de que o backend está rodando em `http://localhost:3000`

2. Instale as dependências (se ainda não instalou):
   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

4. Acesse `http://localhost:5173` no navegador

### Build para Produção

1. Gere o build de produção:
   ```bash
   npm run build
   ```

2. Os arquivos otimizados serão gerados na pasta `dist/`

3. Para servir os arquivos, o backend (na raiz do projeto) já está configurado para servir a pasta `dist/`

### Preview do Build

Para testar o build localmente antes de deployar:

```bash
npm run preview
```

## Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera o build de produção
- `npm run preview` - Preview do build de produção
- `npm run lint` - Executa o ESLint

## Páginas

### Home
Página inicial com apresentação do sistema e suas funcionalidades.

### Cadastro
Formulário para cadastrar novas pessoas com os campos:
- **Nome** (obrigatório)
- **Salário** (opcional)
- **Aprovado** (checkbox)

### Listagem
Lista todas as pessoas cadastradas com opções para:
- Visualizar informações (nome, salário formatado, status de aprovação)
- Deletar registros
- Recarregar a lista

## API

O frontend se comunica com a API REST em `http://localhost:3000/person` usando os seguintes endpoints:

- `GET /person` - Lista todas as pessoas
- `POST /person` - Cria nova pessoa
- `PATCH /person/:id` - Atualiza pessoa
- `DELETE /person/:id` - Deleta pessoa

## Observações

- O CORS está habilitado no backend para permitir requisições do frontend em desenvolvimento
- Em produção, o Express serve os arquivos estáticos do build automaticamente
- Todas as rotas do React Router são suportadas graças ao fallback configurado no backend
