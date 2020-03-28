const knex = require('knex');
const configuration = require ('../../knexfile'); //importando a configuração do knex para conexão com a DB

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;
// a linha acima ta falando q se estivermos em modo de test, usaremos a configuração do knexfile de teste, senao configuração de desenvolvimento

const connection = knex(config);

module.exports = connection; //exportando para ser importado onde usaremos as configurações: Controllers