const generateUniqueId = require('../../src/utils/generateUniqueId'); //importando a função que quero importar

describe('Generate Unique ID', () => { //o primeiro parametro é apenas um nome. pode ser qq coisa, o segundo é a função q fará o teste
	it('should generate an unique ID', () => { //primeiro param pode ser qq coisa tbm
		const id = generateUniqueId();
		expect(id).toHaveLength(8);
	});
});