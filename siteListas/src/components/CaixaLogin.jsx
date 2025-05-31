import "../styles/CaixaLogin.css"
import jogosIndies from "../assets/jogosIndie01.jpg"

export default function CaixaLogin(){
    return (
        <>  
        <div className="areaLogin">
            <img src={jogosIndies} alt="imagem de jogos indies" />
            <div className="box">
               <h1>E-mail</h1>
               <div>
                <div className="elementosLogin">login</div>
               <input type="text" />
               </div>
               <div>
                <div className="elementosLogin">senha</div>
                <input type="text" />
               </div>
            
            </div>
            
        </div>
            
            
        </>
    )
}