<<<<<<< HEAD
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
=======
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
>>>>>>> be5067466cdf1fd93ebed76c4b108404658d3723
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Configurações do banco de dados
const connection = mysql.createConnection({
<<<<<<< HEAD
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "meuBanco",
=======
  host: '127.0.0.1',
  user: 'root',
  password: 'A1b1c1d1',
  database: 'meuBanco'
>>>>>>> be5067466cdf1fd93ebed76c4b108404658d3723
});

// Conexão com o banco de dados
connection.connect();

// Rota para exibir o formulário de consulta
<<<<<<< HEAD
app.get("/consulta", (req, res) => {
=======
app.get('/consulta', (req, res) => {
>>>>>>> be5067466cdf1fd93ebed76c4b108404658d3723
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Consulta de clientes</title>
      </head>
      <body>
        <h1>Consulta de clientes</h1>
        <form method="POST" action="/clientes">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" name="nome"><br><br>
          <label for="endereco">Endereço:</label>
          <input type="text" id="endereco" name="endereco"><br><br>
          <button type="submit">Consultar</button>
        </form>
      </body>
    </html>
  `);
});

// Rota para processar a consulta
<<<<<<< HEAD
app.post("/clientes", (req, res) => {
  //const nome = req.body.nome;
  const { nome, endereco } = req.body;
  //const endereco = req.body.endereco;

  // Consulta no banco de dados
  connection.query(
    `SELECT * FROM clientes WHERE nome LIKE '%${nome}%'`,
    (error, results, fields) => {
      if (error) throw error;

      // Exibição dos resultados
      let html = `
=======
app.post('/clientes', (req, res) => {
  //const nome = req.body.nome;
  const { nome, endereco } = req.body;
  //const endereco = req.body.endereco;
  
  // Consulta no banco de dados
  connection.query(`SELECT * FROM clientes WHERE nome LIKE '%${nome}%'`, (error, results, fields) => {
    if (error) throw error;
    
    // Exibição dos resultados
    let html = `
>>>>>>> be5067466cdf1fd93ebed76c4b108404658d3723
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
<<<<<<< HEAD
              <th>Sexo<th>
              <th>Idade<th>
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
=======
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
>>>>>>> be5067466cdf1fd93ebed76c4b108404658d3723
          </table>
        </body>
      </html>
    `;
<<<<<<< HEAD

      res.send(html);
    }
  );
=======
    
    res.send(html);
  });
>>>>>>> be5067466cdf1fd93ebed76c4b108404658d3723
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
