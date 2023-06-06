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
  password: '',
  database: 'meubanco'
});

// Conexão com o banco de dados
connection.connect();

// Rota para processar a consulta
app.post('/produtos', (req, res) => {

  // Consulta no banco de dados
  connection.query(`SELECT * FROM produtos`, (error, results, fields) => {
    if (error) throw error;
    
    // Exibição dos resultados
    let html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>produtos</title>
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
              <th>id</th>
              <th>descricao</th>
              <th>quantidade</th>
              <th>valor</th>
            </tr>
    `;
    
    results.forEach((produtos) => {
      html += `
        <tr>
          <td>${produtos.id}</td>
          <td>${produtos.descricao}</td>
          <td>${produtos.quantidade}</td>
          <td>${produtos.valor}</td>
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