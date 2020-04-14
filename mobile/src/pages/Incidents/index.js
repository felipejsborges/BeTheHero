import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons'; //icone nativo do expo. pra usar, tem q pegar o nome do site de quem fez os ícones
import { useNavigation } from '@react-navigation/native'; //função pra ele navegar entre as paginas.
import { View, FlatList, Image, Text, TouchableOpacity, Picker, Alert } from 'react-native'; //flatlist é pra colocar barra de rolagem na listagem
import api from '../../services/api';
import logoImg from '../../assets/logo.png'; //n precisa colocar 1x, 2x ou 3x pq ele ja pega automaticamente a melhor opção
import styles from './styles';
import showCities, { estados } from './Utils/stateandcity';

export default function Incidents() {
	const [incidents, setIncidents] = useState([]);
	const [total, setTotal] = useState(0); //contagem da quantidade total de casos
	const [totalCity, setTotalCity] = useState(0); //contagem da quantidade total de casos
	//const [page, setPage] = useState(1); //inicia na pagina 1
	//const [loading, setLoading] = useState(false); //por padrao, nao vai ta carregando
	const [uf, setUf] = useState('Selecione um Estado');
	const [city, setCity] = useState('Selecione uma Cidade');
	
	const cidades = showCities(uf);	

	useEffect(() => {
		loadIncidents();
	}, []);

	async function loadIncidents() {
		console.log(`no loading ta chegando ${city}`);		
		setIncidents([]);
		const response = await api.get('incidents', { //pegando os casos que ficam na rota /incidents
			params: { city } //apenas da pagina em que estivermos
		});
		setTotal(response.headers['x-total-count']); //esse x-total.. que ta na headers do response é o valor criado no backend q fazia a soma da qtd de casos. aí to atualizando o valor do state total com ele
		
		if(!response.data.erro) {
			setIncidents([...response.data]); // pegando o que ja tem em incidents e adicionando o q veio da requisição api e atualizando o state incidents
			setTotalCity(response.headers['x-total-countcity']);
		} else {
			return Alert.alert(response.data.erro);
		}	
	}

	const navigation = useNavigation(); //chamando a função navigation	
	function navigateToDetail(incident) {
		navigation.navigate('Detail', { incident }); // ta falando pra navegar pra página 'Detail' e mostrar o caso 'incident' que foi o parametro recebido ao clicar no botao
	}

	async function clearFilter () {	
		setIncidents([]);
		const response = await api.get('incidents', { //pegando os casos que ficam na rota /incidents
			params: { city: 'Selecione uma Cidade' } //apenas da pagina em que estivermos
		});
		setTotal(response.headers['x-total-count']); //esse x-total.. que ta na headers do response é o valor criado no backend q fazia a soma da qtd de casos. aí to atualizando o valor do state total com ele
		setIncidents([...response.data]); // pegando o que ja tem em incidents e adicionando o q veio da requisição api e atualizando o state incidents
		setTotalCity(response.headers['x-total-countcity']);
		setUf('Selecione um Estado');
		setCity('Selecione uma Cidade');
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image style={styles.logoImg} source={logoImg} />
				<Text style={styles.title}>Bem-vindo!</Text>		
			</View>

			<View style={styles.filterContainer}>
				<Text style={styles.filterTitle}>Filtros</Text>
				<View style={styles.filterAction}>
					<View style={styles.selectsContainer}>
						<Picker
							style={styles.selectUfCity}
							onValueChange={e => {
								const u = e;					
								setUf(u);
							}}
							selectedValue={uf}
						>
							{estados.map( item => (
								<Picker.Item									
									key={item}
									label={item}
									value={item}
								/>
							))}
						</Picker>
						<Picker
							style={styles.selectUfCity}
							onValueChange={e => {
								const c = e;					
								setCity(c);
							}}
							selectedValue={city}
      			>
							{cidades.map( item => (
								<Picker.Item
									key={item}
									label={item}
									value={item}
								/>
							))}
      			</Picker>
					</View>

					<View style={styles.filterButtons}>
						<TouchableOpacity
							style={styles.applyClearFilter}
							onPress={() =>loadIncidents()}>
							<Text style={styles.applyClearFilterText}>Aplicar</Text>
						</TouchableOpacity>

						<TouchableOpacity 
							style={styles.applyClearFilter} 
							onPress={() => 
							clearFilter()
						}>
							<Text style={styles.applyClearFilterText}>Limpar</Text>
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.incidentsCountContent}>
					<Text style={styles.incidentsCountContentText}>Casos no país: {total} </Text>
					<Text style={styles.incidentsCountContentText}>Casos na cidade: {totalCity} </Text>
				</View>
			</View>
			
			<Text style={styles.listTitle}>Ajude em algum caso abaixo</Text>
			
			<FlatList
				data={incidents} //o flatlist executa a função renderItem X vezes sendo X a qnt de itens da array data
				style={styles.incidentList}
				keyExtractor={incident => String(incident.id)} //linha necessário como se fosse o 'key' depois de um .map no reactjs. mas no ReactNative é um função que retorna uma variável única
				showsVerticalScrollIndicator={false} //faço isso p ter a função do scroll mas não a parte visual
				//onEndReached={loadIncidents} //quando chegar no final do que ta aparecendo vai carregar mais
				//onEndReachedThreshold={0.2} //qnd tiver faltando 20% pra acabar a pag vai carregar mais
				renderItem={({ item: incident }) => ( //essa função recebe um parametro de nome 'item', faço item: incident pra ela ter o nome de 'incident' e nao bugar a mente
					<View style={styles.incident}>
						<Text style={styles.incidentProperty}>CASO</Text>
						<Text style={styles.incidentValue}>{incident.title}</Text>
						<Text style={styles.incidentProperty}>ONG</Text>
						<Text style={styles.incidentValue}>{incident.name}</Text>					
						<Text style={styles.incidentProperty}>Valor</Text>
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