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

app.get("/cadastro", (req, res) => {
  res.sendFile(__dirname + "/cadastro.html");
});

app.post("/cadastro", (req, res) => {
  const { nome, endereco, data_nasc, sexo } = req.body;
  if (!nome || !endereco || !data_nasc) {
    res.status(400).send("Nome, endereço e data de nascimento são campos obrigatórios.");
    return;
  }

  // Formatando a data no formato 'YYYY-MM-DD' para ser inserida no MySQL
  const dataNascimento = new Date(data_nasc).toISOString().split('T')[0];

  const cliente = { nome, endereco, data_nasc: dataNascimento, sexo };
  connection.query("INSERT INTO clientes SET ?", cliente, (err, result) => {
    if (err) throw err;
    console.log(`Cliente ${nome} cadastrado com sucesso!`);
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
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Lista de Clientes</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
            }

            h1 {
              color: #3498db;
              margin-bottom: 20px;
            }

            table {
              width: 80%;
              border-collapse: collapse;
              margin-top: 20px;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
              background-color: #fff;
              border-radius: 8px;
              overflow: hidden;
            }

            th, td {
              padding: 15px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }

            th {
              background-color: #3498db;
              color: #fff;
            }

            td {
              color: #333;
            }

            a {
              display: inline-block;
              margin-top: 20px;
              padding: 10px 20px;
              background-color: #3498db;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
              transition: background-color 0.3s;
            }

            a:hover {
              background-color: #2980b9;
            }
          </style>
        </head>
        <body>
          <h1>Clientes Encontrados</h1>
          <table>
            <tr>
              <th>Nome</th>
              <th>Endereço</th>
              <th>Data de nascimento</th>
              <th>Sexo</th>
            </tr>
    `;
    
    results.forEach((cliente) => {
      html += `
        <tr>
          <td>${cliente.nome}</td>
          <td>${cliente.endereco}</td>
          <td>${new Date(cliente.data_nasc).toLocaleDateString('pt-BR')}</td>
          <td>${cliente.sexo}</td>
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
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Consulta de clientes</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f5f5f5;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
          }

          h1 {
            color: #3498db;
            margin-bottom: 20px;
          }

          form {
            background-color: #fff;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
          }

          label {
            display: block;
            margin-bottom: 10px;
          }

          input {
            padding: 10px;
            margin-bottom: 10px;
          }

          button {
            padding: 10px 20px;
            background-color: #3498db;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          button:hover {
            background-color: #2980b9;
          }
        </style>
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
app.post('/consulta', (req, res) => {
  const { nome, endereco, data_nasc, sexo } = req.body;
  
  // Consulta no banco de dados
  connection.query(`SELECT * FROM clientes WHERE nome LIKE '%${nome}%'`, (error, results, fields) => {
    if (error) throw error;
    
    // Exibição dos resultados
    let html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Clientes</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background-color: #f5f5f5;
              margin: 0;
              padding: 0;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
            }

            h1 {
              color: #3498db;
              margin-bottom: 20px;
            }

            table {
              width: 80%;
              border-collapse: collapse;
              margin-top: 20px;
              box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
              background-color: #fff;
              border-radius: 8px;
              overflow: hidden;
            }

            th, td {
              padding: 15px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }

            th {
              background-color: #3498db;
              color: #fff;
            }

            td {
              color: #333;
            }

            a {
              display: inline-block;
              margin-top: 20px;
              padding: 10px 20px;
              background-color: #3498db;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
              transition: background-color 0.3s;
            }

            a:hover {
              background-color: #2980b9;
            }
          </style>
        </head>
        <body>
          <h1>Clientes encontrados</h1>
          <table>
            <tr>
              <th>Nome</th>
              <th>Endereco</th>
              <th>Data de nascimento</th>
              <th>Sexo</th>
            </tr>
    `;
    
    results.forEach((cliente) => {
      html += `
        <tr>
          <td>${cliente.nome}</td>
          <td>${cliente.endereco}</td>
          <td>${new Date(cliente.data_nasc).toLocaleDateString('pt-BR')}</td>
          <td>${cliente.sexo}</td>
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


connection.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados MySQL!");
});

app.listen(3000, () => {
  console.log("Servidor iniciado na porta 3000");
});
