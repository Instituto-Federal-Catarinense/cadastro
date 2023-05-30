const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const app = express();
const consulta = require('./meusModulos/consultaSQL.js');
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "bancodoJojo"
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/cadastroclientes", (req, res) => {
  res.sendFile(__dirname + "/cadastro.html");
});

app.get("/cadastroprodutos", (req, res) => {
  res.sendFile(__dirname + "/cadastroprodutos.html");
});

app.post("/cadastroclientes", (req, res) => {
  const { nome, endereco , CPF, nascimento } = req.body;
  if (!nome || !endereco || !CPF || !nascimento) {
    res.status(400).send("Nome e endereço são campos obrigatórios.");
    return;
  } else {
    consulta.cadastrarCliente(nome, endereco, CPF, nascimento, res);
  }
});

app.post("/cadastroprodutos", (req, res) => {
  const {descricao , quantidade, valor } = req.body;
  if (!descricao || !quantidade || !valor) {
    res.status(400).send("Nome e endereço são campos obrigatórios.");
    return;
  } else {
    consulta.cadastrarProduto(descricao, quantidade, valor, res);
  }

});

// Rota para processar a listagem de clientes
app.get('/listagemclientes', (req, res) => {

  // Consulta no banco de dados
  consulta.consultarClientes(res);

});

// Rota para processar a listagem de produtos
app.get('/listagemprodutos', (req, res) => {
  consulta.consultarProdutos(res);
});

// Rota para exibir o formulário de consulta
app.get('/consultaclientes', (req, res) => {
 consulta.consultarCliente (res);
});

app.post('/consultaclientes', (req, res) => {
   //const nome = req.body.nome;
 const { nome} = req.body;
 //const endereco = req.body.endereco;
  consulta.buscarCliente (nome,res);
});

// Rota para exibir o formulário de consulta
app.get('/consultaprodutos', (req, res) => {
  consulta.consultarProduto(res);
});

// Rota para processar a consulta
app.post('/consultaprodutos', (req, res) => {
  //const nome = req.body.nome;
  const { descricao } = req.body;
  //const endereco = req.body.endereco;
  consulta.buscarProduto (res, descricao);
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados MySQL!");
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});
