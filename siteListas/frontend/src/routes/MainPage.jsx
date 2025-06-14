import React, { useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "../styles/MainPage.css"
import axios from "axios"
import NavBar from "../components/NavBar"

export default function MainPage(){

    // Estado para guardar os jogos buscados
    const [games, setGames] = useState([]);
    const [isActive, setIsActive] = useState();

    useEffect(() => {
        //função para buscar jogos na API
        async function fetchGames() {
            try {
                const response = await axios.get("http://localhost:3004/games");
                setGames(response.data);
            } catch (error){
                console.error("Erro ao buscar os jogos", error);
            }   
        }
        fetchGames();
    }, []); 

    // async function handleAddToList(e){
    //     e.preventDefault();

    //     const game = {_id}
    //     try{
    //     // Monta o objeto usuário para enviar para o backend
      
    //     // Chama o List-Service para cadastrar usuário e gerar pedido
    //   const response = await axios.post("http://localhost:3002/games", game);
    //   console.log(game);
      
    //   alert("game cadastrado com sucesso!");
      
    //   }catch (error) {
    //   alert("Erro ao cadastrar usuário.");
    //   console.error(error);
    // }

    //     }

    return(
        <body className="catalogo">
                <h1>Página Principal das suas Listas!!!</h1>
            {games.map((game) => (
                <div className key={game._id || game.id}>
                <div>
                    <h2 className="jogos">{game.nome}</h2>
                    <img className="jogos" src={game.img} alt={game.nome} />
                    <p className="jogos"> Sobre: {game.desc}</p>
                    <p className="jogos">R$ {game.preco}</p>
                    <p className="jogos">Categoria: {game.categoria}</p>
                    <button>Adicionar à uma lista</button>
                </div>   
                </div>
                ))
            }
            <button onClick={() => setIsActive(true)}>Criar uma lista</button>
            <Link to="/">Home</Link>

            {isActive && (
            <div className="caixa">
                <div>AAAAAAAAAAAAAA</div>
                <button onClick={() => setIsActive(false)}></button>
            </div>
            )}
            
        </body>
    )
}