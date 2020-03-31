//arquivo necessário para controlar as rotas de login - session pq são chamados de sessao cada solicitação de entrada no sistema
const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { id } = request.body; //o corpo contém apenas o ID inserido no input da pag de login. to chamando ele de 'id'
    const ong = await connection('ongs') //conectando com todas as ongs cadastradas
      .where('id', id) //onde tiver uma com o id igual ao do request.body
      .select('name') //selecionaremos seu nome
      .first() //apenas o primeiro (?)

    if (!ong) { //se n encontrar ong com o id inserido é pq n existe
      return response.status(400).json({ error: 'No ONG found with this ID' });
    }    
    return response.json(ong); //ong é apenas o nome da ong. os casos são listados com seus detalhes no ProfileController
  }
}