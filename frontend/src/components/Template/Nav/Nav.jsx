import React from 'react';
import "./Nav.css";
import { Routes, Route } from "react-router-dom";
import BookCrud from '../../Book/BookCrud';
import Signin from '../../../pages/Signin';
import { useNavigate } from "react-router-dom";
import useAuth from '../../../hooks/UseAuth';
import ButtonSmall from '../../ButtonSmall';

export default () => {
    const { signout } = useAuth();
    const navigate = useNavigate();

    return (
        <aside className="menu-area">
            <nav className="menu">
                <a href="/book">
                    <i className="fa fa-home"> <span>Cadastro</span> </i>
                </a>
                <a href="/books">
                    <i className="fa fa-book"> <span>Livros populares</span> </i>
                </a>

                

                <Routes>
                    <Route path="/book" element={<BookCrud/>}></Route>
                    <Route path="/books" element={<BookCrud/>}></Route>
                </Routes>
            </nav>
            <div className="center">
                <ButtonSmall Text="Sair" onClick={() => [signout(), navigate("/")]}>
                    Sair
                </ButtonSmall>
                </div>
        </aside>
    )
}