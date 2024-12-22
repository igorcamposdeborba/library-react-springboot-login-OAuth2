import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Logo from "../../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/UseAuth";
import * as C from "./styles";

const Signin = () => {
    const { signin } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Ao teclar enter envia o formulário
    const handleLogin = async (keyboard) => {
        keyboard.preventDefault();

        if (!email || !password) { // verificação se tem os campos preenchidos
            setError("Preencha todos os campos");
            return;
        }
        const response = await signin(email, password); // verificar e-mail e senha

        if (response) { // se tiver retorno, vai mostrar o erro
            setError(response);
            return;
        }
        navigate("/book"); // mudar de página
    }

  return (
    <C.Container className='signin'>
        <Logo/>
        <C.Label >Login</C.Label>
        <C.Content>
            <Input
                type = "email"
                placeholder = "Digite seu e-mail"
                value = {email}
                onChange = {(e) => [setEmail(e.target.value), setError("")]} />

            <Input
                type = "password"
                placeholder = "Senha"
                value = {password}
                onChange = {(e) => [setPassword(e.target.value), setError("")]}
                onKeyDown={(keyboard) => keyboard.key === 'Enter' && handleLogin(keyboard)} />
            <C.LabelError> {error} </C.LabelError>
            <Button Text="Entrar" onClick={ handleLogin }/>

            <C.LabelSignup>
                Não tem uma conta?
                <C.Strong>
                    <Link to="/signup">&nbsp;Registre-se</Link>
                </C.Strong>
            </C.LabelSignup>
        </C.Content>
    </C.Container>
  )
}

export default Signin