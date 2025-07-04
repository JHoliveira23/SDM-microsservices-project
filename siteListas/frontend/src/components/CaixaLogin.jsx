import "../styles/CaixaCadastro.css"
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


export default function CaixaLogin(){
     const [email, setEmail] = useState("");
     const [senha, setSenha] = useState("");

     const navigate = useNavigate();
    // Função para enviar o formulário
    const handleEntrar = async (e) => {
    e.preventDefault();

    try {
      // Monta o objeto usuário para enviar para o backend
      const usuario = {email, senha};
    // Chama o User-Service para receber o email e senha usuário e verificar as conformidades
      const response = await axios.post("http://localhost:3002/login", usuario);
      console.log(usuario);
      
      alert("Usuário autenticado com sucesso!");
      
      const tokenRecebido = response.data.token;
      localStorage.setItem('token', tokenRecebido);

      navigate("/mainpage");
      // Limpa o formulário
      setEmail("");
      setSenha("");  
    } catch (error) {
      console.error("erro:", error);
      alert("Erro ao autenticar usuário.");
    }
  
  };
    
    return (
        <> 
        <div><Link to="/"><button>Voltar</button></Link></div>
        <div className="areaLogin">
            
            <div className="box">
                <form onSubmit={handleEntrar}>
                    <h1 className="login">Login</h1>
                    <div>
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <input type="password" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)}  />
                    </div>
                    <div className="container-botoes">
                        <button className="button-confirmar" type="submit">Entrar</button>
                    </div>  
                </form>
            </div>    
        </div>
        </>
    )
}