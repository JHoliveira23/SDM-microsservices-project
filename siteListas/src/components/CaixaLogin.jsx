import "../styles/CaixaLogin.css"
import jogosIndies from "../assets/jogosIndie01.jpg"
import React, { useState } from "react";
//import axios from "axios";


export default function CaixaLogin(){
     const [login, setLogin] = useState("");
     const [senha, setSenha] = useState("");
   
    // Função para enviar o formulário
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Monta o objeto usuário para enviar para o backend
      const usuario = [login, senha];
      // Chama o User-Service para cadastrar usuário e gerar pedido
      //const response = await axios.post("http://localhost:3002/usuarios", usuario);
      console.log(usuario);
      
      alert("Usuário cadastrado com sucesso!");
      
      // Limpa o formulário
      setLogin("");
      setSenha("");
    } catch (error) {
      alert("Erro ao cadastrar usuário.");
      console.error(error);
    }
  };
    
    
    return (
        <>  
        <div className="areaLogin">
            <img src={jogosIndies} alt="imagem de jogos indies" />
            <div className="box">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div>
                        <div className="elementosLogin">E-mail</div>
                        <input type="text" value={login} onChange={e => setLogin(e.target.value)} />
                    </div>
                    <div>
                        <div className="elementosLogin">senha</div>
                        <input type="text" value={senha} onChange={e => setSenha(e.target.value)} />
                    </div>
                    <button type="submit">Cadastrar</button>
                </form>
            </div>    
        </div>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem commodi, dolores assumenda adipisci, nobis exercitationem aperiam aliquam vitae consectetur itaque eum eaque praesentium consequatur velit suscipit quidem quae illum officiis.</p>
            
            
        </>
    )
}