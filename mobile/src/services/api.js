import axios from 'axios';

const api = axios.create({
	baseURL: 'http://192.168.0.17:3333' //colocar o ip atual do pc e a porta da backend
});

export default api;