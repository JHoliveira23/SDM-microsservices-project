import "../styles/CaixaCadastro.css"
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CaixaCadastro(){
     const [nome, setNome] = useState("");
     const [email, setEmail] = useState("");
     const [senha, setSenha] = useState("");

 
    // Função para enviar o formulário
    const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Monta o objeto usuário para enviar para o backend
      const usuario = {nome, email, senha};
      
        // Chama o User-Service para cadastrar usuário e gerar pedido
      await axios.post("http://localhost:3002/cadastro", usuario);
      console.log(usuario);
      
      alert("Usuário cadastrado com sucesso!");
      
      // Limpa o formulário
      setNome("");
      setEmail("");
      setSenha("");
   }catch (error) {
      alert("Erro ao cadastrar usuário. O email inserido pode já estar cadastrado");
      console.error(error); 
    }
      }
    
    
    
    return (
        <> 
        <div><Link to="/"><button>Voltar</button></Link></div>
        <div className="areaLogin">
            <div className="box">
                <form onSubmit={handleSubmit}>
                    <h1 className="cadastro">Cadastro</h1>
                    <div>
                        <input type="text" placeholder="Nome de usuário" value={nome} onChange={e => setNome(e.target.value)}/>
                    </div>
                    <div>
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)}  />
                    </div>
                    
                    <div className="container-botoes">
                        <button className="button-confirmar" type="submit">Cadastrar</button>
                    </div>  
                </form>
            </div>    
        </div>
        </>
    )
}