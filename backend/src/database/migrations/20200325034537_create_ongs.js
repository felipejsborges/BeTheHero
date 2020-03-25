
exports.up = function(knex) { //o método 'up' é o responsável por criar essa migration
  return knex.schema.createTable('ongs', function(table) { //criando o schema da tabela de dados
    table.string('id').primary(); //transforma essa coluna em uma coluna primária
    table.string('name').notNullable(); //notNullable fala que não pode ser vazio
    table.string('email').notNullable();
    table.string('whatsapp').notNullable();
    table.string('city').notNullable();
    table.string('uf', 2).notNullable(); // o , 2 é pra especificar que esse dado tem q ter 2 caracteres
  })
};

exports.down = function(knex) { //o método 'down' serve pra, se dar um b.o, eu farei o que tiver dentro do seu escopo
  return knex.schema.dropTable('ongs'); //se der b.o, vou excluir a tabela
};
