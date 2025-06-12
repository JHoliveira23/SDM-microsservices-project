import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css"



export default function NavBar(){
    const handleClick = () => {
        window.scrollTo(0, 1000);
    }
    return(
        <>
           <nav className="containerNavBar">
                <div className="logo-home">
                    SUPERLISTA
                </div>
                <div>
                    <button onClick={handleClick} className="sobre-home">Sobre</button>
                    <Link to="/loginPage"><button className="entrar-home">Entrar</button></Link>
                    <Link to="/cadastroPage"><button className="cadastre-se-home">Cadastre-se</button></Link>
                </div>
           </nav>
           <div className="bloco-bem vindo">
           </div>

        </>
    )
}