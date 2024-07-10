const mysql = require('mysql2');

// Configuração da conexão com o banco de dados
const connection = mysql.createConnection({
  host: 'localhost', // Endereço do servidor MySQL
  user: 'seu-usuario', // Nome de usuário do banco de dados
  password: 'sua-senha', // Senha do banco de dados
  database: 'nome-do-banco' // Nome do banco de dados
});

// Conectar ao banco de dados
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conexão bem-sucedida ao banco de dados MySQL!');
    // Aqui você pode começar a executar consultas SQL e realizar operações no banco de dados
  }
});
