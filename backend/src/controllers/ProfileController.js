// o padrão por arquivo controller é ter no max 5 métodos: listagem, detalhes de um item unico, criação, alteração e exclusão. para fazer algo além disso, cria-se outro arquivo controller. pra isso criamos esse: retornar apenas rotas de uma ong específica
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const ong_id = request.headers.authorization;
    const incidents = await connection('incidents') //puexando todos os incidents
      .where('ong_id', ong_id) //vendo os que tem id igual da ong q solicitou
      .select('*'); //e selecionando tudo      
      return response.json(incidents); //incidents é uma array com todos os casos e cada campo dessa array é um objeto com os detalhes do caso
  }
}