const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "meuBanco"
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/cadastro", (req, res) => {
  res.sendFile(__dirname + "/cadastro.html");
});
app.get("/cadastroProd", (req, res) => {
  res.sendFile(__dirname + "/cadastroProd.html");
});


app.post("/cadastro", (req, res) => {
  const { nome, endereco, idade, genero } = req.body;
  if (!nome || !endereco || !idade || !genero) {
    res.status(400).send("Nome, endereço, idade e genero são campos obrigatórios.");
    return;
  }

  const cliente = { nome, endereco, idade, genero};
  connection.query("INSERT INTO clientes SET ?", cliente, (err, result) => {
    if (err) throw err;
    console.log(`Cliente ${nome} cadastrado com sucesso!`);
    res.redirect("/");
  });
});
//123

app.post("/cadastroProd", (req, res) => {
  const { nomep, preco, estoque, dataV } = req.body;
  if (!nomep || !preco || !estoque || !dataV) {
    res.status(400).send("Nome, preco, estoque e validade são campos obrigatórios.");
    return;
  }

  const produtos = { nomep, preco, estoque, dataV };
  connection.query("INSERT INTO produtos SET ?", produtos, (err, result) => {
    if (err) throw err;
    console.log(`produtos ${nomep} cadastrado com sucesso!`);
    res.redirect("/");
  });
});

// Rota para processar a listagem
app.get('/listagemProd', (req, res) => {

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
              <th>Nome</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Validade</th>
            </tr>
    `;
    
    results.forEach((produtos) => {
      html += `
        <tr>
          <td>${produtos.nomep}</td>
          <td>${produtos.preco}</td>
          <td>${produtos.estoque}</td>
          <td>${produtos.datav}</td>
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
              <th>Endereco</th>
              <th>Idade</th>
              <th>Genero</th>
            </tr>
    `;
    
    results.forEach((cliente) => {
      html += `
        <tr>
          <td>${cliente.nome}</td>
          <td>${cliente.endereco}</td>
          <td>${cliente.idade}</td>
          <td>${cliente.genero}</td>
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

// Rota para processar a consulta
app.post('/consulta', (req, res) => {
  //const nome = req.body.nome;
  const { nome, endereco, idade, genero } = req.body;
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
              <th>Idade</th>
              <th>Genero</th>
            </tr>
    `;
    
    results.forEach((cliente) => {
      html += `
        <tr>
          <td>${cliente.nome}</td>
          <td>${cliente.endereco}</td>
          <td>${cliente.idade}</td>
          <td>${cliente.genero}</td>
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

// Rota para exibir o formulário de consulta dos produtos
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
          <label for="nomep">Nome:</label>
          <input type="text" id="nomep" name="nomep"><br><br>
          <button type="submit">Consultar</button>
        </form>
      </body>
    </html>
  `);
});
app.post('/consultaProd', (req, res) => {
  //const nome = req.body.nome;
  const { nomep, preco, estoque, datav } = req.body;
  //const endereco = req.body.endereco;
  
  // Consulta no banco de dados
  connection.query(`SELECT * FROM produtos WHERE nomep LIKE '%${nomep}%'`, (error, results, fields) => {
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
              <th>Nome</th>
              <th>Preço</th>
              <th>Estoque</th>
              <th>Validade</th>
            </tr>
    `;
    
    results.forEach((produtos) => {
      html += `
        <tr>
          <td>${produtos.nomep}</td>
          <td>${produtos.preco}</td>
          <td>${produtos.estoque}</td>
          <td>${produtos.datav}</td>
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
