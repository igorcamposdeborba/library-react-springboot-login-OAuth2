import React from "react";
import './styles.css';
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/UseAuth";

const Logo = () => {

  const { signout } = useAuth();
  const navigate = useNavigate();

   return (
        <a onClick={() => [signout(), navigate("/")]}>
            <div className="logo" alt="Logo Library" title="Voltar para o login"/> 
        </a>
  )
}

export default Logo