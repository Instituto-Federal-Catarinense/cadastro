const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const app = express();

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
  }

  const cliente = { nome, endereco, CPF, nascimento };
  connection.query("INSERT INTO clientes SET ?", cliente, (err, result) => {
    if (err) throw err;
    console.log(`Cliente ${nome} cadastrado com sucesso!`);
    res.redirect("/");
  });
});

app.post("/cadastroprodutos", (req, res) => {
  const {descricao , quantidade, valor } = req.body;
  if (!descricao || !quantidade || !valor) {
    res.status(400).send("Nome e endereço são campos obrigatórios.");
    return;
  }

  const produto = { descricao, quantidade, valor };
  connection.query("INSERT INTO produtos SET ?", produto, (err, result) => {
    if (err) throw err;
    console.log(`Produto ${produto.descricao} cadastrado com sucesso!`);
    res.redirect("/");
  });  
});

// Rota para processar a listagem de clientes
app.get('/listagemclientes', (req, res) => {

  // Consulta no banco de dados
  connection.query(`SELECT * FROM clientes`, (error, results, fields) => {
    if (error) throw error;
    
    // Exibição dos resultados
    let html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Clientes</title>
        </head>
        <body>
          <h1>Clientes encontrados</h1>
          <table>
            <tr>
              <th>Nome</th>
              <th>endereco</th>
              <th>CPF</th>
              <th>nascimento</th>
            </tr>
    `;
    
    results.forEach((cliente) => {
      html += `
        <tr>
          <td>${cliente.nome}</td>
          <td>${cliente.endereco}</td>
          <td>${cliente.CPF}</td>
          <td>${cliente.nascimento}</td>
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

// Rota para processar a listagem de produtos
app.get('/listagemprodutos', (req, res) => {

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
          <h1>Produtos cadastrados</h1>
          <table>
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor unitário</th>
            </tr>
    `;
    
    results.forEach((produto) => {
      html += `
        <tr>
          <td>${produto.ID}</td>
          <td>${produto.descricao}</td>
          <td>${produto.quantidade}</td>
          <td>${produto.valor}</td>
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
app.get('/consultaclientes', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Consulta de clientes</title>
      </head>
      <body>
        <h1>Consulta de clientes</h1>
        <form method="POST" action="/consulta">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" name="nome"><br><br>
          <button type="submit">Consultar</button>
        </form>
        <a href="/">Voltar</a>
      </body>
    </html>
  `);
});

// Rota para processar a consulta
app.post('/consultaclientes', (req, res) => {
  //const nome = req.body.nome;
  const { nome, endereco } = req.body;
  //const endereco = req.body.endereco;
  
  // Consulta no banco de dados
  connection.query(`SELECT * FROM clientes WHERE nome LIKE '%${nome}%'`, (error, results, fields) => {
    if (error) throw error;
    
    // Exibição dos resultados
    let html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Clientes</title>
        </head>
        <body>
          <h1>Clientes encontrados</h1>
          <table>
            <tr>
              <th>Nome</th>
              <th>endereco</th>
            </tr>
    `;
    
    results.forEach((cliente) => {
      html += `
        <tr>
          <td>${cliente.nome}</td>
          <td>${cliente.endereco}</td>
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
app.get('/consultaprodutos', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Consulta de produtos</title>
      </head>
      <body>
        <h1>Consulta de produtos</h1>
        <form method="POST" action="/consultaprodutos">
          <label for="descricao">Nome:</label>
          <input type="text" id="descricao" name="descricao"><br><br>
          <button type="submit">Consultar</button>
        </form>
        <a href="/">Voltar</a>
      </body>
    </html>
  `);
});

// Rota para processar a consulta
app.post('/consultaprodutos', (req, res) => {
  //const nome = req.body.nome;
  const { descricao } = req.body;
  //const endereco = req.body.endereco;
  
  // Consulta no banco de dados
  connection.query(`SELECT * FROM produtos WHERE descricao LIKE '%${descricao}%'`, (error, results, fields) => {
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
              <th>ID</th>
              <th>Descrição</th>
            </tr>
    `;
    
    results.forEach((produto) => {
      html += `
        <tr>
          <td>${produto.ID}</td>
          <td>${produto.descricao}</td>
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
