const knex = require('knex');
const configuration = require ('../../knexfile'); //importando a configuração do knex para conexão com a DB

const connection = knex(configuration.development); //a configuração requerida é a de desenvolvimento

module.exports = connection; //exportando para ser importado onde usaremos as configurações: Controllers