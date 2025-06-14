import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';

// Configurando router
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Home from './routes/Home.jsx';
import MainPage from './routes/MainPage.jsx';
import CadastroPage from './routes/CadastroPage.jsx';
import LoginPage from './routes/LoginPage.jsx';
import ErrorPage from './routes/ErrorPage.jsx';
import ProtectedRoute from "./routes/ProtectedRoute.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    //pagina de erro
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "cadastropage",
        element: <CadastroPage/>
      },
      {
        path: "loginpage",
        element: <LoginPage/>
      },
      {
        path: "mainpage",
        element: <ProtectedRoute><MainPage/></ProtectedRoute> 
      }
   ] 
  }
]);


createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router}/>
  </>,
)
