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

// servir arquivos estáticos do frontend build
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// rotas inicial / endpoint
app.get("/", (req, res) => {
    res.json({ message: "Oi Express!" });
});

// fallback para SPA - retorna index.html para todas as rotas não-API
app.use((req, res) => {
    const indexPath = path.join(__dirname, "frontend", "dist", "index.html");
    res.sendFile(indexPath, (err) => {
        if (err) {
            res.status(404).json({ message: "Frontend não encontrado. Execute 'npm run build' na pasta frontend." });
        }
    });
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
