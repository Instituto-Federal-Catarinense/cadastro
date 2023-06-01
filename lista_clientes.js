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
  password: "A1b1c1d1",
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

// Rota para processar a consulta
<<<<<<< HEAD
app.post("/clientes", (req, res) => {
  // Consulta no banco de dados
  connection.query(`SELECT * FROM clientes`, (error, results, fields) => {
    if (error) throw error;

=======
app.post('/clientes', (req, res) => {

  // Consulta no banco de dados
  connection.query(`SELECT * FROM clientes`, (error, results, fields) => {
    if (error) throw error;
    
>>>>>>> be5067466cdf1fd93ebed76c4b108404658d3723
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
<<<<<<< HEAD

=======
    
>>>>>>> be5067466cdf1fd93ebed76c4b108404658d3723
    results.forEach((cliente) => {
      html += `
        <tr>
          <td>${cliente.nome}</td>
          <td>${cliente.endereco}</td>
<<<<<<< HEAD
          <td>${cliente.sexo}</td>
          <td>${cliente.idade}</td>
        </tr>
      `;
    });

=======
        </tr>
      `;
    });
    
>>>>>>> be5067466cdf1fd93ebed76c4b108404658d3723
    html += `
          </table>
        </body>
      </html>
    `;
<<<<<<< HEAD

=======
    
>>>>>>> be5067466cdf1fd93ebed76c4b108404658d3723
    res.send(html);
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
