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

app.get("/cadastro", (req, res) => {
  res.sendFile(__dirname + "/cadastro.html");
});

app.get("/cadastroProduto", (req, res) => {
  res.sendFile(__dirname + "/cadastroProduto.html");
});

app.post("/cadastro", (req, res) => {
  const { nome, endereco, altura, idade } = req.body;
  if (!nome || !endereco || !altura || !idade) {
    res.status(400).send("Nome, endereço, altura e idade são campos obrigatórios.");
    return;
  }

  const cliente = { nome, endereco, altura, idade };
  connection.query("INSERT INTO clientes SET ?", cliente, (err, result) => {
    if (err) throw err;
    console.log(`Cliente ${nome} cadastrado com sucesso!`);
    res.redirect("/");
  });
});

app.post("/cadastroProduto", (req, res) => {
  const { id, descricao, quantidade, valor } = req.body;
  if (!id || !descricao || !quantidade || !valor) {
    res.status(400).send("Id, descrição, quantidade e valor são campos obrigatórios.");
    return;
  }

  const produto = { id, descricao, quantidade, valor };
  connection.query("INSERT INTO produtos SET ?", produto, (err, result) => {
    if (err) throw err;
    console.log(`Produto ${id} cadastrado com sucesso!`);
    res.redirect("/");
  });
});

// Rota para processar a listagem
app.get('/listagem', (req, res) => {

  // Consulta no banco de dados
  connection.query(`SELECT * FROM clientes`, (error, results, fields) => {
    if (error) throw error;

    // Exibição dos resultados
    let html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Clientes</title>
            <style>
          table {
            border-collapse: collapse;
          }
          
          tr {
            border: 1px solid black;
          }
          
          th, td {
            border: 1px solid black;
            padding: 8px; 
          }
          </style>
          </head>
          <body>
            <h1>Clientes encontrados</h1>
            <table>
              <tr>
                <th>Nome</th>
                <th>endereço</th>
                <th>altura</th>
                <th>idade</th>
              </tr>
      `;

    results.forEach((cliente) => {
      html += `
          <tr>
            <td>${cliente.nome}</td>
            <td>${cliente.endereco}</td>
            <td>${cliente.altura}</td>
            <td>${cliente.idade}</td>
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

app.get('/listagemProduto', (req, res) => {
  // Consulta no banco de dados
  connection.query(`SELECT * FROM produtos`, (error, results, fields) => {
    if (error) throw error;
  
    // Exibição dos resultados
    let html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Produtos</title>
          <style>
          table {
            border-collapse: collapse;
          }
          
          tr {
            border: 1px solid black;
          }
          
          th, td {
            border: 1px solid black;
            padding: 8px; 
          }
          </style>
        </head>
        <body>
          <h1>Produtos encontrados</h1>
          <table>
            <tr>
              <th>Id</th>
              <th>Deiscrição</th>
              <th>Quantidade</th>
              <th>Valor</th>
            </tr>
    `;
  
    results.forEach((produto) => {
      html += `
        <tr>
          <td>${produto.id}</td>
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
app.get('/consulta', (req, res) => {
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
      </body>
    </html>
  `);
});

app.get('/consultaProduto', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Consulta de produtos</title>
      </head>
      <body>
        <h1>Consulta de produtos</h1>
        <form method="POST" action="/consultaProduto">
          <label for="id">Id:</label>
          <input type="text" id="id" name="id"><br><br>
          <button type="submit">Consultar</button>
        </form>
      </body>
    </html>
  `);
});

// Rota para processar a consulta
app.post('/consulta', (req, res) => {
  //const nome = req.body.nome;
  const { nome, endereco, altura, idade } = req.body;
  //const endereco = req.body.endereco;
  //const endereco = req.body.altura;
  //const endereco = req.body.idade;    

  // Consulta no banco de dados
  connection.query(`SELECT * FROM clientes WHERE nome LIKE '%${nome}%'`, (error, results, fields) => {
    if (error) throw error;


    // Exibição dos resultados
    let html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Clientes</title>
          <style>
          table {
            border-collapse: collapse;
          }
          
          tr {
            border: 1px solid black;
          }
          
          th, td {
            border: 1px solid black;
            padding: 8px; 
          }
          </style>
        </head>
        <body>
          <h1>Clientes encontrados</h1>
          <table>
            <tr>
              <th>Nome</th>
              <th>endereço</th>
              <th>altura</th>
              <th>idade</th>
            </tr>
    `;

    results.forEach((cliente) => {
      html += `
        <tr>
          <td>${cliente.nome}</td>
          <td>${cliente.endereco}</td>
          <td>${cliente.altura}</td>
          <td>${cliente.idade}</td>
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

app.post('/consultaProduto', (req, res) => {

  //const id = req.body.id;
  const { id, descricao, quantidade, valor } = req.body;
  //const descricao = req.body.descricao;
  //const descricao = req.body.quantidade;
  //const descricao = req.body.valor;

  connection.query(`SELECT * FROM produtos WHERE id LIKE '%${id}%'`, (error, results, fields) => {
    if (error) throw error;

    // Exibição dos resultados
    let html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Produto</title>
        <style>
          table {
            border-collapse: collapse;
          }
          
          tr {
            border: 1px solid black;
          }
          
          th, td {
            border: 1px solid black;
            padding: 8px; 
          }
          </style>
      </head>
      <body>
        <h1>Produtos encontrados</h1>
        <table>
          <tr>
            <th>Id</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor</th>
          </tr>
  `;

    results.forEach((produto) => {
      html += `
      <tr>
        <td>${produto.id}</td>
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

  connection.connect((err) => {
    if (err) throw err;
    console.log("Conectado ao banco de dados MySQL!");
  });

  app.listen(3000, () => {
    console.log("Servidor iniciado na porta 3000");
  });