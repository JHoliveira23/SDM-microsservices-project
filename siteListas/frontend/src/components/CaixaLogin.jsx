import "../styles/CaixaLogin.css"
import jogosIndies from "../assets/jogosIndie01.jpg"
import React, { useState } from "react";
import axios from "axios";


export default function CaixaLogin(){
     const [id, setId] = useState("");
     const [email, setEmail] = useState("");
     const [senha, setSenha] = useState("");
   
    // Função para enviar o formulário
    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Monta o objeto usuário para enviar para o backend
      const usuario = {id, email, senha};
    // Chama o User-Service para cadastrar usuário e gerar pedido
      const response = await axios.post("http://localhost:3002/usuarios", usuario);
      console.log(usuario);
      
      alert("Usuário cadastrado com sucesso!");
      
      // Limpa o formulário
      setId("");
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
            <div className="box">
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div>
                        <div>id</div>
                        <input type="text" value= {id} onChange={e => setId(e.target.value)} />
                        <div className="elementosLogin">E-mail</div>
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <div className="elementosLogin">senha</div>
                        <input type="text" value={senha} onChange={e => setSenha(e.target.value)}  />
                    </div>
                    <button type="submit">Cadastrar</button>
                </form>
            </div>    
        </div>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem commodi, dolores assumenda adipisci, nobis exercitationem aperiam aliquam vitae consectetur itaque eum eaque praesentium consequatur velit suscipit quidem quae illum officiis.</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Pariatur assumenda eaque numquam maxime sequi vitae, nisi cumque maiores accusantium debitis, voluptate quas illo et nemo ipsam earum recusandae fuga quia? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis aut ipsum consequatur cupiditate? Quas nulla accusamus qui at quis consequatur voluptatem atque nisi facilis! Officiis necessitatibus iure at et dolorum! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Autem officia maiores accusamus. Iure eum obcaecati, maxime porro ratione est. Quae rem nesciunt eum hic nulla, beatae blanditiis molestiae. Et, temporibus?</p>
        <main>
            <h1>Título H1 testeeeeeeee</h1>
            <h2>Título H1 blaaaaaa</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error ullam fuga iste quas labore nihil, nisi ipsum pariatur rem, neque, at tempore eius nobis aspernatur necessitatibus iusto saepe nulla tenetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto corrupti minus, ea fugiat eligendi suscipit blanditiis, maiores ad consectetur sunt, cum delectus! Eius, magni! Dolore assumenda earum similique distinctio modi!
            </p>   
        </main>
        <picture>
            <img src={jogosIndies} alt="imagem de jogos indies"/>
        </picture>
        </>
    )
}