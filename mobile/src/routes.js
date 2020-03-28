import React from 'react';
import { NavigationContainer } from '@react-navigation/native'; //é como se fosse o BrowerContainer do React
import { createStackNavigator } from '@react-navigation/stack'; // é o tipo de navegação que queremos. tem por guias, rolagens, ou mais simples que é o nosso caso, apenas com botões
import Incidents from './pages/Incidents'; //importando a page dos casos
import Detail from './pages/Detail'; //importando a page dos detalhes de cada caso

const AppStack = createStackNavigator(); 
//criação de rotas mt parecida com a do ReactJS
export default function Routes() {
	return (
		<NavigationContainer>
			<AppStack.Navigator screenOptions={{ headerShown: false}}>
				<AppStack.Screen name="Incidents" component={Incidents}/>
				<AppStack.Screen name="Detail" component={Detail}/>
			</AppStack.Navigator>
		</NavigationContainer>
	);
}
//NavContainer igual ao BrowserContainer do Reactjs
//AppStack Navigator por ser o tipo de navegação StackNavigator
//AppStack Screen pra cada rota que vamos exibir
//screenOptions é pq nossa app nao vai ter o name de cada rota exibido na página