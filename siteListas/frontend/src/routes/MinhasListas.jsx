import NavBar from "../components/NavBar"
import "../styles/MinhasListas.css"
import "../styles/MainPage.css"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"


export default function MinhasListas(){
    
    //useState
    const [lists, setLists] = useState([])
    const [listaSelecionada, setListaSelecionada] = useState()
    const [isActive, setIsActive] = useState(false)
    
    const navigate = useNavigate();
    async function fetchListas() {
                    try {
                        const token = localStorage.getItem('token');
                        const response = await axios.get("http://localhost:3003/lists", {
                            headers: { Authorization: `Bearer ${token}`}
                        });
                        setLists(response.data);
                    } catch (error){
                        console.error("Erro ao buscar as listas", error);
                    }   
                }
                
    useEffect(() => {
            //função para buscar jogos na API
            fetchListas();
        }, []); 
    
    const handleRemoveLista = async() =>{
        try{
        // Monta o objeto game para enviar para o backend
            const token = localStorage.getItem('token');
            // Chama o List-Service para cadastrar usuário e gerar pedido
            await axios.delete(`http://localhost:3003/lists/${listaSelecionada}`,
                {headers: { Authorization: `Bearer ${token}`}}
            );
            alert(`lista removida`);
            setIsActive(false)
            fetchListas();
            }catch (error) {
            alert("Erro ao remover esse jogo à lista - frontend");
            console.error(error);
        }
        }

    const abrirModalDeleteList = (listId) =>{
        setIsActive(true)
        setListaSelecionada(listId)
    }
    return(
        <div>
            <NavBar></NavBar>
            <h1 className="minhasListas">Minhas Listas</h1>

            {lists.map((list) => (
                <div className="catalogo" key={list._id}>
                    <button className="containerLista" onClick={() => navigate(`/minhaslistas/${list._id}`)}>
                        <button className="button-listas">
                            <h2 className="jogos">{list.titulo}</h2> 
                        </button>  
                    </button>
                    <button className ="button-delete" onClick={() => abrirModalDeleteList(list._id)}>X</button>
                </div>
            ))}
            <button onClick={() => navigate("/mainpage")}>Voltar</button>
        
        {isActive && (
                <div className="modal">
                        <div>Deseja excluir a lista permanentemente?</div>
                        <button onClick={() => handleRemoveLista()}>Remover</button>
                        <button onClick={() => {setIsActive(false)}}>X</button>
                </div>
                )}
        </div>
    )
}