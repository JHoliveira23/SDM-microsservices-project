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
    const [nomeNovaLista, setNomeNovaLista] = useState()


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

    const createNewList = async(e) =>{
            e.preventDefault() ;
            
            try{
            // Monta o objeto usuário para enviar para o backend
            const novaLista = {
                titulo: nomeNovaLista,
            }
            const token = localStorage.getItem('token');
            // Chama o List-Service para cadastrar usuário e gerar pedido
            await axios.post("http://localhost:3003/lists/", 
                novaLista, {headers:{Authorization: `Bearer ${token}`}});
            
            setNomeNovaLista("")
            fetchListas();
            alert("nova lista criada com sucesso");
            }catch (error) {
            alert("Erro ao criar a lista.");
            console.error(error);
        }
        }

    return(
        <div>
            <div className="minhaslistas-header">
                <div className="minhaslistas-titulopagina">Minhas Listas</div>
            </div>
            <form className="minhaslistas-formulario" onSubmit={createNewList}>
            <input type="text" placeholder="titulo da lista" value={nomeNovaLista} onChange={e => setNomeNovaLista(e.target.value)} />
            <button type="submit">Criar nova lista</button>
            </form>
            {lists.map((list) => (
                <div className="catalogo" key={list._id}>
                    <button className="containerLista" onClick={() => navigate(`/minhaslistas/${list._id}`)}>
                        <button className="button-listas">
                            <div className="minhaslistas-titulolistas">{list.titulo}</div> 
                        </button>  
                    </button>
                    <button className ="button-delete" onClick={() => abrirModalDeleteList(list._id)}>X</button>
                </div>
            ))}
            <button onClick={() => navigate("/mainpage")}>Voltar</button>
        
        {isActive && (
                <div className="modal">
                        <div className="minhaslistas-modaldelete">Deseja excluir a lista permanentemente?</div>
                        <button onClick={() => handleRemoveLista()}>Confirmar</button>
                        <button onClick={() => {setIsActive(false)}}>Cancelar</button>
                </div>
                )}
        </div>
    )
}