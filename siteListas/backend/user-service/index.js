const express = require("express");
const axios = require("mongoose");
const mongoose = require("mongoose");
const cors = require("cors");  // Importa o CORS
const app = express();

// Habilita CORS para localhost:3000 (frontend React)
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

// Conexão com MongoDB Atlas
const mongoUri = "mongodb+srv://jotaagaacademico822154533:usjt*2025@sdm-bua.wu43qzv.mongodb.net/";
mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("MongoDB conectado no User-Service"))
  .catch(err => console.log("Erro ao conectar no MongoDB", err));

// Definição do schema do usuário
const userSchema = new mongoose.Schema({
  id: String,
  email: String,
  senha: String,
});

const User = mongoose.model("User", userSchema);

// Rota para cadastrar um usuário
app.post("/usuarios", async (req, res) => {
  try {
    const usuario = req.body;

    // Salva o usuário no banco
    const user = new User(usuario);
    await user.save();


    res.send({ message: "Usuário cadastrado!", usuario: user });
  } catch (error) {
    res.status(500).send({ error: "Erro ao cadastrar usuário" });
  }
});

// Rota para listar todos os usuários
app.get("/usuarios", async (req, res) => {
  try {
    const usuarios = await User.find();
    console.log("Usuários cadastrados:", usuarios); // Exibe no console
    res.send(usuarios);
  } catch (error) {
    res.status(500).send({ error: "Erro ao buscar usuários" });
  }
});

// Rota para atualizar usuário por ID
app.put("/usuarios/:id", async (req, res) => {
  try {
    const usuarioAtualizado = await User.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!usuarioAtualizado) {
      return res.status(404).send({ error: "Usuário não encontrado" });
    }
    res.send({ message: "Usuário atualizado", usuario: usuarioAtualizado });
  } catch (error) {
    res.status(500).send({ error: "Erro ao atualizar usuário" });
  }
});

// Rota para deletar usuário por ID
app.delete("/usuarios/:id", async (req, res) => {
  try {
    const resultado = await User.findOneAndDelete({ id: req.params.id });
    if (!resultado) {
      return res.status(404).send({ error: "Usuário não encontrado" });
    }
    res.send({ message: "Usuário removido" });
  } catch (error) {
    res.status(500).send({ error: "Erro ao remover usuário" });
  }
});

app.listen(3002, () => console.log("User-Service rodando na porta 3002"));