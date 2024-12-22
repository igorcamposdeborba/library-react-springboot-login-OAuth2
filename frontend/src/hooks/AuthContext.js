
import axios from 'axios';

// Hook: adiciona um interceptor de requisição para incluir o token no cabeçalho de cada requisição
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth_token"); // Obter o token do localStorage
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`; // Adicionar o token no cabeçalho
    }
    return config;  // Retorna a configuração da requisição
}, (error) => {
    return Promise.reject(error);  // Caso haja erro na requisição, rejeitar a promise
});