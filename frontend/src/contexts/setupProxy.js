const { createProxyMiddleware } = require('http-proxy-middleware');

// Proxy para evitar problema de CORS
module.exports = function (app) {
  app.use(
    "/", // Rota que será interceptada
    createProxyMiddleware({
      target: "http://localhost:8080", // URL da API
      changeOrigin: true, // Necessário para alterar o cabeçalho Host
      pathRewrite: {
        "^/api": "", // Remove o prefixo "/api" da URL (opcional)
      },
    })
  );
};