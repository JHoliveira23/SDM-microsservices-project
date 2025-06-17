const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");  // Importa o CORS
const jwt = require("jsonwebtoken")

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
  jogos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game'}],
  usuario: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const List = mongoose.model("List", listSchema);


function autenticarToken(req, res, next){
  const authHeader = req.headers['authorization'];

  const token  = authHeader && authHeader.split(' ')[1];

  if(!token){
    return res.status(401).json({mensagem: 'Token não enviado'});
  }
  
  jwt.verify(token, 'ChaveSecreta123SuperLista', (error, user) => {
    if(error) {
      return res.status(403).json({ mensagem: 'Token inválido'});
    }
    req.user = user;
    next();
  })
}

//Rota POST para criar uma nova lista
app.post("/lists/criarcomjogo", autenticarToken, async (req, res) => {
  try {
    const {titulo, jogos} = req.body
    const usuario = req.user._id
    
    // Salva a lista no banco de dados
    const list = new List({titulo, jogos, usuario});
    await list.save();
    res.status(201).send({ message: "Lista criada!", lista: list });
  } catch (error) {
    res.status(500).send({ error: "Erro ao criar a lista" });
  }
});

 //Rota POST para criar uma lista
app.post("/lists", autenticarToken, async (req, res) => {
  try {
    const {titulo} = req.body
    const usuario = req.user._id
    
    // Salva a lista no banco de dados
    const list = new List({titulo, usuario});
    await list.save();
    res.status(201).send({ message: "Lista criada!", lista: list });
  } catch (error) {
    res.status(500).send({ error: "Erro ao criar a lista" });
  }
});

app.get('/lists/:id', autenticarToken, async (req, res) => {
  
  
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ error: "ID inválido" });
  }
  try {
    const list = await List.findOne({_id: req.params.id, usuario: req.user._id});
    if (!list) {
      return res.status(404).json({ error: "Lista não encontrada "});
    }
    console.log("IDs dos jogos que estou enviando:", list.jogos);


    let infosGames = [];
    if(list.jogos.length > 0) {
      const response = await axios.get("http://localhost:3004/games/byIds", {
      params: { ids: list.jogos.join(',')}
    })
      infosGames = response.data;
    }
    
    res.send ({
      _id: list._id,
      titulo: list.titulo,
      usuario: list.usuario,
      jogos: infosGames
    })
    console.log("Lista encontrada", list);
  } catch (error) {
    res.status(500).send({ error: "Erro ao buscar a lista"})
  }
})
// Rota para apresentar as listas para o usuário
app.get("/lists", autenticarToken, async (req, res) => {
  try {
    const lists = await List.find({usuario: req.user._id});
    console.log("Listas criadas:", lists); // Exibe no console
    res.send(lists);
  } catch (error) {
    res.status(500).send({ error: "Erro ao buscar ao buscar listas" });
  }
});

// Rota PUT para adicionar um jogo à uma lista

app.put("/lists/:id/adicionarGame", autenticarToken, async (req, res) => {
  const { gameId } = req.body;
  const usuario = req.user._id;
  try{
    const listaAtualizada = await List.findByIdAndUpdate(
      {_id: req.params.id, usuario}, {$push: {jogos: gameId}},
      {new: true}
    )
    if (!listaAtualizada){
      return res.status(404).send({error:"Lista não encontrada"});
    }
    res.send({message: "Jogo adicionado à lista com sucesso!", lista: listaAtualizada});
  } catch(error) {
    res.status(500).send({error: "Erro ao adicionar o jogo na lista"})
  }
})

// Rota PUT para remover um jogo da lista

app.put("/lists/:id/removerGame", autenticarToken, async(req, res) => {
  const { gameId } = req.body;
  const usuario = req.user._id;
  try{
    const listaAtualizada = await List.findByIdAndUpdate(
      {_id: req.params.id, usuario}, {$pull: {jogos: gameId}},
      {new: true}
    )
    if(!listaAtualizada){
      return res.status(404).send({ error: "Lista não encontrada"})
    }
    res.send({message: "Jogo removido da lista com sucesso!", lista: listaAtualizada})
  } catch(error) {
    res.status(500).send({error: "Erro ao remover o jogo dessa lista"})
  }
})

// Rota PUT para editar o título de uma lista existente

app.put("/lists/:id", autenticarToken, async (req, res) => {
  const {titulo} = req.body
  try {
    const listaAtualizada = await List.findOneAndUpdate(
      { _id: req.params.id, usuario},
      {titulo},
      { new: true }
    );
    if (!listaAtualizada) {
      return res.status(404).send({ error: "Lista não encontrada" });
    }
    res.send({ message: "Lista alterada com sucesso", lista: listaAtualizada });
  } catch (error) {
    res.status(500).send({ error: "Erro ao atualizar a lista" });
  }
});



// Rota DELETE para excluir uma lista
app.delete("/lists/:id", autenticarToken, async (req, res) => {
  const usuario = req.user._id;
  try {
    const resultado = await List.findOneAndDelete({ _id: req.params.id, usuario});
    if (!resultado) { 
      return res.status(404).send({ error: "Lista não encontrada ou você não tem autorização para excluir esta lista"});
    }
    res.send({ message: "Lista excluída com sucesso!" });
  } catch (error) {
    res.status(500).send({ error: "Erro ao excluir a lista" });
  }
});

app.listen(3003, () => console.log("List-Service rodando na porta 3003"));