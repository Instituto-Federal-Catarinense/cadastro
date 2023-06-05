const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do banco de dados
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'aluno01',
  database: ''
});

// Rota para exibir a tela de cadastro
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/Cadastro');
});

// Rota para processar o cadastro
app.post('/Cadastro', (req, res) => {
  const { email, name, lastname, password, passconfirmation } = req.body;
  
  // Validação das informações
  if (!email ||!name ||!lastname ||!password ||!passconfirmation) {
    res.status(400).send('Todos os campos são campos obrigatórios.');
    return;
  }
  
  // Inserção dos dados no banco de dados
  const sql = 'INSERT INTO cadastro_usuários (email, nome, sobrenome, senha, confirmesenha) VALUES (?, ?, ?)';
  const values = [email, name, lastname, password, passconfirmation];
  connection.query(sql, values, (error, result) => {
    if (error) {
      console.log(error);
      res.status(500).send('Ocorreu um erro ao cadastrar o usuário.');
    } else {
      console.log('Usuário cadastrado com sucesso!');
      res.send('Usuário cadastrado com sucesso!');
    }
  });
});

// Inicialização do servidor
app.listen(4000, () => {
  console.log('Servidor iniciado na porta 4000');
});