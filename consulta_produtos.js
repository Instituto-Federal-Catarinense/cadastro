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
app.get('/consulta_pro', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Consulta de produtos</title>
      </head>
      <body>
        <h1>Consulta de produtos</h1>
        <form method="POST" action="/cadastro_produtos">
          <label for="nome">Nome do produto: </label>
          <input type="text" id="nomeproduto" name="nomeproduto"><br><br>
          <label for="endereco">Categoria:</label>
          <input type="text" id="categoria" name="categoria"><br><br>
          <button type="submit">Consultar</button>
        </form>
      </body>
    </html>
  `);
});

// Rota para processar a consulta
app.post('/cadastro_produtos', (req, res) => {
  //const nome = req.body.nome;
  const { nomeproduto, valorproduto, categoria, quantidade } = req.body;
  //const endereco = req.body.endereco;
  
  // Consulta no banco de dados
  connection.query(`SELECT * FROM produtos WHERE nome LIKE '%${nomeproduto}%'`, (error, results, fields) => {
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
              <th>Nome</th>
              <th>Valor</th>
              <th>Categoria</th>
              <th>Quantidade</th>
            </tr>
    `;
    
    results.forEach((produto) => {
      html += `
        <tr>
          <td>${produto.nomeproduto}</td>
          <td>${produto.valorproduto}</td>
          <td>${produto.categoria}</td>
          <td>${produto.quantidade}</td>
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
