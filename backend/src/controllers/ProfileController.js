// o padrão por arquivo controller é ter no max 5 métodos: listagem, item unico, criação, alteração e exclusão. para fazer algo além disso, cria-se outro arquivo controller. pra isso criamos esse: retornar apenas rotas de uma ong específica
const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const ong_id = request.headers.authorization;
    const incidents = await connection('incidents')
      .where('ong_id', ong_id)
      .select('*');
      return response.json(incidents);
  }
}