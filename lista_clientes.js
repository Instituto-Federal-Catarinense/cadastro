const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Configurações do banco de dados
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'aluno01',
  database: 'meuBanco'
});

// Conexão com o banco de dados
connection.connect();

// Rota para processar a consulta
app.post('/clientes', (req, res) => {

  // Consulta no banco de dados
  connection.query(`SELECT * FROM clientes`, (error, results, fields) => {
    if (error) throw error;
    
    let html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Clientes</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 20px;
          }
  
          h1 {
            color: #333;
          }
  
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
  
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
  
          th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <h1>Clientes encontrados</h1>
        <table>
          <tr>
            <th>Nome</th>
            <th>Endereço</th>
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
        </body>
      </html>
    `;
    
    res.send(html);
  });
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
