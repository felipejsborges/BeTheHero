const knex = require('knex');
const configuration = require ('../../knexfile'); //importando a configuração do knex para conexão com a DB

const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development;
// a linha acima ta falando q se estivermos em modo de test, usaremos a configuração do knexfile de teste, senao configuração de desenvolvimento
// se estivermos no modo test, a database utilizada vai ser a salva no knexfile nas cfg de test (db.sqlite no caso)
// se estivermos no modo de desenvolvimento, a database utilizada será a salva no knex nas cfg de development (test.sqlite no caso)

const connection = knex(config);

module.exports = connection; //exportando para ser importado onde usaremos as configurações: Controllers