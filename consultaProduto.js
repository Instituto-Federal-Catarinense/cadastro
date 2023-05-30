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
app.get('/consultaProduto', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Consulta de produto</title>
      </head>
      <body>
        <h1>Consulta de produto</h1>
        <form method="POST" action="/produtos">
          <label for="id">id:</label>
          <input type="text" id="id" name="id"><br><br>
          <label for="descricao">descricao:</label>
          <input type="text" id="descricao" name="descricao"><br><br>
          <label for="quantidade">quantidade:</label>
          <input type="text" id="quantidade" name="quantidade"><br><br>
          <label for="valor">valor:</label>
          <input type="text" id="valor" name="valor"><br><br>
          <button type="submit">Consultar</button>
        </form>
      </body>
    </html>
  `);
});

// Rota para processar a consulta
app.post('/produtos', (req, res) => {
  //const id = req.body.id;
  const { id, descricao, quantidade, valor } = req.body;
  //const endereco = req.body.endereco;
  
  // Consulta no banco de dados
  connection.query(`SELECT * FROM produtos WHERE id LIKE '%${id}%'`, (error, results, fields) => {
    if (error) throw error;
    
    // Exibição dos resultados
    let html = `
      <!DOCTYPE html>
      <html>
        </head>
        <body>
          <h1>produto encontrados</h1>
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