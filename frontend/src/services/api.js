import axios from 'axios'; //ferramenta para pegar dados de outro site/porta

const api = axios.create({
  baseURL: 'http://localhost:3333', //3333 é a porta do nosso backend
})
export default api;