# Frontend (React + Bootstrap)

Como usar:

1. No diretório frontend, instale dependências:
   npm install

2. Para desenvolvimento (Vite):
   npm run dev
   - Acesse http://localhost:5173 (padrão do Vite).

3. Para build de produção:
   npm run build
   - Os arquivos serão gerados em frontend/dist

4. Para servir em produção junto ao backend:
   - Rode npm run build
   - Coloque o diretório frontend/dist no repositório (ou mantenha em frontend/dist)
   - O servidor Express (server.js) será ajustado para servir esses arquivos (ver instruções no README principal).

Observação:
- A API backend deve estar rodando em http://localhost:3000.
- Para desenvolvimento, o backend deve permitir CORS (server.js está preparado para isso).
