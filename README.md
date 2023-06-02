# Introdução ao Framework Express para Node.js
>Bem-vindos à aula de introdução ao framework Express para Node.js! Nesta
        aula, vamos explorar o framework Express, que é amplamente utilizado
        para criar aplicativos da web e APIs em Node.js. O Express é conhecido
        por sua simplicidade, flexibilidade e facilidade de uso, tornando-o uma
        escolha popular entre os desenvolvedores.
        
> Então, o que é o Express e por que ele é tão importante no ecossistema
        Node.js? O Express é um framework web minimalista e rápido que fornece
        uma camada de abstração sobre os recursos básicos do Node.js,
        facilitando o desenvolvimento de aplicativos da web robustos. Ele é
        baseado no conceito de middleware, o que significa que é possível criar
        pipelines de processamento para manipular as requisições HTTP.
        
Vamos começar com os fundamentos básicos do Express.
1. Instalação do Express: Para começar a usar o Express, você precisa
            instalá-lo. Basta executar o seguinte comando no terminal:
            
                  npm install express

2. Configurando um aplicativo Express: Agora que o Express está
            instalado, você pode criar um novo aplicativo Express em um arquivo
            JavaScript. Comece importando o módulo Express:
                    
                  const express = require('express');
                  const app = express();
Aqui, importamos o módulo Express e criamos uma instância do aplicativo Express chamada app. 

3. Rotas no Express: No Express, as rotas são usadas para definir como o aplicativo responde a uma determinada solicitação HTTP. Uma rota é uma combinação de um método HTTP (como GET, POST, PUT, DELETE) e um caminho de URL. Veja um exemplo: 

                  app.get('/', (req, res) => {
                    res.send('Olá, mundo!');
                  });
       
Neste exemplo, definimos uma rota GET para o caminho raiz '/'. Quando alguém faz uma solicitação GET para a raiz do aplicativo, ele retorna a resposta 'Olá, mundo!'. 

4. Middleware no Express: O Express usa middleware para executar funções intermediárias durante o processamento de uma solicitação HTTP. O middleware é executado na ordem em que é definido. Existem vários middleware disponíveis no Express, e você também pode criar o seu próprio. Aqui está um exemplo de uso de middleware: 

                  app.use(express.json());
                  
Neste exemplo, estamos usando o middleware express.json() para analisar o corpo de solicitação JSON antes de passá-lo para outras rotas ou manipuladores.

5. Parâmetros de rota: No Express, você pode definir parâmetros em uma rota para capturar valores dinâmicos de URLs. Os parâmetros de rota são especificados com : seguido pelo nome do parâmetro. Aqui está um exemplo:

                  app.get('/users/:id', (req, res) => {
                    const userId = req.params.id;
                    // faça algo com o userId
                    console,log(`O id do usuário é: ${userId}`);
                  });
                  
Neste exemplo, definimos um parâmetro de rota chamado id. Quando uma solicitação GET é feita para /users/123, o valor '123' é capturado e atribuído a req.params.id. 
