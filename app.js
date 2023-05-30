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


// Clientes:

app.get("/cadastro", (req, res) => {
  res.sendFile(__dirname + "/cadastro.html");
});

app.post("/cadastro", (req, res) => {
  const { nome, endereco, sexo, idade } = req.body;
  if (!nome || !endereco || !sexo || !idade) {
    res.status(400).send("Nome e endereço são campos obrigatórios.");
    return;
  }

  const cliente = { nome, endereco, sexo, idade };
  connection.query("INSERT INTO clientes SET ?", cliente, (err, result) => {
    if (err) throw err;
    console.log(`Cliente ${nome} cadastrado com sucesso!`);
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
        </head>
        <body>
          <h1>Clientes encontrados</h1>
          <table>
            <tr>
              <th>Nome</th>
              <th>endereco</th>
              <th>Idade</th>
              <th>sexo</th>
            </tr>
    `;
    
    results.forEach((cliente) => {
      html += `
        <tr>
          <td>${cliente.nome}</td>
          <td>${cliente.endereco}</td>
          <td>${cliente.idade}</td>
          <td>${cliente.sexo}</td>
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
        <form method="POST" action="/consultaClientes">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" name="nome"><br><br>
          <button type="submit">Consultar</button>
        </form>
      </body>
    </html>
  `);
});

// Rota para processar a consulta
app.post('/consulta', (req, res) => {
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
              <th>Sexo</th>
              <th>Idade</th>
            </tr>
    `;
    
    results.forEach((cliente) => {
      html += `
        <tr>
          <td>${cliente.nome}</td>
          <td>${cliente.endereco}</td>
          <td>${cliente.sexo}</td>
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


// Produtos:


app.get("/cadProdutos", (req, res) => {
  res.sendFile(__dirname + "/cadProdutos.html");
});

app.post("/cadProdutos", (req, res) => {
  const { descricao , quantidade , valor } = req.body;
  if (!descricao || !quantidade || !valor) {
    res.status(400).send("Descrição, Quantidade e valor são campos obrigatórios.");
    return;
  }

  const produtos = { descricao, quantidade , valor };
  connection.query("INSERT INTO produtos SET ?", produtos, (err, result) => {
    if (err) throw err;
    console.log(`Produtos ${descricao} cadastrado com sucesso!`);
    res.redirect("/");
  });
});

// Rota para processar a listagem
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
        </head>
        <body>
          <h1>Produtos encontrados</h1>
          <table>
            <tr>
              <th>Descrição</th>
              <th>quantidade</th>
              <th>valor</th>
            </tr>
    `;
    
    results.forEach((produtos) => {
      html += `
        <tr>
          <td>${produtos.descricao}</td>
          <td>${produtos.quantidade}</td>
          <td>${produtos.valor}</td>
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
app.get('/consultaProduto', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Consulta de Produtos</title>
      </head>
      <body>
        <h1>Consulta de Produtos</h1>
        <form method="POST" action="/consultaProduto">
          <label for="descricao">Descrição:</label>
          <input type="text" id="descricao" name="descricao"><br><br>
          <button type="submit">Consultar</button>
        </form>
      </body>
    </html>
  `);
});

// Rota para processar a consulta
app.post('/consultaProduto', (req, res) => {
  //const descricao = req.body.nome;
  const { descricao, quantidade, valor } = req.body;
  //const quantidade = req.body.quantidade;
  
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
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor</th>
            </tr>
    `;
    
    results.forEach((produto) => {
      html += `
        <tr>
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
