const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const fs = require('fs');
const app = express();
const server = http.createServer(app);  // Criar servidor HTTP usando o app do Express
const io = socketIO(server);  // Conectar Socket.IO ao servidor HTTP
const { format } = require('date-fns');
const port = 3000;

// Middleware para configurar CSP
app.use((req, res, next) => {
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: *");
    next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.get('/:page', function (req, res) {
    const filePath = __dirname + '/public/' + req.params.page + '.html';
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).sendFile(path.join(__dirname, '404.html'));
    }
});
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

function modificarNomePorId(id, novoNome) {
    const dataFilePath = path.join(__dirname, 'data.json');
    let dadosExistentes = [];

    try {
        const dataFileContent = fs.readFileSync(dataFilePath, 'utf8');
        dadosExistentes = JSON.parse(dataFileContent);

        const objetoEncontrado = dadosExistentes.find(objeto => objeto.id === id);

        if (objetoEncontrado) {
            objetoEncontrado.name = novoNome;
            fs.writeFileSync(dataFilePath, JSON.stringify(dadosExistentes), 'utf8');
            console.log(`Nome do grupo (id: ${id}) modificado com sucesso!`);
        } else {
            console.error('Objeto não encontrado com o ID fornecido.');
        }
    } catch (error) {
        console.error('Erro ao ler ou escrever no arquivo:', error);
    }
}

app.post('/modificar-nome', (req, res) => {
    const { id, novoNome } = req.body;
    if (id && novoNome) {
        const currentTime = format(new Date(), 'HH:mm');
        modificarNomePorId(id, novoNome);
        res.send(`${currentTime}> Nome do grupo (id: ${id}) modificado com sucesso!`);
    } else {
        res.status(400).send('Parâmetros inválidos.');
    }
});

function adicionarGuestPorId(id, guest) {
    const dataFilePath = path.join(__dirname, 'data.json');
    let dadosExistentes = [];

    try {
        const dataFileContent = fs.readFileSync(dataFilePath, 'utf8');
        dadosExistentes = JSON.parse(dataFileContent);

        const objetoEncontrado = dadosExistentes.find(objeto => objeto.id === id);

        if (objetoEncontrado) {
            objetoEncontrado.guests.push(guest);
            fs.writeFileSync(dataFilePath, JSON.stringify(dadosExistentes), 'utf8');
            console.log(`Participante do grupo (id: ${id}) adicionado com sucesso!`);
        } else {
            console.error('Objeto não encontrado com o ID fornecido.');
        }
    } catch (error) {
        console.error('Erro ao ler ou escrever no arquivo:', error);
    }
}

app.post('/add-guest', (req, res) => {
    const { id, guest } = req.body;
    if (id && guest) {
        const currentTime = format(new Date(), 'HH:mm');
        adicionarGuestPorId(id, guest);
        res.send(`${currentTime}> Participante do grupo (id: ${id}) adicionado com sucesso!`);
    } else {
        res.status(400).send('Parâmetros inválidos.');
    }
});

// Rota para a página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'chat2.html'));
});

io.on('connection', (socket) => {
    const clientIpAddress = socket.handshake.address;
    const currentTime = format(new Date(), 'HH:mm');
    console.log(`${currentTime}> Um usuario se conectou do endereço IP: ${clientIpAddress}`);
    socket.on('disconnect', () =>
        console.log(`${currentTime}> Um usuario se desconectou do endereço IP: ${clientIpAddress}`)
    );
});

server.listen(port, '0.0.0.0', () => {
    const currentTime = format(new Date(), 'HH:mm');
    console.log(`${currentTime}> Servidor rodando em http://localhost:${port}`);
});