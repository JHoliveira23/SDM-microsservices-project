import NavBar from "../components/NavBar"
import "../styles/MinhasListas.css"
import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"


export default function MinhasListas(){
    
    //useState
    const [lists, setLists] = useState([])

    useEffect(() => {
            //função para buscar jogos na API
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
            fetchListas();
        }, []); 



    return(
        <div>
            <NavBar></NavBar>
            <h1 className="minhasListas">Minhas Listas</h1>

            {lists.map((list) => (
                <div key={list._id}>
                    <Link to={`/minhasListas/${list._id}`}>
                        <h2 className="minhasListas">{list.titulo}</h2>
                        
                    </Link>
                </div>
            ))}
            <Link to="/mainpage">Voltar</Link>
        </div>
    )
}