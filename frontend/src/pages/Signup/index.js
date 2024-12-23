import React, { useState } from "react";
import { Toast, ToastContainer } from "react-bootstrap";
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

    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

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
            const result = await signup(firstName, lastName, email, password);
            
            if (typeof result === "string") {
                setError(result);
                return;
            }

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

            {/* Notificação */}
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
