const app = require('./app');

app.listen(3333); //vai executar o app quando for requisitada a porta '3333'

//preciso dividir essa parte do app.js pq vou executar o app.js nos testes, e eu não quero q seja aberta a porta e que, com isso, outras pessoas acessem o meu teste