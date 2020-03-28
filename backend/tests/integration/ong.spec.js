const request = require('supertest'); //importando o supertest pro nosso teste conseguir fazer chamadas API
const app = require('../../src/app'); //importando o sistema pra eu poder fazer os testes nele
const connection = require('../../src/database/connection'); //preciso importar pra poder ativar as migrations

//vou testar a criação de uma ong. vou usar a rota /ongs com o metodo post e enviar um objeto com os dados
//com isso, quero que tenha exito no recebimento dos dados e que me devolvam um ID para poder logar
describe('ONG', () => {
	beforeEach(async () => { //antes de cada teste
		await connection.migrate.rollback(); //vou desfazer todas as migrations existentes de testes passados p nao "lotar" minha DB de testes
		await connection.migrate.latest(); //vou conectar com a migration do banco de dados configurada
	});

	afterAll(async () => { //depois de todos os testes
		await connection.destroy(); //vou encerrar minha conexão com o banco de dados p nao dar msg de alerta q tem coisa pendente
	})

	it('should be able to create a new ONG and return me and ID', async () => {
		const reponse = await request(app)
			.post('/ongs') //se eu precisasse enviar alguma outra informação aqui, tipo um Headers, usaria .set('Authorization', 'ID de uma ong')
			.send({
				name: "NOMETESTE2",
				email: "contato@gmail.com",
				whatsapp: "1200000000",
				city: "SJC",
				uf: "SP"
			});
		expect(reponse.body).toHaveProperty('id'); //espero que no corpo da resposta tenha uma propriedade chamada ID
		expect(reponse.body.id).toHaveLength(8); //espero q esse id tenha 8 caracteres (que foi o programado no backend)
	});
});