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
  img: String,
  desc: String,
  preco: Number,
  categoria: String,
});

const Game = mongoose.model("Game", gameSchema);

// Rota POST para criar um novo jogo
app.post("/games", async (req, res) => {
  
  try {
    const {nome, img, desc, preco, categoria} = req.body
    console.log("nome", nome);
    console.log("imagem", img);
    console.log("desc", desc);
    console.log("preco", preco);
    console.log("categoria", categoria);
    
    // Salva o jogo no banco de dados
    const game = new Game({nome, img, desc, preco, categoria});
    await game.save();
    res.status(201).send({ message: "Jogo criado!", jogo: game });
  } catch (error) {
    res.status(500).send({ error: "Erro ao criar um jogo" });
  }
});

// Rota GET para apresentar os jogos para o usuário
app.get("/games", async (req, res) => {
  try {
    const games = await Game.find();
    console.log("Jogos disponíveis:", games); // Exibe no console
    res.send(games);
  } catch (error) {
    res.status(500).send({ error: "Erro ao buscar os jogos" });
  }
});



app.listen(3004, () => console.log("Game-Service rodando na porta 3004"));