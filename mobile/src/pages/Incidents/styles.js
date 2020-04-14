import { StyleSheet } from 'react-native';
import Constants from 'expo-constants'; //contém algumas constantes que auxilia p fazer o código

export default StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: Constants.statusBarHeight + 15,
	},

	header: {
		width: '100%',
		flexDirection: 'row',	
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	logoImg: {
		width: '30%'
	},

	title: {
		width: '70%',
		fontSize: 30,
		color: '#13131a',		
		fontWeight: 'bold',
		marginLeft: 30,
	},
	
	filterContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
		backgroundColor: '#FFF',
		marginTop: 10,
		marginBottom: 20,
		padding: 10
	},

	filterTitle: {
		justifyContent: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		color: '#13131a',
	},

	filterAction: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},

	selectsContainer: {
		flexDirection: 'column',
		marginRight: 10,
	},

	selectUfCity: {
		backgroundColor: '#F0F0F0',
		justifyContent: 'center',
		alignContent: 'center',		
		width: 230,
		margin: 5,
		borderRadius: 8
	},

	filterButtons: {
		flexDirection: 'column',
		marginLeft: 10,
	},

	applyClearFilter: {
		alignItems: 'center',
		padding: 10,
	},

	applyClearFilterText: {
		alignItems: 'center',
		color: '#e02041',
		fontSize: 20,
		fontWeight: 'bold'	
	},

	incidentsCountContent: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 20,		
		marginTop: 5
	},

	incidentsCountContentText: {
		fontSize: 14
	},

	listTitle: {
		alignSelf: 'center',
		fontSize: 20,
		fontWeight: 'bold',
		color: '#13131a',
	},	

	incidentList: {
		marginTop: 10,
	},

	incident: {
		padding: 24,
		borderRadius: 8,
		backgroundColor: '#FFF',
		marginBottom: 16,
	},

	incidetProperty: {
		fontSize: 14,
		color: '#41414d',
		fontWeight: 'bold'
	},

	incidentValue: {
		marginTop: 8,
		fontSize: 15,
		marginBottom: 24,
		color: '#737380'
	},
	
	detailsButton: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},

	detailsButtonText: {
		color: '#e02041',
		fontSize: 15,
		fontWeight: 'bold'
	}
});