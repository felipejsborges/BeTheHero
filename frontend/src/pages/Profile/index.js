import React, { useState, useEffect } from 'react'; //o useEffect é usado para disparar uma função em um determinado momento, sem depender de um clique, por exemplo
import { Link, useHistory } from 'react-router-dom'; //necessário para que, ao abrir uma nova página, ele n precise recarregar td a página inteira novamente, apenas abre a página desejada
import { FiPower, FiTrash2 } from 'react-icons/fi' //o /fi é pq quero o feather icons e o FiLogIn é o ícone específico que eu quero
import './styles.css';
import logoImg from '../../assets/logo.svg'
import api from '../../services/api';

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
    //o useEffect é uma função q recebe dois parâmetros. o primeiro é a função q será executada. e o segundo é o elemento q quando alterado irá disparar a função.
  useEffect(() => {
    //a função q será executada é pegar, através da rota /profile
    api.get('profile', {
      headers: { //enviando a informação de q preciso retornar os incidents apenas da ong que está logada
        Authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data); //to atualizando o state incidents
    })
  }, [ongId]) //nesse caso nosso segundo parâmetro será o Id da ong, pois, se o ID da ong for alterado (isso n acontecerá mas se recomenda essa config pro React), a função será acionada novamente e os incidents seriam atualizados
  async function handleDeleteIncident(id) { //função de deletar um caso
    try {
      await api.delete(`incidents/${id}`, {
        headers: { //pra deletar um caso, preciso conferir q é a ong que o criou
          Authorization: ongId,
        }
      });
      //depois de excluir, preciso atualizar a state incidents:
      setIncidents(incidents.filter(incident => incident.id !== id)); //to falando pra minha array só conter os incidents que tenham id diferente do que mandei excluir
    } catch (err) {
      alert('Erro ao deletar caso, tente novamente.')
    }
  }
  function handleLogout() {
    localStorage.clear(); //apagando o que foi salvo ao realizar login
    history.push('/');
  }
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero"/>
        <span>Bem vinda, {ongName}</span>
        <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#e02041" />
        </button>
      </header>
      <h1>Casos cadastrados</h1>
      <ul>
        {incidents.map(incident => ( //fazendo o map no incident e pra cada iteração vou criar a estrutura abaixo. preciso por o key (com um valor único para cada incident) no primeri li quando for fazer o map. a formatação para dinheiro está explicada na linha de 'VALOR'
          <li key={incident.id}>
          <strong>CASO:</strong>
          <p>{incident.title}</p>

          <strong>DESCRIÇÃO</strong>
          <p>{incident.description}</p>

          <strong>VALOR:</strong>
          <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

          <button onClick={() => handleDeleteIncident(incident.id)} type="button">
            <FiTrash2 size={20} color="#a8a8b3" />
          </button>
        </li>       
        ))} 
      </ul>      
    </div>
  );
}