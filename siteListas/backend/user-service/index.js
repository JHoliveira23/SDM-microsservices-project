const express = require("express");
const axios = require("mongoose");
const mongoose = require("mongoose");
const cors = require("cors");  // Importa o CORS
const app = express();
const jwt = require ('jsonwebtoken'); 
const bcrypt = require('bcrypt');
const modificador = 10;
// Habilita CORS para localhost:5173 (frontend React)
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());

// Conexão com MongoDB Atlas
const mongoUri = "mongodb+srv://jotaagaacademico822154533:usjt*2025@sdm-bua.wu43qzv.mongodb.net/";
mongoose.connect(mongoUri, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => console.log("MongoDB conectado no User-Service"))
  .catch(err => console.log("Erro ao conectar no MongoDB", err));

// Definição do schema do usuário
const userSchema = new mongoose.Schema({
  nome: String,
  email: String,
  senha: String,
});

const User = mongoose.model("User", userSchema);

// Rota para cadastrar um usuário
app.post("/cadastro", async (req, res) => {
  
  try {
    const {nome, email, senha} = req.body
    console.log("nome", nome);
    console.log("email", email);
    console.log("senha", senha);
   const hashedSenha = await bcrypt.hash(senha, modificador);

    // Salva o usuário no banco de dados
    const user = new User({nome, email, senha: hashedSenha});
    await user.save();


    res.status(201).send({ message: "Usuário cadastrado!", usuario: user });
  } catch (error) {
    res.status(500).send({ error: "Erro ao cadastrar usuário" });
  }
});

// Rota para autenticar Login do usuário
app.post("/login", async (req, res) => {
  
  try {
    const {email, senha} = req.body;
    console.log("email recebido", email);
    console.log("senha recebida", senha);
    
    
    const user = await User.findOne({ email });
    console.log("usuário encontrado", user);
    
    
    if(!user) {
      return res.status(401).json({ message: 'Usuário não encontrado'});
    } 
    if(!user.senha){
      return res.status(500).json({ message: 'Senha não encontrada para o usuário'});
    }
    const isSenhaCorreta = await bcrypt.compare(senha, user.senha);
    console.log("comparação de senha", isSenhaCorreta);
    
    if(!isSenhaCorreta) {
          return res.status(401).json({ message: 'Senha incorreta'});
        }
    
    const token = jwt.sign(
      {
        id: user._id, email: user.email },
        'ChaveSecreta123SuperLista',
        { expiresIn: '1h'}
    )
    res.json({token});

    

    res.status(200).send({ message: "Login realizado com sucesso!", usuario: user });
  } catch (error) {
    console.log("erro no login", error);
    res.status(500).json ({ message: "Erro ao autenticar o usuário", error: error.message})
  }
});

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


// Rota para listar todos os usuários
app.get("/usuarios", autenticarToken, async (req, res) => {
  try {
    res.json({ mensagem: 'Você está autenticado!', usuario: req.user})
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