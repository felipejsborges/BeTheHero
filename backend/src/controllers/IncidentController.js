const connection = require('../database/connection'); // importando as cfgs de conexão com a DB

module.exports = { //será exportada nas rotas de criação de casos
  async index(request, response) { //essa rota é pra listar os casos criados
    const { page = 1} = request.query; //vai buscar o número da página, se não encontrar, usar page = 1
    const [count] = await connection('incidents').count(); //o método count conta a qnt de incidentes. ele pode retornar um array, e como quer o só o valor, usamos os []
    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id') //estou juntando as informações do caso com: as informações da tabela 'ongs' que possui o 'ongs.id' '=' ao 'incidents.ong_id'. Ou seja, to adicionando os dados da ong criadora no incidente criado
      .limit(5) //litando a exibição de 5 casos de uma vez
      .offset((page - 1) * 5) //significa 'pular os x primeiros registros'. na página 1 vai pular o 0 ((1-1)*5) e começar do 1 -> 1, 2, 3, 4 e 5.. na página 2 vai pular os 5 primeiros ((2-1)*5) e pegar os prox 5 -> 6, 7, 8, 9 e 10 ...
      .select([ //e selecionar tudo q encontrar, sendo que to pegando todos os dados de incidents, e tds os dados da ong, tirando seu id, pq ele n deve sobrepor o id do caso e nao deve ser exibido p usuário
        'incidents.*', 
        'ongs.name', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.uf'
      ]);
    response.header('X-Total-Count', count['count(*)']); //mandando a resposta no formato de um header, chamado X-Total-Count que mostra a qnt total de X, no caso, casos
    return response.json(incidents);
  },
  async create(request, response) {
    const { title, description, value } = request.body; //pegando esses dados do corpo do request
    const ong_id = request.headers.authorization;//tenho que usar o request.headers para pegar os dados da ONG, pq no headers ficam informações que não existem no body como infos de atenticação, localização, idioma.. e authorization é o nome da header criada no insomnia
    const [id] = await connection('incidents').insert({//fazendo a conexão com o banco de dados e inserindo na tabela 'incidents' os dados abaixo
      title,
      description,
      value,
      ong_id,
    })
    //como a resposta do await será um array de uma única posição, o ID gerado será o número dele na array. ouseja, o primeiro caso será 1, o segundo 2...
    return response.json({ id }); //como resposta retornarei apenas o ID do caso - mesma coisa q a const do await chamar result e eu retornar resulto[0], no caso do primeir caso inserido
  },
  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization; //preciso pra conferir se a ong q ta querendo deletar o caso realmente é a ONG que o criou
    const incident = await connection('incidents')
      .where('id', id) //to procurando nos incidentes um que tenha o 'id' igual ao id buscado acima: const { id }
      .select('ong_id') //encontrando esse id, vou selecionar a id da ong: 'ong_ind'
      .first(); //pra me retornar apenas 1 resultado
    if (incident.ong_id !== ong_id) { //se o ong_id encontrado for diferente do ong_id do caso que está sendo excluído, significa q uma ong ta tentando excluir o caso de outra
      return response.status(401).json({ error: 'Operation not permitted.'}); //401 é um código de erro chamado 'unauthorized'
    }
    await connection('incidents').where('id', id).delete();
    return response.status(204).send(); //o 204 significa NoContent - p nao ter conteúdo nenhum msm
  }
};