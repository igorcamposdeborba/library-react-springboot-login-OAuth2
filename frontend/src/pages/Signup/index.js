import React, { useState } from "react";
import { Toast, ToastContainer } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Logo from "../../components/Logo";
import useAuth from "../../hooks/UseAuth";
import * as C from "./styles";

const Signup = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        emailConfirm: "",
        password: "",
    });

    const [error, setError] = useState(""); // Erro do formulario 
    const [showToast, setShowToast] = useState(false); // Estado para controlar a exibição da notificação
    const [toastMessage, setToastMessage] = useState(''); // Mensagem da notificação

    const handleSignup = async () => {
        const { firstName, lastName, email, emailConfirm, password } = formData;
    
        if (!firstName || !lastName || !email || !emailConfirm || !password) {
            setError("Preencha todos os campos");
            return;
        }
    
        if (email !== emailConfirm) {
            setError("Os emails não são iguais");
            return;
        }
    
        try {
            const response = await signup(firstName, lastName, email, password); // Comunicacao com back-end: cadastro na lógica global do auth.js que está no topo da hierarquia de rotas
            
            if (response && response.error) {
                setError(response.error);
                return;
            }
    
            const responseData = await response.json();
            localStorage.setItem("auth_token", responseData.token); // Armazenar token no localStorage

            setToastMessage("Cadastro realizado com sucesso!");
            setShowToast(true);
    
            setTimeout(() => navigate("/"), 1700);
        } catch (err) {
            setError("Erro ao conectar com o servidor. Tente novamente.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "firstName") {
            processFullName(value);
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value,
            }));
        }

        setError(""); // Resetar erro ao digitar
    };

    const processFullName = (fullName) => {
        const [firstName, ...lastNameParts] = fullName.split(" ");
        setFormData((prevState) => ({
            ...prevState,
            firstName: firstName || "",
            lastName: lastNameParts.join(" ") || "",
        }));
    };

    return (
        <C.Container className="signup">
            <Logo />
            <C.Label>Cadastro</C.Label>
            <C.Content>
                <Input
                    type="text"
                    name="firstName"
                    placeholder="Nome completo"
                    value={`${formData.firstName}${formData.lastName ? " " + formData.lastName : ""}`}
                    onChange={handleChange}
                />
                <Input
                    type="email"
                    name="email"
                    placeholder="Digite seu e-mail"
                    value={formData.email}
                    onChange={handleChange}
                />
                <Input
                    type="email"
                    name="emailConfirm"
                    placeholder="Confirme seu e-mail"
                    value={formData.emailConfirm}
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    value={formData.password}
                    onChange={handleChange}
                    onKeyDown={(keyboard) => keyboard.key === "Enter" && handleSignup()}
                />
                <C.Small>Mínimo 6 caracteres</C.Small>

                <C.LabelError>{error}</C.LabelError>
                <C.Button onClick={handleSignup}>Inscreva-se</C.Button>

                <C.LabelSignin>
                    Já tem uma conta?
                    <C.Strong>
                        <Link to="/">&nbsp;Entre</Link>
                    </C.Strong>
                </C.LabelSignin>
            </C.Content>

            {/* Notificacao */}
            <ToastContainer position="top-end" className="p-3">
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={2000} autohide>
                    <Toast.Header>
                        <strong className="me-auto">Sucesso</strong>
                    </Toast.Header>
                    <Toast.Body>{toastMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </C.Container>
    );
};

export default Signup;
