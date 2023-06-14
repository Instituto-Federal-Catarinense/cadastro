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
  database: 'meuBanco'
});

// Conexão com o banco de dados
connection.connect();

// Rota para exibir o formulário de consulta
app.get('/consultap', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Consulta de produto</title>
      </head>
      <body>
        <h1>Consulta de produto</h1>
        <form method="POST" action="/produto">
          <label for="nomep">Nome:</label>
          <input type="text" id="nomep" name="nomep"><br><br>
          <label for="codp">codigo:</label>
          <input type="text" id="codp" name="codp"><br><br>
          <button type="submit">Consultar</button>
        </form>
      </body>
    </html>
  `);
});

// Rota para processar a consulta
app.post('/produto', (req, res) => {
  //const nome = req.body.nome;
  const { nomep, codp } = req.body;
  //const endereco = req.body.endereco;

  // Consulta no banco de dados
  connection.query(`SELECT * FROM produto WHERE nomep LIKE '%${nomep}%'`, (error, results, fields) => {
    if (error) throw error;

    // Exibição dos resultados
    let html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>produto</title>
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
          <h1>produto encontrados</h1>
          <table>
            <tr>
              <th>Nome</th>
              <th>codigo</th>
            </tr>
    `;

    results.forEach((produto) => {
      html += `
        <tr>
          <td>${produto.nomep}</td>
          <td>${produto.codp}</td>
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