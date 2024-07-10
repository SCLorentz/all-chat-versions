const http = require('http');

const server = http.createServer((req, res) => {
  // Aqui você pode lidar com as solicitações HTTP, mas para um chat, você usaria um protocolo diferente, como o TCP.
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Servidor local em execução!\n');
});

const PORT = 9999; // Escolha uma porta disponível

server.listen(PORT, () => {
  console.log(`Servidor está ouvindo na porta ${PORT}`);
});
