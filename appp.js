const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "aluno01",
  database: "meuBanco"
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/produto", (req, res) => {
  res.sendFile(__dirname + "/produtos.html");
});

app.post("/produto", (req, res) => {
  const { nomedoproduto, valor,quantidade,validade } = req.body;
  if (!nomedoproduto || !valor || !quantidade || !validade) {
    res.status(400).send("Nome do produto e valor são campos obrigatórios.");
    return;
  }

  const produto = { nomedoproduto, valor, quantidade, validade };
  connection.query("INSERT INTO produtos SET ?", produto, (err, result) => {
    if (err) throw err;
    console.log(`produtos ${nomedoproduto} cadastrado com sucesso!`);
    res.redirect("/");
  });
});

// Rota para processar a listagem
app.get('/listagem', (req, res) => {

  // Consulta no banco de dados
  connection.query(`SELECT * FROM produtos`, (error, results, fields) => {
    if (error) throw error;
    
    // Exibição dos resultados
    let html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Produtos</title>
        </head>
        <body>
          <h1>Produtos Encontrados</h1>
          <table>
            <tr>
              <th>Nome do Produto</th>
              <th>Valor</th>
              <th>Quantidade</th>
              <th>Validade</th>
            </tr>
    `;
    
    results.forEach((produto) => {
      html += `
        <tr>
          <td>${produto.nomedoproduto}</td>
          <td>${produto.valor}</td>
          <td>${produto.quantidade}</td>
          <td>${produto.validade}</td>

        </tr>
      `;
    });
    
    html += `
          </table>
          <a href="/">Voltar</a>
        </body>
      </html>
    `;
    
    res.send(html);
  });
});

// Rota para exibir o formulário de consulta
app.get('/produto', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Consulta dos Produtos</title>
      </head>
      <body>
        <h1>Consulta dos Produtos</h1>
        <form method="POST" action="/produto">
          <label for="nome">Nome do Produto:</label>
          <input type="text" id="nome" name="nome"><br><br>
          <button type="submit">Consultar</button>
        </form>
      </body>
    </html>
  `);
});

// Rota para processar a consulta
app.post('/produto', (req, res) => {
  //const nome = req.body.nome;
  const { nome, sobrenome,endereco, idade } = req.body;
  //const endereco = req.body.endereco;
  
  // Consulta no banco de dados
  connection.query(`SELECT * FROM produtos WHERE nome LIKE '%${nomedoproduto}%'`, (error, results, fields) => {
    if (error) throw error;
    
    // Exibição dos resultados
    let html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Produtos</title>
        </head>
        <body>
          <h1>Produtos encontrados</h1>
          <table>
            <tr>
              <th>Nome do Produto</th>
              <th>Valor</th>
              <th>Quantidade</th>
              <th>Validade</th>
            </tr>
    `;
    
    results.forEach((produto) => {
      html += `
        <tr>
          <td>${produto.nome}</td>
          <td>${produto.sobrenome}</td>
          <td>${produto.endereco}</td>
          <td>${produto.idade}</td>
        </tr>
      `;
    });
    
    html += `
          </table>
          <a href="/">Voltar</a>
        </body>
      </html>
    `;
    
    res.send(html);
  });
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados MySQL!");
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});