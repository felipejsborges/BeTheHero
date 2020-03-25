const express = require('express'); //importando a framework Express
const cors = require('cors'); // importando o cors
const routes = require('./routes'); //sem o ./ é um pacote como o express, com o ./ é um arquivo como o routes.js
const app = express(); //iniciando a função do express para a contante app

app.use(cors()); //permitindo que todas as aplicações frontend possa acessar esse nosso backend
app.use(express.json()); //to falando pro meu aplicativo que eu posso mandar requisições no formato json
app.use(routes); //to falando pro meu app que posso enviar rotas pra ele

app.listen(3333); //vai executar o app quando for requisitada a porta '3333'