const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const path = require ('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "aluno01",
  database: "meuBanco"
});

// Configurando o mecanismo de visualização Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Dados a serem passados para o template
const data = {
  pageTitle: 'Exemplo Pug Dinâmico com Express e Bootstrap',
  pageDescription: 'Esta é uma página de exemplo usando Pug com Express para valores dinâmicos e Bootstrap para layout responsivo.',
  items: ['Item 1', 'Item 2', 'Item 3']
};

// Rota para renderizar o template com os dados
app.get('/', (req, res) => {
  res.render('index', data);
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados MySQL!");
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});
