import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom"; //o useHistory serve pra mandar o usuário p uma determinada rota
import { FiArrowLeft } from "react-icons/fi";
import "./styles.css";
import logoImg from "../../assets/logo.svg";
import api from "../../services/api";
import showCities, { estados } from "../utils/stateandcity.js";
import { useEffect } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("Selecione um Estado");

  const history = useHistory(); //criando a const history pra ser usada dentro da função

  const cidades = showCities(uf);

  /*Função que só é chamada quando o Select uf altera, a função corrige um bug que quando o uf mudava e o estado mudava junto,
   o estado que aparecia de padrão não era carregado como valor, impedindo o registro, caso o usuario não alterasse uma unica vez o estado*/
  useEffect(() => {
    if (uf != "Selecione um Estado") {
      setCity(cidades[0]);
      console.log(cidades[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uf]);

  async function handleRegister(e) {
    //função que será chamada ao "submitar" o formulário de registro da ong. o 'e' é o evento q recebemos ao executar a função
    e.preventDefault(); //isso previne o comportamento padrão da página. um ex: se n fizer isso ela recarrega inteira quando chamar a ação
    const data = {
      //criei o state com os valores, busquei eles do meu form através do onChange={e=>set...} e adicionei nessa constante para serem enviados para minha DB
      name,
      email,
      whatsapp,
      city,
      uf,
    };
    try {
      //vou tentar realizar a req e response e, se der certo:
      const response = await api.post("ongs", data); //to enviando para a rota '/ongs' a array 'data'

      if (!response.data.resp) {
        alert(`Seu ID de acesso: ${response.data.id}`); //to retornando um alerta de sucesso. response é um json contendo os dados da resposta do sistema, data um objeto desse json e id, que fica dentro do data, é o ID criado para a ong que acabou de se cadastrar
        history.push("/");
      } else {
        alert(response.data.resp);
      } //enviando o usuário de volta pra pagina inicial após realizar o cadastro
    } catch (err) {
      //se der errado
      alert("Erro no cadastro, tente novamente.");
    }
  }
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Qual o nome da ONG?"
            value={name} //to dando falando que o valor é = ao estado name
            onChange={(e) => setName(e.target.value)} //quando mudar, recebo o evento da mudança, pego seu valor e atualizo o state name
          />
          <input
            type="email"
            placeholder="Insira o e-mail da ONG"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="WhatsApp com DDD. Ex.: 11900112233"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />

          <select onChange={(e) => setUf(e.target.value)} value={uf}>
            {estados.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <select onChange={(e) => setCity(e.target.value)} value={city}>
            {cidades.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
