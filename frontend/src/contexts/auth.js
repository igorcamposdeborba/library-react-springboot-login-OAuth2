import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("auth_token") || null);

    // Sempre que carregar a aplicação, verificar se o usuário está logado com o token
    useEffect(() => {
        const storedToken = localStorage.getItem("auth_token"); // Obtém o token do localStorage
        const usersStorage = localStorage.getItem("users_db"); // Obtém os usuários cadastrados no localStorage
    
        if (storedToken && usersStorage) {
            try {
                const parsedUsers = JSON.parse(usersStorage);
                const tokenParts = storedToken.split("."); // Divide o token em três partes
                if (tokenParts.length === 3) {
                    const payload = tokenParts[1]; // Pega a parte do payload
                    const decodedPayload = JSON.parse(atob(payload)); // Decodifica o payload do JWT
    
                    // Procura o usuário com base no email encontrado no token
                    const hasUser = parsedUsers?.find(
                        (user) => user.email === decodedPayload?.user_name
                    );
    
                    if (hasUser) {
                        setUser(hasUser);
                        setToken(storedToken);
                    } else {
                        console.warn("Usuário correspondente ao token não encontrado.");
                    }
                }
            } catch (error) {
                console.error("Erro ao processar o token ou os usuários:", error);
            }
        }
    }, []);  // Executa uma vez ao carregar o componente

    // UseEffect para configurar o header do Axios com o token assim que ele mudar
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
    }, [token]); // Configura o token sempre que o estado "token" mudar

    // Método para LOGAR usuário
    const signin = async (email, password) => {
        const response = await fetch("/oauth/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + btoa("app:123456"), // Basic Auth para o servidor OAuth
            },
            body: new URLSearchParams({
                grant_type: "password",
                username: email,
                password: password,
            }),
            credentials: "include",
        });
    
        if (response.ok) {
            const data = await response.json();
            const { access_token } = data;
    
            // Salvar o token no localStorage
            localStorage.setItem("auth_token", access_token);
    
            // Atualizar o estado com o novo token e o usuário
            setToken(access_token);
            setUser({ email });
    
            return null; // Indica que o login foi bem-sucedido
        } else {
            const error = await response.json();
            return error.error_description.toString();  // Retorna uma mensagem de erro, caso o login falhe
        }
    };

    // Método para CADASTRAR usuário
    const signup = async (firstName, lastName, email, password) => {
        try {
            const response = await fetch("/oauth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ firstName, lastName, email, password }),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
    
                // Verificar se há mensagens personalizadas no erro
                if (errorData.errorMessageCustomized?.length > 0) {
                    return errorData.errorMessageCustomized
                        .map((err) => err.message)
                        .join(" | ");
                } else {
                    return errorData.message || "Erro desconhecido.";
                }
            }
    
            // Se o cadastro for bem-sucedido, retornamos os dados do usuário criado
            const data = await response.json();
            return data;
        } catch (err) {
            return "Erro ao conectar com o servidor. Tente novamente.";
        }
    };
    

    // Método para DESLOGAR usuário
    const signout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("auth_token");
    
        // Limpar o cabeçalho de autenticação
        delete axios.defaults.headers.common["Authorization"]; // Usar delete para garantir que o header seja removido
    };

    return (
        <AuthContext.Provider value={{ user, signed: !!user, signin, signup, signout }}>
            {children}
        </AuthContext.Provider>
    );
};
