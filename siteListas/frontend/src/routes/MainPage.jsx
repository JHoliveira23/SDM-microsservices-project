import React from "react";
import { Link } from "react-router-dom";
import "../styles/MainPage.css"



export default function MainPage(){

    return(
        <>
            <h1>Página Principal das suas Listas!!!</h1>
            <Link to="/">Home</Link>
        </>
    )
}