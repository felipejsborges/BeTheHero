import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'; //useRoute serve p pegar infrmaçãoes da pagina que executei uma ação e enviar para a que abri com essa ação
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'; //o linking serve pra usar links de apps, como se fosse urls, dentro do mobile
import * as MailComposer from 'expo-mail-composer'; //importando td da extensão com o nome de MailComposer
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detail() {
	const navigation = useNavigation();
	//ao clicar em um caso específico na página q listam os casos, é ativada a função navigateToDetail que enviará para a página 'Detail'. Portanto, tenho que usar o useRoute para pegar os detalhes do caso aberto pelo usuário
	const route = useRoute();
	const incident = route.params.incident; //crio a const indident e busco os dados do incident aberto/clicado/selecionado pelo usuário na página de casos. esse valor criado agora tem o nome da ong, titulo do caso, descrição, valor... vou usalos p exibir em tela
	const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso ${incident.title} com ${Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}`; //msg padrao p mail e zap

	function navigateBack() { //voltando da pagina detail para pagina de casos
		navigation.goBack()
	}

	function sendMail() { //vai abrir o app de email quando clicar em 'e-mail' na paginas detail
		MailComposer.composeAsync({
			subject: `Herói do caso: ${incident.title}`,
			recipients: [incident.email],
			body: message,
		})
	}

	function sendWhatsapp() {
		Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${message}`);
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={logoImg} />
				<TouchableOpacity onPress={navigateBack}>
					<Feather name="arrow-left" size={28} color="#e82041" />
				</TouchableOpacity>
			</View>
			
			<View style={styles.incident}>
				<Text style={styles.incidentProperty}>CASO</Text>
				<Text style={styles.incidentValue}>{incident.title}</Text>
				<Text style={styles.incidentProperty}>ONG</Text>
				<Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf}</Text>					
				<Text style={styles.incidentProperty}>DESCRIÇÃO</Text>
				<Text style={styles.incidentValue}>{incident.description}</Text>
				<Text style={styles.incidentProperty}>VALOR</Text>
				<Text style={styles.incidentValue}>{
					Intl.NumberFormat('pt-BR', { 
						style: 'currency', 
						currency: 'BRL'
					}).format(incident.value)
				}</Text>
			</View>

			<View style={styles.contactBox}>
				<Text style={styles.heroTitle}>Salve o dia!</Text>
				<Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
				<Text style={styles.heroDescription}>Entre em contato:</Text>
				<View style={styles.actions}>
					<TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
						<Text style={styles.actionText}>WhatsApp</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.action} onPress={sendMail}>
						<Text style={styles.actionText}>E-mail</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}