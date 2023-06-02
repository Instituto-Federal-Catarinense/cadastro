const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "meuBanco",
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/:id", (req, res) => {
  const userId = req.params.id;
  //faça algo com o id do usuário
  console.log(`O identificador do usuário é: ${userId}`);
});

app.get("/cadastro", (req, res) => {
  res.sendFile(__dirname + "/cadastro.html");
});

app.post("/cadastro", (req, res) => {
  const { nome, endereco, idade, sexo } = req.body;
  if (!nome || !endereco || !idade || !sexo) {
    res.status(400).send("Nome e endereço são campos obrigatórios.");
    return;
  }

  const clientes = { nome, endereco, idade, sexo };
  connection.query("INSERT INTO clientes SET ?", clientes, (err, result) => {
    if (err) throw err;
    console.log(`cliente ${nome} cadastrado com sucesso!`);
    res.redirect("/");
  });
});

// Rota para processar a listagem
app.get("/listagem", (req, res) => {
  // Consulta no banco de dados
  connection.query(`SELECT * FROM clientes`, (error, results, fields) => {
    if (error) throw error;

    // Exibição dos resultados
    let html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>produtoss</title>
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
          <h1>produtoss encontrados</h1>
          <table>
            <tr>
              <th>Nome</th>
              <th>endereco</th>
              <th>idade</th>
              <th>sexo</th>
            </tr>
    `;

    results.forEach((clientes) => {
      html += `
        <tr>
          <td>${clientes.nome}</td>
          <td>${clientes.endereco}</td>
          <td>${clientes.idade}</td>
          <td>${clientes.sexo}</td>
        </tr>
      `;
    });

    html += `
          </table>
          <a href="/">Voltar</a>
        </body>
      </html>
    `;

    res.send(html);
  });
});

// Rota para exibir o formulário de consulta
app.get("/consulta", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Consulta de produtoss</title>
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
        <h1>Consulta de produtoss</h1>
        <form method="POST" action="/consulta">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" name="nome"><br><br>
          <button type="submit">Consultar</button>
        </form>
      </body>
    </html>
  `);
});

// Rota para processar a consulta
app.post("/consulta", (req, res) => {
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
      <!DOCTYPE html>
      <html>
        <head>
          <title>clientes</title>
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
          <h1>clientes encontrados</h1>
          <table>
            <tr>
              <th>Nome</th>
              <th>endereco</th>
              <th>idade</th>
              <th>sexo</th>
            </tr>
    `;

      results.forEach((clientes) => {
        html += `
        <tr>
          <td>${clientes.nome}</td>
          <td>${clientes.endereco}</td>
          <td>${ clientes.idade}</td>
          <td>${clientes.sexo}</td>
        </tr>
      `;
      });

      html += `
          </table>
          <a href="/">Voltar</a>
        </body>
      </html>
    `;

      res.send(html);
    }
  );
});

//   ----------------------------------------------------------------------------------

connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados MySQL!");
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});

app.post("/cadastroprod", (req, res) => {
  const { nome, descricao, quantidade, valor } = req.body;
  if (!nome || !descricao || !quantidade || !valor) {
    res.status(400).send("Nome e endereço são campos obrigatórios.");
    return;
  }

  const produtos = { nome, descricao, quantidade, valor };
  connection.query("INSERT INTO produtos SET ?", produtos, (err, result) => {
    if (err) throw err;
    console.log(`produtos ${nome} cadastrado com sucesso!`);
    res.redirect("/");
  });
});

// Rota para exibir o formulário de consulta
app.get("/consultaprod", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
    <head>
      <title>Consulta de produtos</title>
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
      <h1>Consulta de produtos</h1>
      <form method="POST" action="/consultaprod">
        <label for="id">id:</label>
        <input type="text" id="id" name="id"><br><br>
        <button type="submit">Consultar</button>
      </form>
    </body>
  </html>
`);
});


// Rota para processar a consulta
app.post("/consultaprod", (req, res) => {
  //const nome = req.body.nome;
  const { id, nome, descricao, quantidade, valor } = req.body;
  //const endereco = req.body.endereco;

  // Consulta no banco de dados
  connection.query(
    `SELECT * FROM produtos WHERE id LIKE '%${id}%'`,
    (error, results, fields) => {
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
              <th>Id</th>
              <th>Nome</th>
              <th>Descricao</th>
              <th>Quantidade</th>
              <th>Valor</th>
            </tr>
    `;

      results.forEach((produtos) => {
        html += `
        <tr>
          <td>${produtos.id}</td>
          <td>${produtos.nome}</td>
          <td>${produtos.descricao}</td>
          <td>${produtos.quantidade}</td>
          <td>${produtos.valor}</td>
        </tr>
      `;
      });

      html += `
          </table>
          <a href="/">Voltar</a>
        </body>
      </html>
    `;

      res.send(html);
    }
  );
});

// Rota para exibir o formulário de consulta
app.get("/listagemprod", (req, res) => {
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
              <th>Id</th>
              <th>Nome</th>
              <th>Descricao</th>
              <th>Quantidade</th>
              <th>Valor</th>
            </tr>
    `;

    results.forEach((produtos) => {
      html += `
        <tr>
          <td>${produtos.id}</td>
          <td>${produtos.nome}</td>
          <td>${produtos.descricao}</td>
          <td>${produtos.quantidade}</td>
          <td>${produtos.valor}</td>
        </tr>
      `;
    });

    html += `
          </table>
          <a href="/">Voltar</a>
        </body>
      </html>
    `;

    res.send(html);
  });
});


// Rota para exibir o formulário de consulta
app.get("/cadastroprod", (req, res) => {
  res.sendFile(__dirname + "/cadastroprod.html");
});

// Rota para processar a consulta
app.post("/cadastroprd", (req, res) => {
  //const nome = req.body.nome;
  const { id, nome, descricao, valor } = req.body;
  //const endereco = req.body.endereco;

  // Consulta no banco de dados
  connection.query(
    `SELECT * FROM produtos WHERE id LIKE '%${id}%'`,
    (error, results, fields) => {
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
              <th>Id</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor</th>
            </tr>
    `;

      results.forEach((produtos) => {
        html += `
        <tr>
          <td>${produtos.id}</td>
          <td>${produtos.nome}</td>
          <td>${produtos.descricao}</td>
          <td>${produtos.quantidade}</td>
          <td>${produtos.valor}</td>
        </tr>
      `;
      });

      html += `
          </table>
          <a href="/">Voltar</a>
        </body>
      </html>
    `;

      res.send(html);
    }
  );
});