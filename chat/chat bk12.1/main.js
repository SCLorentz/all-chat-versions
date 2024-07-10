const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');
const app = express();
const server = http.createServer(app);  // Criar servidor HTTP usando o app do Express
const io = socketIO(server);  // Conectar Socket.IO ao servidor HTTP
const port = 3000;

// Middleware para configurar CSP
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data:");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

// Rota para receber dados do cliente
app.post('/salvar-dados', (req, res) => {
    const dadosRecebidos = req.body;
    console.log('Dados recebidos:', dadosRecebidos);
    const dataFilePath = path.join(__dirname, 'data.json');
    let dadosExistentes = [];
    try {
        const dataFileContent = fs.readFileSync(dataFilePath, 'utf8');
        dadosExistentes = JSON.parse(dataFileContent);
    } catch (error) { }
    dadosExistentes.push(dadosRecebidos);
    fs.writeFileSync(dataFilePath, JSON.stringify(dadosExistentes), 'utf8');
});

// Rota para enviar a mensagem
app.post('/enviar-dados', (req, res) => {
    const dataFilePath = path.join(__dirname, 'data.json');
    try {
        // Lê os dados do arquivo data.json
        const dataFileContent = fs.readFileSync(dataFilePath, 'utf8');
        const dados = JSON.parse(dataFileContent);
        // Envia os dados como resposta
        res.json(dados);
    } catch (error) {
        console.error('Erro ao ler o arquivo data.json:', error);
        res.status(500).send('Erro interno ao processar a solicitação');
    }
});

// Rota para a página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'chat2.html'));
});

io.on('connection', (socket) => {
    console.log('Um cliente se conectou');
    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

server.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});