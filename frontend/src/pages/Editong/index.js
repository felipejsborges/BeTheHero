import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import showCities, { estados } from '../utils/stateandcity.js'

export default function Edit() {
  const history = useHistory();
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const ongEmail = localStorage.getItem('ongEmail');
  const ongWhatsapp = localStorage.getItem('ongWhatsapp');
  const ongCity = localStorage.getItem('ongCity');
  const ongUf = localStorage.getItem('ongUf');  
  const [name, setName] = useState(ongName);
  const [email, setEmail] = useState(ongEmail);
  const [whatsapp, setWhatsapp] = useState(ongWhatsapp);
  const [city, setCity] = useState(ongCity);
  const [uf, setUf] = useState(ongUf);

  const cidades = showCities(uf);

  async function handleEdit(e) {
    e.preventDefault();

    try {
      const response = await api.put(`ongs/${ongId}`, {
        name,
        email,
        whatsapp,
        city,
        uf,	      
      }, {
        headers: {
          Authorization: ongId,
          ongNameF: ongName,
          ongEmailF: ongEmail,
          ongWhatsappF: ongWhatsapp
        }
      });
      
      localStorage.setItem('ongName', name);
      localStorage.setItem('ongEmail', email);
      localStorage.setItem('ongWhatsapp', whatsapp);
      localStorage.setItem('ongCity', city);
      localStorage.setItem('ongUf', uf);

      if (!response.data.resp) {
        alert('Os dados desta ONG foram alterados');   	      
        history.push('/profile');
      } else {
        localStorage.setItem('ongName', ongName);
        localStorage.setItem('ongEmail', ongEmail);
        localStorage.setItem('ongWhatsapp', ongWhatsapp);
        alert(response.data.resp);
      }            
      
    } catch (err) {
      alert('Erro na edição dos dados desta ONG, tente novamente.');
    }
  }

  return (
    <div className="edit-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Editando dados da {ongName}</h1>
          <p>Altere os detalhes da sua ONG como desejar e clique em Salvar</p>
          <Link className="back-link" to="/profile">
          <FiEdit size={16} color="#e02041" />Voltar</Link>
        </section>
        <form onSubmit={handleEdit}>
          <input		             
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input		             
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input		             
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
          <select 
            onChange={e => setUf(e.target.value)}              
            
            value={uf} 
          >
            {estados.map( item => (
              <option key={item}>
                {item}
              </option>
            ))}              
          </select>

          <select               
            onChange={e => setCity(e.target.value)}
                                        
            value={city}
          >             
              {cidades.map( item => (
                <option key={item}>
                {item}
              </option>
              ))}              
          </select>
          <button className="button" type="submit">Salvar</button>
        </form>
      </div>        
    </div>
  );
}