import React, {useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; //necessário para que, ao abrir uma nova página, ele n precise recarregar td a página inteira novamente, apenas abre a página desejada
import { FiLogIn } from 'react-icons/fi' //o /fi é pq quero o feather icons e o FiLogIn é o ícone específico que eu quero
import api from '../../services/api';
import './styles.css';
import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon() {
  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) { //essa parte é mt igual ao configurado no Regist/index.js
    e.preventDefault();
    try {
      const response = await api.post('sessions', {id}); //enviado o id para a rota /sessions
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', response.data.name);
      history.push('/profile'); //direcionando para o perfil da ong
    } catch (err) {
      alert('Falha no login, tente novamente');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero"/>
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input 
            placeholder="Sua ID" 
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Entrar</button>
          <Link className="back-link" to="/register">
          <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Hero" />
    </div>
  );
}