import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/Home.css"
import NavBar from '../components/NavBar'
import BackgroundComJogos from "../assets/backgroundComJogos.png"


export default function Home(){
    return (
        <>
            <NavBar/>
            <div>
                <div className="bloco-bemvindo">
                <img className='homeBackground' src={BackgroundComJogos} alt="Jogos" />
                <div className='tituloHome'>Boas vindas ao lugar das suas listas preferidas</div>
                <p className='mensagemInicial'>Construa suas listas de jogos e compartilhe com seus amigos, faça listas dos seus melhores RPGs,  lista de jogos que você mais quer jogar, lista de jogos que você já jogou, e muito mais!. São diversas possibilidades.</p>
                <button className='comecar'>Começar</button>
            </div>
            </div>
            <div className='caixaVideo'>
                <div className='tituloVideo'>Vídeo demonstrativo</div>
                <div className='video-home'><iframe width="560" height="315" src="https://www.youtube.com/embed/6dE90n_O_aw?si=2JdSROQF7LwHJt4E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>
            </div>
            <footer className='home'>
                <div className='sobre'>
                    SUPERLISTA
                </div>
                <div></div>
            </footer>
        </>
    )
}