
exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table) { //criando o schema da tabela de dados
    table.increments(); //como se fosse o id do caso, mas não precisa ser complexo igual o da ONG. O increments vai ciando tipo 1 pro primeiro caso, depois 2 pro segundo, depois 3...
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable(); //formato decimal pra ser um número
    table.string('ong_id').notNullable(); //p saber qual ong criou - essa parte aqui é chamada de relacionamento no DB
    table.foreign('ong_id').references('id').inTable('ongs') //falando q o ong id referencia o 'id' da tabela 'ongs' - é chamado chave estrangeira no DB
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};
