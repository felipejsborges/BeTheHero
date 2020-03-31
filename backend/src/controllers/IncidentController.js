const connection = require('../database/connection'); // importing databases connection configurations

module.exports = { //exporting to be imported in routes.js
  async index(request, response) { //list incidents function
    const { page = 1 } = request.query; //searching for page number in query params, if dont find, page  = 1.
    const [count] = await connection('incidents').count(); //count method return an array. if i want just the value, i use de []
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
    const [id] = await connection('incidents').insert({ //fazendo a conexão com o banco de dados e inserindo na tabela 'incidents' os dados abaixo
      title,
      description,
      value,
      ong_id,
    })
    //a resposta do await (que esta sendo armazenado na const declarada) é uma array de lenght = 1 que tem como valor a contagem de incidents inseridos desde o primeiro, sem descontar os excluídos. Portanto, cada criação de caso terá valor único. Podemos usar esse valor como ID para o caso. Ao colocar o [] entre 'id', estou pegando somente esse valor, e não toda a array.
    return response.json({ id }); //e ao colocar {id}, estou "nomeando" esse valor de 'id'. um console logo em id sem {id} seria 'value', com {id} fica '{id: value}'
  },
  async delete(request, response) {
    //em routes.js, eu falo que a rota pra deletar um incident é '.../incidents/id'. Portanto, qq pessoa pode chamar essa rota e deletar. Portanto, preciso certificar q é a ong dona querendo excluir:
    const { id } = request.params; //pegando o route param (id do .../incidents/id) e o chamando de 'id'
    const ong_id = request.headers.authorization; //pegando o id da ong que ta tentando exlcuir
    const incident = await connection('incidents')
      .where('id', id) //to procurando nos incidentes um que tenha o 'id' igual ao do route param
      .select('ong_id') //encontrando esse id, vou selecionar a id da ong: 'ong_ind'
      .first(); //pra me retornar apenas o 1o resultado, caso for retornar uma array
    if (incident.ong_id !== ong_id) { //verificando se o id da ong q ta tenando excluir é diferente ao da que criou o caso. Se for diferente:
      return response.status(401).json({ error: 'Operation not permitted.'}); //401 é um código de erro chamado 'unauthorized'
    } //agr se for igual:
    await connection('incidents').where('id', id).delete(); //deletando o caso
    return response.status(204).send(); //o 204 significa NoContent - p nao ter conteúdo nenhum msm
  }
};