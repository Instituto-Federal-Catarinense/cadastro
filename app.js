const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
<<<<<<< HEAD
  password: "",
  database: "meuBanco",
=======
  password: "A1b1c1d1",
  database: "meuBanco"
>>>>>>> be5067466cdf1fd93ebed76c4b108404658d3723
});
3;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/cadastro", (req, res) => {
  res.sendFile(__dirname + "/cadastro.html");
});

<<<<<<< HEAD
app.get("/cadastro_produtos", (req, res) => {
  res.sendFile(__dirname + "/cadastro2.html");
});

=======
>>>>>>> be5067466cdf1fd93ebed76c4b108404658d3723
app.post("/cadastro", (req, res) => {
  const { nome, endereco, sexo, idadel } = req.body;
  if (!nome || !endereco || !sexo || !idade) {
    res
      .status(400)
      .send("Nome, endereço, sexo e idade são campos obrigatórios.");
    return;
  }

  const cliente = { nome, endereco, sexo, idade };
  connection.query("INSERT INTO clientes SET ?", cliente, (err, result) => {
    if (err) throw err;
    console.log(`Cliente ${nome} cadastrado com sucesso!`);
    res.redirect("/");
  });
});

<<<<<<< HEAD
app.post("/cadastro2", (req, res) => {
  const { nomeproduto, valorproduto, categoria, quantidade } = req.body;
  if (!nomeproduto || !valorproduto || !categoria || !quantidade) {
    res
      .status(400)
      .send(
        "Nome do produto, Valor do produto, Categorias e Quantidade são campos obrigatórios."
      );
    return;
  }

  const produto = { nomeproduto, valorproduto, categoria, quantidade };
  connection.query("INSERT INTO produtos SET ?", produto, (err, result) => {
    if (err) throw err;
    console.log(`Produto ${nomeproduto} cadastrado com sucesso!`);
    res.redirect("/");
  });
});

// Rota para processar a listagem
app.get("/listagem", (req, res) => {
  // Consulta no banco de dados
  connection.query(`SELECT * FROM clientes`, (error, results, fields) => {
    if (error) throw error;

=======
// Rota para processar a listagem
app.get('/listagem', (req, res) => {

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
<<<<<<< HEAD
              <th>Endereco</th>
              <th>Sexo</th>
              <th>Idade</th>
            </tr>
    `;

=======
              <th>endereco</th>
            </tr>
    `;
    
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
          <a href="/">Voltar</a>
        </body>
      </html>
    `;
<<<<<<< HEAD

    res.send(html);
  });
});

// Rota para processar listagem produtos
app.get("/lista2  ", (req, res) => {
  // Consulta no banco de dados
  connection.query(`SELECT * FROM produtos`, (error, results, fields) => {
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
              <th>Categoria</th>
              <th>Quantidade</th>
              <th>Valor</th>
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
          <a href="/">Voltar</a>
        </body>
      </html>
    `;

=======
    
>>>>>>> be5067466cdf1fd93ebed76c4b108404658d3723
    res.send(html);
  });
});

// Rota para exibir o formulário de consulta
<<<<<<< HEAD
app.get("/consulta", (req, res) => {
=======
app.get('/consulta', (req, res) => {
>>>>>>> be5067466cdf1fd93ebed76c4b108404658d3723
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Consulta de clientes</title>
      </head>
      <body>
        <h1>Consulta de clientes</h1>
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
<<<<<<< HEAD
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
=======
app.post('/consulta', (req, res) => {
  //const nome = req.body.nome;
  const { nome, endereco } = req.body;
  //const endereco = req.body.endereco;
  
  // Consulta no banco de dados
  connection.query(`SELECT * FROM clientes WHERE nome LIKE '%${nome}%'`, (error, results, fields) => {
    if (error) throw error;
    
    // Exibição dos resultados
    let html = `
>>>>>>> be5067466cdf1fd93ebed76c4b108404658d3723
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
<<<<<<< HEAD
              <th>Endereco</th>
              <th>Sexo</th>
              <th>Idade</th>
            </tr>
    `;

      results.forEach((cliente) => {
        html += `
        <tr>
          <td>${cliente.nome}</td>
          <td>${cliente.endereco}</td>
          <td>${cliente.sexo}</td>
          <td>${cliente.idade}</td>
        </tr>
      `;
      });

      html += `
=======
              <th>endereco</th>
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
>>>>>>> be5067466cdf1fd93ebed76c4b108404658d3723
          </table>
          <a href="/">Voltar</a>
        </body>
      </html>
    `;
<<<<<<< HEAD

      res.send(html);
    }
  );
});

// Rota para exibir o formulário de consulta
app.get("/consulta2", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Consulta de produtos</title>
      </head>
      <body>
        <h1>Consulta de produtos</h1>
        <form method="POST" action="/consulta_pro">
          <label for="nomeproduto">Nome:</label>
          <input type="text" id="nomeproduto" name="nomeproduto"><br><br>
          <button type="submit">Consultar</button>
        </form>
      </body>
    </html>
  `);
});

// Rota para processar a consulta Produtos
app.post("/consulta2", (req, res) => {
  const { nomeproduto } = req.body;
  // Consulta no banco de dados
  connection.query(
    `SELECT * FROM produtos WHERE nomeproduto LIKE '%${nomeproduto}%'`,
    (error, results, fields) => {
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
              <th>Categoria</th>
              <th>Quantidade</th>
              <th>Valor</th>
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
          <a href="/">Voltar</a>
        </body>
      </html>
    `;

      res.send(html);
    }
  );
=======
    
    res.send(html);
  });
>>>>>>> be5067466cdf1fd93ebed76c4b108404658d3723
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados MySQL!");
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});
