import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import UseAuth from "../hooks/UseAuth";
import BookCrud from "../components/Book/BookCrud";

// verificar se o usuário está logado
const Private = ({ Item }) => {
    const { signed } = UseAuth(); // atribuir no objeto signed o contexto para validar abaixo se o usuário está logado
    return signed > 0 ? <Item/> : <Signin/>; // Item loga, Signin redireciona para a página de login
}

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    {/*<Route exact path="/home" element={<Private Item={Home} />} /> // Private bloqueia o acesso para pessoas deslogadas
                                                                                   // Item é a página que vou receber
                                                                                */}
                    {/* <Route exact path="/home" element={<Private Item={Home} />} /> */}
                    <Route exact path="/book/*" element={<Private Item={Home} />} />
                    <Route exact path="/" element={<Signin />} />
                    <Route exact path="/signup" element={<Signup />} />
                    <Route exact path="/books" element={<Private Item={BookCrud} />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    )
}

// <Route path="*" element={<Signin />} /> // Redirecione qualquer outra página digitada pelo usuário para o login

export default RoutesApp;