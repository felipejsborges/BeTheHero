const express = require('express');
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router(); //to importando, na variável const, a função de rotas do express

routes.post('/sessions', SessionController.create); //rota de controle das sessoes de login. é metodo post pois cada login é uma criação de solicitação p acessar o sistema

routes.get('/ongs', OngController.index); //rota de listagem das ongs cadastradas
routes.post('/ongs', OngController.create); //rota de cadastramento de uma ong 

routes.get('/profile', ProfileController.index); //rota de listagem de casos de uma ong específica

routes.get('/incidents', IncidentController.index); //rota para listagem dos casos criados
routes.post('/incidents', IncidentController.create); //rota para criação de um caso
routes.delete('/incidents/:id', IncidentController.delete); //rota para criação de um caso

module.exports = routes; //exportando as rotas para serem acessadas no nosso arquivo index.js