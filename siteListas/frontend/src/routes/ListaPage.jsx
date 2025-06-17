import "../styles/ListaPage.css";
import "../styles/mainPage.css"
import { useParams, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";


export default function ListaPage(){
    const {id} = useParams();
    const [list, setList] = useState({ jogos: []});
    const [jogoSelecionado, setJogoSelecionado] = useState(null);
    const [isActive, setIsActive] = useState(false);
    
    
    async function fetchLista() {
            try{
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:3003/lists/${id}`, {
                        headers: { Authorization: `Bearer ${token}`}
                });
                setList(response.data);
            } catch (error) {
                    console.error("Erro ao buscar os jogos dessa lista-frontend", error);
                } 
            }
    
    useEffect(() => {
        fetchLista();
    }, [id])

    const handleRemoveGame = async(jogoSelecionado) =>{
        try{
        // Monta o objeto game para enviar para o backend
            const game = {
                gameId: jogoSelecionado
            }
            const token = localStorage.getItem('token');
            // Chama o List-Service para cadastrar usuário e gerar pedido
            await axios.put(`http://localhost:3003/lists/${list._id}/removerGame`, game,
                {headers: { Authorization: `Bearer ${token}`}}
            );
            alert(`jogo removido da lista ${list.titulo}`);
            setIsActive(false)
            fetchLista();
            }catch (error) {
            alert("Erro ao remover esse jogo à lista - frontend");
            console.error(error);
        }
        }
    const abrirModalDeletar = async(idGame) => {
        setJogoSelecionado(idGame) 
        setIsActive(true);
    }
    
    let gameCards;
    if(list.jogos.length > 0) {
        gameCards = list.jogos.map((game) => {
            return(
                <div className="catalogo" key={game._id}>
                <h2 className="jogos">{game.nome}</h2>
                <img className="jogos" src={game.img} alt={game.nome} />
                <p className="jogos">{game.desc}</p>
                <p className="jogos">R$ {game.preco}</p>
                <p className="jogos">Categoria: {game.categoria}</p>
                <button onClick={() => abrirModalDeletar(game._id)}>Remover esse jogo da lista</button>
            </div>
            );
    });
    } else {
        gameCards = <p>
                        Não há jogos nessa lista
                    </p>
    }
    
    return(
        <div>
            <Link to="/minhaslistas"><button>Voltar para as minhas listas</button></Link>
            <div>
            <h1 className="listaPage">Lista {list.titulo}</h1>
            {gameCards}
            </div>

            {isActive && (
                <div className="modal">
                        <div className="listapage-titulomodal">Deseja realmente remover este jogo?</div>
                        <button onClick={() => handleRemoveGame(jogoSelecionado)}>Remover</button>
                </div>
                )}
        </div>
        
    )
}