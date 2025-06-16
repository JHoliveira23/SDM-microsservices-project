    import React, { useEffect, useState} from "react";
    import { Link, useNavigate } from "react-router-dom";
    import "../styles/MainPage.css"
    import axios from "axios"
    import NavBar from "../components/NavBar"   

    export default function MainPage(){

        // UseState
        const [games, setGames] = useState([]);
        const [isActive, setIsActive] = useState(false);
        const [jogoSelecionado, setJogoSelecionado] = useState(null);
        const [lists, setLists] = useState([]);
        const [isActivedModalNovaLista, setIsActivedModalNovaLista] = useState(false)
        const [nomeNovaLista, setNomeNovaLista] = useState('')

        
        const navigate = useNavigate();
        // função para apresentar os jogos na tela 
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

        // função para adicionar jogo à lista
        const handleAddToList = async(listId, listTitulo) =>{
            try{
            // Monta o objeto usuário para enviar para o backend
            const game = {
                gameId: jogoSelecionado
            }
            const token = localStorage.getItem('token');
            // Chama o List-Service para cadastrar usuário e gerar pedido
            await axios.put(`http://localhost:3003/lists/${listId}/adicionarGame`, game,
                {headers: { Authorization: `Bearer ${token}`}}
            );
            alert(`jogo adicionado à lista ${listTitulo}`);
            setIsActive(false)
            }catch (error) {
            alert("Erro ao adicionar esse jogo à lista");
            console.error(error);
        }
        }
        useEffect(() =>{
                    async function fetchLists(){
                        if (isActive) {
                        try {
                            const token = localStorage.getItem("token")
                            const response = await axios.get("http://localhost:3003/lists", {
                            headers: { Authorization: `Bearer ${token}`}
                            })
                            setLists(response.data)
                        } catch (error) { 
                            console.error("Erro ao buscar as listas", error);      
                        }
                        }
                    }
                    fetchLists();
                }, [isActive])
            
        const abrirModalComListas = async(idGame) => {
            setJogoSelecionado(idGame);
            setIsActive(true);
        } 

        const abrirModalNovaLista = async() => {
            setIsActivedModalNovaLista(true);
        }
        const createNewList = async(e) =>{
            e.preventDefault() ;
            
            try{
            // Monta o objeto usuário para enviar para o backend
            const novaLista = {
                titulo: nomeNovaLista,
                jogos: [jogoSelecionado]
            }
            const token = localStorage.getItem('token');
            // Chama o List-Service para cadastrar usuário e gerar pedido
            await axios.post("http://localhost:3003/lists", 
                novaLista, {headers:{Authorization: `Bearer ${token}`}});
            
            setNomeNovaLista("")
            setIsActivedModalNovaLista(false);
            setIsActive(false);
            alert("nova lista criada com sucesso");
            }catch (error) {
            alert("Erro ao criar a lista.");
            console.error(error);
        }
        }
        return(
            <div className="catalogo">
                    <h1>Catalogo com centenas de jogos</h1>
                    <button onClick={() => navigate("/")}>Início</button>
                    <button onClick={() => navigate("/minhaslistas")}>Minhas listas</button>
                {games.map((game) => (
                    <div key={game._id || game.id}>
                    <div>
                        <h2 className="jogos">{game.nome}</h2>
                        <img className="jogos" src={game.img} alt={game.nome} />
                        <p className="jogos"> Sobre: {game.desc}</p>
                        <p className="jogos">R$ {game.preco}</p>
                        <p className="jogos">Categoria: {game.categoria}</p>
                        <button onClick={() => abrirModalComListas(game._id)}>Adicionar à uma lista</button>
                    </div>   
                    </div>
                    ))
                }

                <Link to="/">Home</Link>
                
                {isActive && (
                <div className="modal">
                    <button onClick={() => 
                    {setIsActive(false);
                    setIsActivedModalNovaLista(false);
                    }}>X</button>
                        <h2 className="titulo-modal">Selecione uma lista</h2>
                        
                    {lists.map((list) => (
                    <div key={list._id || list.id}>
                        <div>
                            <button className="button-modal" onClick={() => handleAddToList(list._id, list.titulo)}><h2 className="lista-modal">{list.titulo}</h2></button>
                        </div>   
                    </div>))
                    }
                    <div>
                        <button onClick={() => abrirModalNovaLista()}>Nova Lista</button>
                    </div>
                    {isActivedModalNovaLista && (
                    <div>
                        <form onSubmit={createNewList}>
                            <h1>Nova Lista</h1>
                                <div>
                                    <input type="text" placeholder="Insira um nome" value={nomeNovaLista} onChange={e => setNomeNovaLista(e.target.value)}/>
                                </div>
                                    <div className="container-botoes">
                                    <button type="submit">Confirmar</button>
                                    </div>  
                        </form>
                    </div>
                )}
                </div>
                )}

                {isActivedModalNovaLista && (
                    <div>
                        <form onSubmit={createNewList}>
                            <h1>Nova Lista</h1>
                                <div>
                                    <input type="text" placeholder="Insira um nome" value={nomeNovaLista} onChange={e => setNomeNovaLista(e.target.value)}/>
                                </div>
                                    <div className="container-botoes">
                                    <button type="submit">Confirmar</button>
                                    </div>  
                        </form>
                    </div>
                )}
                
            </div>
        )
    }