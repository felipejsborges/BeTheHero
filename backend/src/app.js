const express = require('express'); //importando a framework Express
const cors = require('cors'); // importando o cors
const routes = require('./routes'); //sem o ./ é um pacote como o express, com o ./ é um arquivo como o routes.js
const { errors } = require('celebrate'); //importando as msgs de erro do celebrate, pois a padrão sem essa importação é como se fosse um: "esse site ta bugado". Agr, com o errors, fica uma mensagem pro usuário q ele fez algo errado
const app = express(); //iniciando a função do express para a contante app

app.use(cors()); //permitindo que todas as aplicações frontend possa acessar esse nosso backend
app.use(express.json()); //to falando pro meu aplicativo que eu posso mandar requisições no formato json
app.use(routes); //to falando pro meu app que posso enviar rotas pra ele
app.use(errors()); //falando pro meu app usar o errors do celebrate quando der b.o nas validações

module.exports = app; //exportando o app para ser importado no server.js