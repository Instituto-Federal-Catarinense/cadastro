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
  password: 'A1b1c1d1',
  database: 'meuBanco'
});

// Conexão com o banco de dados
connection.connect();


// Rota para processar a consulta
app.post('/consProdutos', (req, res) => {
    //const nome = req.body.nome;
    const { descricao} = req.body;
    //const endereco = req.body.endereco;
    
    // Consulta no banco de dados
    connection.query(`SELECT * FROM produtos WHERE descrição LIKE '%${descricao}%'`, (error, results, fields) => {
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
                <th>descrição</th>
                <th>quantidade</th>
              </tr>
      `;
      
      results.forEach((produtos) => {
        html += `
          <tr>
            <td>${produtos.descricao}</td>
            <td>${produtos.quantidade}</td>
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
  