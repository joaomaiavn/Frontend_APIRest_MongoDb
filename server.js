/* eslint-env node */

// config inicial
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

// middlewares: leitura de body
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Habilitar CORS para desenvolvimento (front-end em outra porta)
app.use(cors());

// rotas da API
const personRoutes = require("./routes/personRoutes");
app.use("/person", personRoutes);

// rota inicial / endpoint — se o build do frontend existir, servir index.html,
// caso contrário, retornar uma resposta JSON simples (útil para ambiente sem build).
app.get("/", (req, res) => {
  const indexPath = path.join(frontendDist, "index.html");
  res.sendFile(indexPath, (err) => {
    if (err) {
      // se não existir o build, responder com JSON
      res.json({ message: "Oi Express!" });
    }
  });
});

// servir frontend build em produção, se existir
const frontendDist = path.join(__dirname, "frontend", "dist");
app.use(express.static(frontendDist));

app.get(/.*/, (req, res, next) => {
  // se a rota começar com /person, passa para as rotas da API
  if (req.path.startsWith("/person")) return next();
  // senão, tenta servir index.html do build (se existir)
  const indexPath = path.join(frontendDist, "index.html");
  res.sendFile(indexPath, err => {
    if (err) {
      // se não existir, respondemos com mensagem padrão (ou 404)
      res.status(404).json({ message: "Not found" });
    }
  });
});

// conectar ao MongoDB e iniciar servidor
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.zyepshx.mongodb.net/?appName=APICluster`
  )
  .then(() => {
    console.log("Conectado ao MongoDB!");
    app.listen(3000, () => console.log("Server rodando na porta 3000"));
  })
  .catch((err) => console.log(err));
