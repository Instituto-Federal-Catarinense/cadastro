const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "nodejoedio"
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/:teste", (req, res) => {
  const teste = req.params.teste;
  //faça algo com o teste
  console.log('UserID')
});

app.get("/cadastro", (req, res) => {
  res.sendFile(__dirname + "/cadastro.html");
});

app.get("/cadastroProd", (req, res) => {
  res.sendFile(__dirname + "/cadastroProd.html");
});


app.post("/cadastro", (req, res) => {
  const { nome, endereco, sexo, cpf } = req.body;
  if (!nome || !endereco ||!sexo ||!cpf) {
    res.status(400).send("Nome e endereço são campos obrigatórios.");
    return;
  }

  const cliente = { nome, endereco };
  connection.query("INSERT INTO clientes SET ?", cliente, (err, result) => {
    if (err) throw err;
    console.log(`Cliente ${nome} cadastrado com sucesso!`);
    res.redirect("/");
  });
});

app.post("/cadastroProd", (req, res) => {
  const { nome, quantidade, validade, valor } = req.body;
  if (!nome || !quantidade ||!validade ||!valor) {
    res.status(400).send("Os campos são obrigatórios.");
    return;
  }

  const cadastroProd = { nome, quantidade, validade, valor };
  connection.query("INSERT INTO cadastroprod SET ?", cadastroProd, (err, result) => {
    if (err) throw err;
    console.log(`Produto ${nome} cadastrado com sucesso!`);
    res.redirect("/");
  });
});


app.get('/listagem', (req, res) => {
  connection.query(`SELECT * FROM clientes`, (error, results, fields) => {
    if (error) throw error;
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

app.get('/listagemProd', (req, res) => {
  connection.query(`SELECT * FROM cadastroprod`, (error, results, fields) => {
    if (error) throw error;
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
              <th>Nome</th>
              <th>Quant</th>
            </tr>
    `;
    
    results.forEach((produto) => {
      html += `
        <tr>
          <td>${produto.nome}</td>
          <td>${produto.quantidade}</td>
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

app.get('/consulta', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Consulta de Clientes</title>
      </head>
      <body>
        <h1>Consulta de produtos</h1>
        <form method="POST" action="/consulta">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" name="nome"><br><br>
          <button type="submit">Consultar</button>
        </form>
      </body>
    </html>
  `);
});

app.post('/consulta', (req, res) => {
  const { nome, endereco } = req.body;
  
  connection.query(`SELECT * FROM clientes WHERE nome LIKE '%${nome}%'`, (error, results, fields) => {
    if (error) throw error;
    
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
              <th>Endereço</th>
            </tr>
    `;
    
    results.forEach((clientes) => {
      html += `
        <tr>
          <td>${clientes.nome}</td>
          <td>${clientes.endereco}</td>
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

app.get('/consultaProd', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Consulta de produtos</title>
      </head>
      <body>
        <h1>Consulta de produtos</h1>
        <form method="POST" action="/consultaProd">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" name="nome"><br><br>
          <button type="submit">Consultar</button>
        </form>
      </body>
    </html>
  `);
});

app.post('/consultaProd', (req, res) => {
  const { nome, quant } = req.body;
  
  connection.query(`SELECT * FROM cadastroprod WHERE nome LIKE '%${nome}%'`, (error, results, fields) => {
    if (error) throw error;
    
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
              <th>Nome</th>
              <th>Quant</th>
            </tr>
    `;
    
    results.forEach((produto) => {
      html += `
        <tr>
          <td>${produto.nome}</td>
          <td>${produto.quantidade}</td>
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