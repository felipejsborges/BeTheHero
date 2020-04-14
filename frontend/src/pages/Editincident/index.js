import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiEdit } from 'react-icons/fi'
import './styles.css';
import logoImg from '../../assets/logo.svg'
import api from '../../services/api'

export default function Edit() {
  const history = useHistory();			
  const id = localStorage.getItem('incidentId');
  const incidentTitle = localStorage.getItem('incidentTitle');
  const incidentDescription = localStorage.getItem('incidentDescription');
  const incidentValue = localStorage.getItem('incidentValue');
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const [title, setTitle] = useState(incidentTitle);
  const [description, setDescription] = useState(incidentDescription);
  const [value, setValue] = useState(incidentValue);

  async function handleEdit(e) {
    e.preventDefault();   

    try {
      await api.put(`incidents/${id}`, {
        title,
        description,
        value,	      
      }, {
        headers: {
          Authorization: ongId,
        }
      });
            
      alert('Os detalhes deste caso foram alterados');   	      
      history.push('/profile');
    } catch (err) {
      
      alert('Erro na edição dos detalhes deste caso, tente novamente.');
    }
  }

  return (
    <div className="edit-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero"/>
          <h1>Editando caso da {ongName}</h1>
          <p>Altere os detalhes deste caso como desejar e clique em Salvar</p>
          <Link className="back-link" to="/profile">
          <FiEdit size={16} color="#e02041" />
            Voltar
          </Link>
        </section>
        <form onSubmit={handleEdit}>
          <input		             
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <input		             
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <input		             
            value={value}
            onChange={e => setValue(e.target.value)}
          />		          
          <button className="button" type="submit">Salvar</button>
        </form>
      </div>        
    </div>
  );
}