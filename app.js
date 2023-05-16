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

app.get("/produtos", (req, res) => {
  res.sendFile(__dirname + "/produtos.html");
});

app.post("/cadastro", (req, res) => {
  const { nome, sobrenome,endereco,idade } = req.body;
  if (!nome || !sobrenome || !endereco || !idade) {
    res.status(400).send("Nome e endereço são campos obrigatórios.");
    return;
}
  const cliente = { nome, sobrenome, endereco, idade };
  connection.query("INSERT INTO clientes SET ?", cliente, (err, result) => {
    if (err) throw err;
    console.log(`Cliente ${nome} cadastrado com sucesso!`);
    res.redirect("/");
  });
});

app.post("/produtos", (req, res) => {
  const { nomedoproduto, valor,quantidade,validade } = req.body;
  if (!nomedoproduto || !valor || !quantidade || !validade) {
    res.status(400).send("Nome do produto e valor são campos obrigatórios.");
    return;
}

  const produtos = { nomedoproduto, valor, quantidade, validade };
  connection.query("INSERT INTO produtos SET ?", produtos, (err, result) => {
    if (err) throw err;
    console.log(`produtos ${nomedoproduto} cadastrado com sucesso!`);
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
              <th>sobrenome</th>
              <th>endereco</th>
              <th>idade</th>
            </tr>

            
    `;
    
    results.forEach((cliente) => {
      html += `
        <tr>
          <td>${cliente.nome}</td>
          <td>${cliente.sobrenome}</td>
          <td>${cliente.endereco}</td>
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
  const { nome, sobrenome,endereco, idade } = req.body;
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
              <th>sobrenome</th>
              <th>endereco</th>
              <th>idade</th>
            </tr>
    `;
    
    results.forEach((cliente) => {
      html += `
        <tr>
          <td>${cliente.nome}</td>
          <td>${cliente.sobrenome}</td>
          <td>${cliente.endereco}</td>
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

app.get('/listagemdeprodutos', (req, res) => {

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
app.get('/consultarprodutos', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Consulta dos Produtos</title>
      </head>
      <body>
        <h1>Consulta dos Produtos</h1>
        <form method="POST" action="/consultarprodutos">
          <label for="nome">Nome do Produto:</label>
          <input type="text" id="nome" name="nomedoproduto"><br><br>
          <button type="submit">Consultar</button>
        </form>
      </body>
    </html>
  `);
});

// Rota para processar a consulta
app.post('/consultarprodutos', (req, res) => {
  
  const { nomedoproduto} = req.body;
  
  
  // Consulta no banco de dados
  connection.query(`SELECT * FROM produtos WHERE nomedoproduto LIKE '%${nomedoproduto}%'`, (error, results, fields) => {
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

connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados MySQL!");
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});
