const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "",
  database: "bancodoJojo"
});

function cadastrarCliente(nome, endereco, CPF, nascimento, res) {
const cliente = { nome, endereco, CPF, nascimento };
  connection.query("INSERT INTO clientes SET ?", cliente, (err, result) => {
    if (err) throw err;
    console.log(`Cliente ${nome} cadastrado com sucesso!`);
    res.redirect("/");
  });
}

function cadastrarProduto (descricao, quantidade, valor, res) {
  const produto = { descricao, quantidade, valor };
  connection.query("INSERT INTO produtos SET ?", produto, (err, result) => {
    if (err) throw err;
    console.log(`Produto ${produto.descricao} cadastrado com sucesso!`);
    res.redirect("/");
  });  
}

function consultarClientes (res){
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
                  <th>CPF</th>
                  <th>nascimento</th>
                </tr>
        `;
        
        results.forEach((cliente) => {
          html += `
            <tr>
              <td>${cliente.nome}</td>
              <td>${cliente.endereco}</td>
              <td>${cliente.CPF}</td>
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
}

function consultarProdutos (res) {
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
          <h1>Produtos cadastrados</h1>
          <table>
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Valor unitário</th>
            </tr>
    `;
    
    results.forEach((produto) => {
      html += `
        <tr>
          <td>${produto.ID}</td>
          <td>${produto.descricao}</td>
          <td>${produto.quantidade}</td>
          <td>${produto.valor}</td>
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
}

function consultarCliente (res) {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Consulta de clientes</title>
      </head>
      <body>
        <h1>Consulta de clientes</h1>
        <form method="POST" action="/consultaclientes">
          <label for="nome">Nome:</label>
          <input type="text" id="nome" name="nome"><br><br>
          <button type="submit">Consultar</button>
        </form>
        <a href="/">Voltar</a>
      </body>
    </html>
  `);
}

function buscarCliente(nome, res) {

 
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
         </table>
         <a href="/">Voltar</a>
       </body>
     </html>
   `;
   
   res.send(html);
 });
}

function consultarProduto (res) {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Consulta de produtos</title>
      </head>
      <body>
        <h1>Consulta de produtos</h1>
        <form method="POST" action="/consultaprodutos">
          <label for="descricao">Nome:</label>
          <input type="text" id="descricao" name="descricao"><br><br>
          <button type="submit">Consultar</button>
        </form>
        <a href="/">Voltar</a>
      </body>
    </html>
  `);
}

function buscarProduto (res, descricao) {
     // Consulta no banco de dados
  connection.query(`SELECT * FROM produtos WHERE descricao LIKE '%${descricao}%'`, (error, results, fields) => {
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
              <th>ID</th>
              <th>Descrição</th>
            </tr>
    `;
    
    results.forEach((produto) => {
      html += `
        <tr>
          <td>${produto.ID}</td>
          <td>${produto.descricao}</td>
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
}
    
    module.exports = {
    cadastrarCliente: cadastrarCliente,
    cadastrarProduto: cadastrarProduto,
    consultarClientes: consultarClientes,
    consultarProdutos: consultarProdutos,
    consultarCliente: consultarCliente,
    buscarCliente: buscarCliente,
    consultarProduto: consultarProduto,
    buscarProduto: buscarProduto
    };