const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "aluno01",
  database: "meuBanco"
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/cadClientes", (req, res) => {
  res.sendFile(__dirname + "/cadClientes.html");
});

app.post("/cadClientes", (req, res) => {
  const { nome, endereco, email, sexo, nascimento } = req.body;
  if (!nome || !endereco || !email || !sexo || !nascimento) {
    res.status(400).send("Nome, endereço, email, sexo e nascimento  são campos obrigatórios.");
    return;
  }

  const cliente = { nome, endereco, email, sexo, nascimento };
  connection.query("INSERT INTO clientes SET ?", cliente, (err, result) => {
    if (err) throw err;
    console.log(`clientes ${nome} cadastrado com sucesso!`);
    res.redirect("/");
  });
});

app.get("/cadProdutos", (req, res) => {
  res.sendFile(__dirname + "/cadProdutos.html");
});

app.post("/cadProdutos", (req, res) => {
  const { nome, descricao, validade, valor, dfabricacao } = req.body;
  if (!nome || !descricao || !validade || !valor || !dfabricacao) {
    res.status(400).send("Nome, descricao, validade, valor e dfabricacao  são campos obrigatórios.");
    return;
  }

  const produtos = { nome, descricao, validade, valor, dfabricacao };
  connection.query("INSERT INTO produtos SET ?", produtos, (err, result) => {
    if (err) throw err;
    console.log(`produtos ${nome} cadastrado com sucesso!`);
    res.redirect("/");
  });
});

// Rota para processar a listagem
app.get('/listagem', (req, res) => {

  // Consulta no banco de dados
  connection.query(`SELECT * FROM clientes`, (error, results, fields) => {
    if (error) throw error;
    
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
              <th>endereco</th>
              <th>email</th>
              <th>sexo</th>
              <th>nascimento</th>
            </tr>
    `;
    
    results.forEach((cliente) => {
      html += `
        <tr>
          <td>${cliente.nome}</td>
          <td>${cliente.endereco}</td>
          <td>${cliente.email}</td>
          <td>${cliente.sexo}</td>
          <td>${cliente.nascimento}</td>
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
app.get('/consulta', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Consulta de clientes</title>
      </head>
      <body>
        <h1>Consulta de clientes</h1>
          <label for="nome">Nome:</label>
          <input type="text" id="nome" name="nome"><br><br>
          <button type="submit">Consultar</button>
        </form>
      </body>
    </html>
  `);
});

// Rota para processar a consulta
app.post('/consulta', (req, res) => {
  //const nome = req.body.nome;
  const { nome, endereco, email, sexo, nascimento } = req.body;
  //const endereco = req.body.endereco;
  
  // Consulta no banco de dados
  connection.query(`SELECT * FROM clientes WHERE nome LIKE '%${nome}%'`, (error, results, fields) => {
    if (error) throw error;
    
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
              <th>endereco</th>
              <th>email</th>
              <th>sexo</th>
              <th>nascimeto</th>
            </tr>
    `;
    
    results.forEach((cliente) => {
      html += `
        <tr>
          <td>${cliente.nome}</td>
          <td>${cliente.endereco}</td>
          <td>${cliente.email}</td>
          <td>${cliente.sexo}</td>
          <td>${cliente.nascimento}</td>
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

// ... (seu código existente)

// Rota para processar a listagem de produtos
app.get('/listagemProdutos', (req, res) => {
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
              <th>Descrição</th>
              <th>Validade</th>
              <th>Valor</th>
              <th>Data de Fabricação</th>
            </tr>
    `;

    results.forEach((produto) => {
      html += `
        <tr>
          <td>${produto.nome}</td>
          <td>${produto.descricao}</td>
          <td>${produto.validade}</td>
          <td>${produto.valor}</td>
          <td>${produto.dfabricacao}</td>
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

// ... (seu código existente)
app.get('/listagemClientes', (req, res) => {
  res.sendFile(__dirname + '/listagemClientes.html');
});

app.get('/listagemProdutos', (req, res) => {
  res.sendFile(__dirname + '/listagemProdutos.html');
});


connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados MySQL!");
});

app.listen(8080, () => {
  console.log("Servidor iniciado na porta 3000");
});
