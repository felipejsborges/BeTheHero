const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate'); 
const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router(); 

routes.post('/sessions', celebrate({
	[Segments.BODY]: Joi.object().keys({
		id: Joi.string().required().length(8) 
	})
}), SessionController.create); 

routes.get('/ongs', OngController.index); 
routes.post('/ongs', celebrate({
	[Segments.BODY]: Joi.object().keys({ 
		name: Joi.string().required().min(1).max(99), 
		email: Joi.string().required().email().min(1).max(99), 
		whatsapp: Joi.string().required().min(10).max(11), 
		city: Joi.string().required().min(1).max(99), 
		uf: Joi.string().required().length(2) 
	})
}), OngController.create);

routes.put('/ongs/:id', celebrate({
	[Segments.BODY]: Joi.object().keys({ 
		name: Joi.string().required().min(1).max(99), 
		email: Joi.string().required().email().min(1).max(99), 
		whatsapp: Joi.string().required().min(10).max(11), 
		city: Joi.string().required().min(1).max(99), 
		uf: Joi.string().required().length(2) 
	})
}), OngController.update); 

routes.get('/profile', celebrate({ 
	[Segments.HEADERS]: Joi.object({ 
		authorization: Joi.string().required(), 
	}).unknown(), 
}), ProfileController.index); 

routes.get('/incidents', celebrate({ 
	[Segments.QUERY]: {
		page: Joi.number(),
		city: Joi.string()
	}
}), IncidentController.index); 

routes.post('/incidents', celebrate({
	[Segments.BODY]: Joi.object().keys({
		title: Joi.string().required().min(1),
		description: Joi.string().required().min(1),
		value: Joi.number().required().min(1),
	})
}), IncidentController.create); 

routes.put('/incidents/:id', celebrate({
	[Segments.BODY]: Joi.object().keys({
		title: Joi.string().required().min(1),
		description: Joi.string().required().min(1),
		value: Joi.number().required().min(1),
	})
}), IncidentController.update);

routes.delete('/incidents/:id', celebrate({ 
	[Segments.PARAMS]: Joi.object().keys({ 
		id: Joi.number().required(),
	})
}), IncidentController.delete); 

module.exports = routes; 