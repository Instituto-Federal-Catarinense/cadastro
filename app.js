const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Crie uma pasta 'public' para armazenar seus arquivos estáticos (CSS, JavaScript, imagens, etc.).

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "aluno01",
  database: "meuBanco"
});

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Rota de cadastro
app.get("/cadastro", (req, res) => {
  res.sendFile(__dirname + "/cadastro.html");
});

app.post("/cadastro", (req, res) => {
  const { nome, endereco } = req.body;
  if (!nome || !endereco) {
    return res.status(400).send("Nome e endereço são campos obrigatórios.");
  }

  const cliente = { nome, endereco };
  connection.query("INSERT INTO clientes SET ?", cliente, (err, result) => {
    if (err) throw err;
    console.log(`Cliente ${nome} cadastrado com sucesso!`);
    res.redirect("/");
  });
});

// Rota de listagem
app.get('/listagem', (req, res) => {
  connection.query("SELECT * FROM clientes", (error, results, fields) => {
    if (error) throw error;
    res.render('listagem', { clientes: results }); // Crie um arquivo 'listagem.ejs' para exibir os resultados.
  });
});

// Rota de consulta
app.get('/consulta', (req, res) => {
  res.sendFile(__dirname + "/consulta.html");
});

app.post('/consulta', (req, res) => {
  const { nome } = req.body;
  connection.query("SELECT * FROM clientes WHERE nome LIKE ?", [`%${nome}%`], (error, results, fields) => {
    if (error) throw error;
    res.render('consulta', { clientes: results, nome }); // Crie um arquivo 'consulta.ejs' para exibir os resultados.
  });
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados MySQL!");
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});
