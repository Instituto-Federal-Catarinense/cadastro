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
app.get('/pconsulta', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Consulta de produtos</title>
      </head>
      <body>
        <h1>Consulta de produtos</h1>
        <form method="POST" action="/produtos">
          <label for="id">Id:</label>
          <input type="text" id="id" name="id"><br><br>
          <label for="descricao">Descrição:</label>
          <input type="text" id="descricao" name="descricao"><br><br>
          <button type="submit">Consultar</button>
          <label for="quantidade">Quantidade:</label>
          <input type="text" id="quantidade" name="quantidade" required>
          <label for="idade">Valor:</label>
          <input type="text" id="valor" name="valor" required>
        </form>
      </body>
    </html>
  `);
});

// Rota para processar a consulta
app.post('/produtos', (req, res) => {
  //const nome = req.body.nome;
  const { id, descricao, quantidade, valor } = req.body;
  //const endereco = req.body.endereco;
  
  // Consulta no banco de dados
  connection.query(`SELECT * FROM produtos WHERE nome LIKE '%${id}%'`, (error, results, fields) => {
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
              <th>Id</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor</th>
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
pconsulta.js
3 KB