import React from "react"
import Logo from "../../components/Logo";
import Nav from "../../components/Template/Nav/Nav";
import Main from "../../components/Template/Main/Main";
import Footer from "../../components/Template/Footer/Footer";
import "./style.css";
import { Routes, Route } from "react-router-dom";
import HomeCrud from "../../components/HomeCrud/HomeCrud";

const Home = () => {

  return (
      <div className="page"> 
        <div className="logoBox"> 
          <Logo/>
        </div>
        <Nav/>

        <Main icon="home" title="Home" subtitle="Cadastro de livros">
          
          <HomeCrud/>
          <Routes/>
        </Main>

        <Footer/>
      </div>
  )
}

export default Home