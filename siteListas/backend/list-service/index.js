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
const listSchema = new mongoose.Schema({
  titulo: String,
  quantidade: Number,
  jogos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Jogo'}],
  usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const List = mongoose.model("List", listSchema);

//Rota POST para criar uma nova lista
app.post("/lists", async (req, res) => {
  
  try {
    const {titulo, quantidade, jogos, usuario} = req.body
    console.log("titulo", titulo);
    console.log("quantidade", quantidade);
    console.log("jogos", jogos);
    console.log("usuario", usuario );
    
    // Salva a lista no banco de dados
    const list = new List({titulo, quantidade, jogos, usuario});
    await list.save();
    res.status(201).send({ message: "Lista criada!", lista: list });
  } catch (error) {
    res.status(500).send({ error: "Erro ao criar a lista" });
  }
});

// Rota para apresentar as listas para o usuário
app.get("/lists", async (req, res) => {
  try {
    const lists = await List.find({usuario: user});
    console.log("Listas criadas:", lists); // Exibe no console
    res.send(lists);
  } catch (error) {
    res.status(500).send({ error: "Erro ao buscar as listas" });
  }
});

// Rota PUT para adicionar jogos a uma lista existente
app.put("/list/:id", async (req, res) => {
  try {
    const listaAtualizada = await List.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!listaAtualizada) {
      return res.status(404).send({ error: "Lista não encontrada" });
    }
    res.send({ message: "Jogo adicionado à lista com sucesso!", lista: listaAtualizada });
  } catch (error) {
    res.status(500).send({ error: "Erro ao adicionar à lista" });
  }
});

// Rota DELETE para excluir uma lista
app.delete("/list/:id", async (req, res) => {
  try {
    const resultado = await List.findOneAndDelete({ id: req.params.id });
    if (!resultado) {
      return res.status(404).send({ error: "Lista não encontrada"});
    }
    res.send({ message: "Lista excluída com sucesso!" });
  } catch (error) {
    res.status(500).send({ error: "Erro ao excluir a lista" });
  }
});

app.listen(3003, () => console.log("List-Service rodando na porta 3003"));