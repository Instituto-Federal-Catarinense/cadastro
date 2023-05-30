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

app.post("/cadastro", (req, res) => {
  const { nome, endereco, idade, sexo } = req.body;
  if (!nome || !endereco || !idade || !sexo) {
    res.status(400).send("Nome e endereço são campos obrigatórios.");
    return;
  }

  const cliente = { nome, endereco, idade, sexo };
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
              <th>endereco</th>
              <th>idade</th>
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
              <th>endereco</th>
              <th>idade</th>
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

//-------------------------------------------------------------------------------------------------------------------

// Rota para processar a listagemprod
app.get('/listagemprod', (req, res) => {

  // Consulta no banco de dados
  connection.query(`SELECT * FROM produto`, (error, results, fields) => {
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
          <h1>Produtos encontrados</h1>
          <table>
            <tr>
              <th>Nome</th>
              <th>código</th>
              <th>tipo</th>
              <th>peso</th>
            </tr>
    `;
    
    results.forEach((produto) => {
      html += `
        <tr>
          <td>${produto.nome}</td>
          <td>${produto.codigo}</td>
          <td>${produto.tipo}</td>
          <td>${produto.peso}</td>
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
app.get('/consultaprod', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Consulta de produto</title>
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
        <h1>Consulta de produtos</h1>
        <form method="POST" action="/consultaprod">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" name="nome"><br><br>
          <button type="submit">Consultar</button>
        </form>
      </body>
    </html>
  `);
});

// Rota para processar a consulta
app.post('/consultaprod', (req, res) => {
  //const nome = req.body.nome;
  const { nome } = req.body;
  //const endereco = req.body.endereco;
  
  // Consulta no banco de dados
  connection.query(`SELECT * FROM produto WHERE nome LIKE '%${nome}%'`, (error, results, fields) => {
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
          <h1>produtos encontrados</h1>
          <table>
            <tr>
              <th>Nome</th>
              <th>código</th>
              <th>tipo</th>
              <th>peso</th>
            </tr>
    `;
    
    results.forEach((produto) => {
      html += `
        <tr>
          <td>${produto.nome}</td>
          <td>${produto.codigo}</td>
          <td>${produto.tipo}</td>
          <td>${produto.peso}</td>
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

app.get("/cadastroprod", (req, res) => {
  res.sendFile(__dirname + "/cadastroprod.html");
});

app.post("/cadastroprod", (req, res) => {
  const { nome, codigo, tipo, peso } = req.body;
  if (!nome || !codigo || !tipo || !peso) {
    res.status(400).send("Nome e endereço são campos obrigatórios.");
    return;
  }

  const produto = { nome, codigo, tipo, peso };
  connection.query("INSERT INTO produto SET ?", produto, (err, result) => {
    if (err) throw err;
    console.log(`Produto ${nome} cadastrado com sucesso!`);
    res.redirect("/");
  });
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados MySQL!");
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});

