import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/Home.css"
import NavBar from '../components/NavBar'
import BackgroundComJogos from "../assets/backgroundComJogos.png"


export default function Home(){
    return (
        <>
            <NavBar/>
            
            <div className="bloco-bemvindo">
                <img className='homeBackground' src={BackgroundComJogos} alt="Jogos" />
                <div className='tituloHome'>Boas vindas ao lugar das suas listas preferidas</div>
                <p className='mensagemInicial'>Construa suas listas de jogos e compartilhe com seus amigos, faça lista dos seus melhores RPG,  lista de jogos que você mais quer jogar, lista de jogos que você já jogou, e muito mais. São diversas possibilidades.</p>
                <button className='comecar'>Começar</button>
            </div>
            <footer className='home'>Footer</footer>
        </>
    )
}