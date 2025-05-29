import "../styles/CaixaLogin.css"

export default function CaixaLogin(){
    return (
        <>  
        <div className="areaLogin">
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