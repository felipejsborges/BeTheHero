import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons'; //icone nativo do expo. pra usar, tem q pegar o nome do site de quem fez os ícones
import { useNavigation } from '@react-navigation/native'; //função pra ele navegar entre as paginas.
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'; //flatlist é pra colocar barra de rolagem na listagem
import api from '../../services/api';
import logoImg from '../../assets/logo.png'; //n precisa colocar 1x, 2x ou 3x pq ele ja pega automaticamente a melhor opção
import styles from './styles';

export default function Incidents() {
	const [incidents, setIncidents] = useState([]);
	const [total, setTotal] = useState(0); //contagem da quantidade total de casos
	const [page, setPage] = useState(1); //inicia na pagina 1
	const [loading, setLoading] = useState(false); //por padrao, nao vai ta carregando

	const navigation = useNavigation(); //chamando a função navigation	
	function navigateToDetail(incident) {
		navigation.navigate('Detail', { incident }); // ta falando pra navegar pra página 'Detail' e mostrar o caso 'incident' que foi o parametro recebido ao clicar no botao
	}

	async function loadIncidents() {
		if (loading) { //se ja tiver carregando (loading==true) eu vou parar por aqui, pq nao vou carregar a 3a pag por ex, se a 2a ainda n foi carregada
			return;
		}

		if (total > 0 && incidents.length === total) { //se ele ja tiver carregado pelo menos 1 caso e ja tiver carregado tudo, nao precisarei carregar mais nada
			return;
		}

		setLoading(true); // se passar pelos if, vai atualizar o loading para true, ou seja, começará a carregar e chamará a api abaixo
		const response = await api.get('incidents', { //pegando os casos que ficam na rota /incidents
			params: { page } //apenas da pagina em que estivermos
		}); 
		setIncidents([...incidents, ...response.data]); // pegando o que ja tem em incidents e adicionando o q veio da requisição api e atualizando o state incidents
		setTotal(response.headers['x-total-count']); //esse x-total.. que ta na headers do response é o valor criado no backend q fazia a soma da qtd de casos. aí to atualizando o valor do state total com ele
		setPage(page + 1); //atualizando o número da pag
		setLoading(false); //se chegar aqui é pq carregou td, entao n tem pq carregar mais
	}
	useEffect(() => {
		loadIncidents();
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={logoImg} />
				<Text style={styles.headerText}>
					Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
				</Text>
			</View>
			<Text style={styles.title}>Bem-vindo!</Text>
			<Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

			<FlatList
				data={incidents} //o flatlist executa a função renderItem X vezes sendo X a qnt de itens da array data
				style={styles.incidentList}
				keyExtractor={incident => String(incident.id)} //linha necessário como se fosse o 'key' depois de um .map no reactjs. mas no ReactNative é um função que retorna uma variável única
				showsVerticalScrollIndicator={false} //faço isso p ter a função do scroll mas não a parte visual
				onEndReached={loadIncidents} //quando chegar no final do que ta aparecendo vai carregar mais
				onEndReachedThreshold={0.2} //qnd tiver faltando 20% pra acabar a pag vai carregar mais
				renderItem={({ item: incident }) => ( //essa função recebe um parametro de nome 'item', faço item: incident pra ela ter o nome de 'incident' e nao bugar a mente
					<View style={styles.incident}>
						<Text style={styles.incidentProperty}>ONG:</Text>
						<Text style={styles.incidentValue}>{incident.name}</Text>					
						<Text style={styles.incidentProperty}>CASO:</Text>
						<Text style={styles.incidentValue}>{incident.title}</Text>
						<Text style={styles.incidentProperty}>Valor:</Text>
						<Text style={styles.incidentValue}>{
							Intl.NumberFormat('pt-BR', { 
								style: 'currency', 
								currency: 'BRL'
							}).format(incident.value)
						}</Text>
						<TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
							<Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
							<Feather name="arrow-right" size={16} color="#E02041" />
						</TouchableOpacity>
					</View>
				)}
			/>
		</View>
	);
}