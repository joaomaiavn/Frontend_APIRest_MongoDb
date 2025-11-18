/* eslint-env node */

// config inicial
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const app = express();

// forma de ler JSON / middlewares
app.use(cors());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

// rotas da API
const personRoutes = require("./routes/personRoutes");

app.use("/person", personRoutes);

// servir arquivos estáticos do build do frontend
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// rotas inicial / endpoint
app.get("/", (req, res) => {
    res.json({ message: "Oi Express!" });
});

// fallback para React Router - servir index.html para rotas não-API
app.get("*", (req, res) => {
    // Não interceptar rotas da API
    if (req.path.startsWith("/person")) {
        return res.status(404).json({ error: "Rota não encontrada" });
    }
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// entregar uma porta

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.zyepshx.mongodb.net/?appName=APICluster`
    )
    .then(() => {
        console.log("Conectado ao MongoDB!");
        app.listen(3000);
    })
    .catch((err) => console.log(err));
