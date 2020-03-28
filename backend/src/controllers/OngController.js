const generateUniqueId = require('../utils/generateUniqueId');
const connection = require('../database/connection'); // importando as cfgs de conexão com a DB

module.exports = { //será exportada nas rotas de listagem e criação de ongs
  async index (request, response) { //essa rota é pra listar as ongs cadastradas
    const ongs = await connection('ongs').select('*');
    return response.json(ongs);
  },
  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body; //pegando esses dados do corpo do request 
    const id = generateUniqueId();   
    await connection('ongs').insert({//fazendo a conexão com o banco de dados e inserindo na tabela 'ongs' os dados abaixo
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    })
    return response.json({ id }); //como resposta retornarei apenas o ID que é o que a ONG precisa depois para entrar
  }
};