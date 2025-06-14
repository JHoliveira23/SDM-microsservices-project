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

      // Limpa o formulário
      setEmail("");
      setSenha("");
      navigate("/mainpage");
    } catch (error) {
      console.error("erro:", error);
      alert("Erro ao autenticar usuário.");
    }
  
  };
    
    return (
        <> 
        <div className="areaLogin">
            <div ></div>
            <div className="box">
                <form onSubmit={handleEntrar}>
                    <h1>Login</h1>
                    <div>
                        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <input type="text" placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)}  />
                    </div>
                    <div className="container-botoes">
                        <button type="submit">Entrar</button>
                        <Link to="/"><button>Voltar</button></Link>
                    </div>  
                </form>
            </div>    
        </div>
        </>
    )
}