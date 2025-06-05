import "../styles/CaixaLogin.css"
import jogosIndies from "../assets/jogosIndie01.jpg"
import React, { useState } from "react";
import axios from "axios";


export default function CaixaLogin(){
     const [email, setEmail] = useState("");
     const [senha, setSenha] = useState("");
   
    // Função para enviar o formulário
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Monta o objeto usuário para enviar para o backend
      const usuario = {email, senha};
    // Chama o User-Service para cadastrar usuário e gerar pedido
      const response = await axios.post("http://localhost:3002/usuarios", usuario);
      console.log(usuario);
      
      //alert("Usuário cadastrado com sucesso!");
      
      // Limpa o formulário
      setEmail("");
      setSenha("");
    } catch (error) {
      alert("Erro ao cadastrar usuário.");
      console.error(error);
    }
  };
    
    
    return (
        <> 
        <div className="areaLogin">
            <div ></div>
            <div className="box">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div>
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <input type="text" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)}  />
                    </div>
                    <div className="container-botoes">
                        <button type="submit">Cadastrar</button>
                        <button>Entrar</button>
                    </div>  
                </form>
            </div>    
        </div>
        </>
    )
}