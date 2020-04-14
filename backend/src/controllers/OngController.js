const generateUniqueId = require('../utils/generateUniqueId'); //importando a função criada em outro arquivo
const connection = require('../database/connection'); // importando as cfgs de conexão com a DB

module.exports = { //será exportada nas rotas de listagem e criação de ongs
  async index (request, response) { //essa rota é pra listar as ongs cadastradas
    const ongs = await connection('ongs').select('*');
    return response.json(ongs);
  },
  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body; //pegando esses dados do corpo do request 
    const id = generateUniqueId(); //pra ong preciso criar um id mais complexo q o para o caso
    
    let [ongName] = await connection('ongs')
    .where('name', name)
    .select('name')    

    let [ongEmail] = await connection('ongs')
    .where('email', email)
    .select('email')
    
   
    let [ongWhatsapp] = await connection('ongs')
    .where('whatsapp', whatsapp)
    .select('whatsapp')

    const nameExist = (!ongName) ? '' : ' nome';
    const emailExist = (!ongEmail) ? '' : ' e-mail';
    const whatsappExist = (!ongWhatsapp) ? '' : ' whatsapp'; 

    const itExists = [nameExist, emailExist, whatsappExist]

    const itExistsText = itExists.find(item => {
      return item;
    }) 
    
    const resp = `Já existe uma ONG cadastrada com esse${itExistsText}`    
    
    if (!itExistsText) {
      await connection('ongs').insert({//fazendo a conexão com o banco de dados e inserindo na tabela 'ongs' os dados abaixo
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
      })   
      return response.json({ id }); //como resposta retornarei apenas o ID que é o que a ONG precisa depois para entrar
    } else {
      return response.json({ resp })
    }
  },
  async update(request, response) {

    //começa aqui
    const { authorization: ong_id, ongnamef, ongemailf, ongwhatsappf } = request.headers;    
          
    const { id } = request.params;
    let { name, email, whatsapp, city, uf } = request.body;

    const ong = await connection('ongs')
          .where('id', id)
          .select('id')
          .first();    
    if (ong.id !== ong_id) {      
      return response.status(401).json({ error: 'Operation not permitted.'});
    }       
    
    let [ongName] = await connection('ongs')
    .where('name', name)
    .select('name')    

    let [ongEmail] = await connection('ongs')
    .where('email', email)
    .select('email')    
   
    let [ongWhatsapp] = await connection('ongs')
    .where('whatsapp', whatsapp)
    .select('whatsapp')

    const nameExist = (!ongName || ongnamef === name) ? '' : ' nome';
    const emailExist = (!ongEmail || ongemailf === email) ? '' : ' e-mail';
    const whatsappExist = (!ongWhatsapp || ongwhatsappf === whatsapp) ? '' : ' whatsapp'; 

    const itExists = [nameExist, emailExist, whatsappExist]

    if (!nameExist) { name = ongnamef };
    if (!emailExist) { email = ongemailf };
    if (!whatsappExist) { whatsapp = ongwhatsappf };

    const itExistsText = itExists.find(item => {
      return item;
    }) 
    
    const resp = `Já existe uma ONG cadastrada com esse${itExistsText}`

    // const nameu = (!ongName) ? name : ongnamef;    
    // const emailu = (!ongEmail) ? email : ongemailf;
    // const whatsappu = (!ongWhatsapp) ? whatsapp : ongwhatsappf;
    // console.log(nameu, emailu, whatsappu);
    
    
    if (!itExistsText) {
      await connection(`ongs`)
      .where('id', id)      
      .update({
        name,
        email,
        whatsapp,
        city,
        uf,
      });
    return response.status(204).send();
    } else {
      return response.json({ resp })
    }
    //acaba aqui    
  },
};