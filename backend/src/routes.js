const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate'); //importando funcionalidades da ferramenta de validação
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');
const routes = express.Router(); //to importando, na variável const, a função de rotas do express

routes.post('/sessions', SessionController.create); //rota de controle das sessoes de login. é metodo post pois cada login é uma criação de solicitação p acessar o sistema

routes.get('/ongs', OngController.index); //rota de listagem das ongs cadastradas
routes.post('/ongs', celebrate({//rota de cadastramento de uma ong. O celebrate vem antes pq a validação é antes de criar o dado
	[Segments.BODY]: Joi.object().keys({ //pra iniciar a validação de um body, preciso ter esse formato. Além de body podemos ter route, query e params. No caso da criação da ONG, precisamos validar apenas o body
		name: Joi.string().required().max(50), //nome precisa ser string e é obrigatório
		email: Joi.string().required().email().max(50), //email precisa ser string, é obrigatório e tem q ter formato d eemail
		whatsapp: Joi.string().required().min(10).max(11), //zap precisa ser num (mas tenho q por string p usa o min e max), é obrigatório e tem no min 10 e no max 11 caractéres
		city: Joi.string().required().max(50), //cidade precisa ser string e é obrigatório
		uf: Joi.string().required().length(2) //uf precisa ser string, é obrigatório e tamanho de 2 caracteres
	})
}), OngController.create); 

routes.get('/profile', celebrate({ //rota de listagem de casos de uma ong específica
	[Segments.HEADERS]: Joi.object({ //validação de um Headers tem esse padrão
		authorization: Joi.string().required(), //authorization que é o ID da ong.
	}).unknown(), //o headers pode ter vários dados e o unknown serve pra só testarmos o que ta dentro de object({})
}), ProfileController.index); 

routes.get('/incidents', celebrate({ //rota para listagem dos casos criados
	[Segments.QUERY]: Joi.object().keys({ //validação de Query tem esse padrão
		page: Joi.number(), //precisa ser número e n é obrigatório, pois, se n tiver nada, quer dizer que é page 1
	})
}), IncidentController.index); 
routes.post('/incidents', celebrate({
	[Segments.BODY]: Joi.object().keys({
		title: Joi.string().required().min(2).max(50),
		description: Joi.string().required().min(10).max(200),
		value: Joi.number().required(),
	})
}), IncidentController.create); //rota para criação de um caso
routes.delete('/incidents/:id', celebrate({ //rota para deletar um caso
	[Segments.PARAMS]: Joi.object().keys({ //validação de params tem esse padrão
		id: Joi.number().required(),
	})
}), IncidentController.delete); 

module.exports = routes; //exportando as rotas para serem acessadas no nosso arquivo index.js