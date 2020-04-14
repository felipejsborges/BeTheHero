const crypto = require('crypto'); //importado para usar um método específico dele (randomBytes)

module.exports = function generateUniqueId() {
	return crypto.randomBytes(4).toString('HEX'); //criando o id através do método randomBytes do crypto que criará uma string de 4 bytes no formato hexadecimal
}