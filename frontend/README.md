# Frontend - API REST

Este é o frontend em React para a API REST de gerenciamento de pessoas.

## Tecnologias

- **React** 18.2.0
- **React Router DOM** 6.20.0
- **Bootstrap** 5.3.2
- **Vite** 5.0.8

## Funcionalidades

O frontend possui 3 páginas principais:

1. **Home**: Apresentação do aplicativo e links para as outras páginas
2. **Cadastro**: Formulário para cadastrar novas pessoas com campos:
   - Nome (obrigatório)
   - Salário (obrigatório, número)
   - Aprovado (checkbox, opcional)
3. **Listagem**: Exibe todas as pessoas cadastradas em uma tabela com opção de deletar

## Como rodar em modo desenvolvimento

### Pré-requisitos

- Node.js instalado
- Backend rodando em `http://localhost:3000`

### Passos

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Acesse no navegador: `http://localhost:5173`

O servidor de desenvolvimento irá recarregar automaticamente quando você fizer alterações no código.

## Como gerar o build de produção

1. Gere o build:
   ```bash
   npm run build
   ```

   Os arquivos serão gerados na pasta `dist/`

2. (Opcional) Para testar o build localmente:
   ```bash
   npm run preview
   ```

   Isso irá servir o build em `http://localhost:4173`

## Como servir via Express (Backend)

Após gerar o build (`npm run build`), o backend já está configurado para servir os arquivos estáticos.

1. Certifique-se de que o build foi gerado em `frontend/dist/`

2. Inicie o servidor backend:
   ```bash
   cd ..
   npm start
   ```

3. Acesse o frontend através do backend em: `http://localhost:3000`

O Express irá:
- Servir os arquivos estáticos da pasta `frontend/dist`
- Responder às rotas da API em `/person`
- Fazer fallback para `index.html` para rotas do React Router

## Estrutura de pastas

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx          # Página inicial
│   │   ├── Cadastro.jsx      # Formulário de cadastro
│   │   └── Listagem.jsx      # Lista de pessoas
│   ├── App.jsx               # Componente principal com rotas
│   ├── main.jsx              # Entry point
│   └── api.js                # Funções de integração com API
├── index.html                # Template HTML
├── vite.config.js            # Configuração do Vite
├── package.json              # Dependências
└── README.md                 # Este arquivo
```

## API Integration

O frontend consome a API REST em `http://localhost:3000/person` com os seguintes endpoints:

- **GET** `/person` - Lista todas as pessoas
- **POST** `/person` - Cria uma nova pessoa
- **DELETE** `/person/:id` - Deleta uma pessoa

O arquivo `src/api.js` contém as funções para consumir a API.

## Validações

O formulário de cadastro possui validações:
- Nome é obrigatório
- Salário é obrigatório e deve ser maior que zero
- Mensagens de erro são exibidas quando a validação falha

## Estilização

O projeto usa Bootstrap 5 para estilização, incluindo:
- Navbar responsivo
- Cards e alertas
- Formulários estilizados
- Tabelas responsivas
- Botões e badges

## Desenvolvimento

Durante o desenvolvimento, o CORS está habilitado no backend para permitir requisições do frontend rodando em `http://localhost:5173`.

## Notas

- Certifique-se de que o backend está rodando antes de iniciar o frontend
- Em produção, o frontend é servido pelo mesmo servidor Express que a API
- Todos os node_modules e arquivos de build estão no `.gitignore`
