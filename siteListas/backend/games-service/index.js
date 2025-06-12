const express = require("express");
const axios = require("mongoose");
const mongoose = require("mongoose");
const cors = require("cors");  // Importa o CORS
const app = express();

// Habilita CORS para localhost:5173 (frontend React)
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

// Conexão com MongoDB Atlas
const mongoUri = "mongodb+srv://jotaagaacademico822154533:usjt*2025@sdm-bua.wu43qzv.mongodb.net/";
mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("MongoDB conectado no User-Service"))
  .catch(err => console.log("Erro ao conectar no MongoDB", err));

// Definição do schema do usuário
const gameSchema = new mongoose.Schema({
  nome: String,
  desc: String,
  preco: Number,
  categoria: String,
});

const Game = mongoose.model("Game", gameSchema);