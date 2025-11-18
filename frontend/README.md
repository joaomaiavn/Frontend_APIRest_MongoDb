# Frontend - React + Vite + Bootstrap

Este é o frontend da aplicação API Rest MongoDB, desenvolvido com React, Vite e Bootstrap.

## Tecnologias Utilizadas

- **React 18**: Biblioteca JavaScript para construção de interfaces
- **Vite**: Ferramenta de build rápida e moderna
- **Bootstrap 5**: Framework CSS para design responsivo
- **React Router DOM**: Roteamento de páginas no React

## Instalação

1. Navegue até a pasta frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

## Execução em Modo Desenvolvimento

Para executar o frontend em modo de desenvolvimento (com hot reload):

```bash
npm run dev
```

O servidor de desenvolvimento será iniciado em `http://localhost:5173`

**Importante**: Certifique-se de que o backend está rodando em `http://localhost:3000` para que as requisições da API funcionem corretamente.

## Build para Produção

Para gerar o build otimizado para produção:

```bash
npm run build
```

Os arquivos gerados estarão na pasta `dist/` e podem ser servidos pelo Express na aplicação backend.

## Preview do Build

Para visualizar o build de produção localmente:

```bash
npm run preview
```

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Home.jsx          # Página inicial
│   │   ├── Cadastro.jsx      # Formulário de cadastro
│   │   └── Listagem.jsx      # Listagem de pessoas
│   ├── api.js                # Funções de integração com a API
│   ├── App.jsx               # Componente principal com rotas
│   ├── main.jsx              # Ponto de entrada da aplicação
│   └── styles.css            # Estilos customizados
├── index.html                # Template HTML
├── vite.config.js            # Configuração do Vite
└── package.json              # Dependências e scripts
```

## Funcionalidades

- **Home**: Página inicial com informações sobre a aplicação
- **Cadastro**: Formulário para adicionar novas pessoas (name, salary, approved)
- **Listagem**: Tabela com todas as pessoas cadastradas

## Integração com a API

O frontend se comunica com a API REST em `http://localhost:3000/person`:

- `GET /person` - Lista todas as pessoas
- `POST /person` - Cria uma nova pessoa

## Rodando em Produção com Express

Após gerar o build (`npm run build`), o Express servirá os arquivos estáticos automaticamente. Basta iniciar o backend:

```bash
cd ..
npm start
```

Acesse a aplicação em `http://localhost:3000`
