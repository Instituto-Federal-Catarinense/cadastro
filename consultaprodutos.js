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
app.get('/consultaprodutos', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Consulta de Produtos</title>
      </head>
      <body>
        <h1>Consulta de Produtos</h1>
        <form method="POST" action="/produtos">
          <label for="nome">Id:</label>
          <input type="text" id="id" name="id"><br><br>
          <label for="endereco">Descrição:</label>
          <input type="text" id="descricao" name="descricao"><br><br>
          <label for="nome">Quantidade:</label>
          <input type="text" id="quant" name="quant"><br><br>
          <label for="nome">Valor:</label>
          <input type="valor" id="genero" name="valor"><br><br>
          <button type="submit">Consultar</button>
        </form>
      </body>
    </html>
  `);
});

// Rota para processar a consulta
app.post('/produtos', (req, res) => {
  //const nome = req.body.nome;
  const { id, descricao, quant, valor } = req.body;
  //const endereco = req.body.endereco;
  
  // Consulta no banco de dados
  connection.query(`SELECT * FROM produtos WHERE nome LIKE '%${nome}%'`, (error, results, fields) => {
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
    
    results.forEach((produto) => {
      html += `
        <tr>
          <td>${produto.id}</td>
          <td>${produto.descricao}</td>
          <td>${produto.quant}</td>
          <td>${produto.valor}</td>
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
