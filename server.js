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

// rotas inicial / endpoint
app.get("/", (req, res) => {
    res.json({ message: "Oi Express!" });
});

// servir arquivos estáticos do frontend build
app.use(express.static(path.join(__dirname, "frontend", "dist")));

// fallback para rotas do React (deve vir após rotas da API e arquivos estáticos)
// Em Express 5, usamos um middleware genérico em vez de "*"
app.use((req, res) => {
    const indexPath = path.join(__dirname, "frontend", "dist", "index.html");
    // Verificar se o arquivo existe antes de servir
    const fs = require("fs");
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).json({ message: "Frontend build not found. Run 'npm run build' in frontend directory." });
    }
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
