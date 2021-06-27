import 'react-native-gesture-handler';
import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Screen_FlatList} from './src/Screens/Screen_FlatList';
import {NosotrasScreen} from './src/Screens/NosotrasScreen';
import {MenuScreen} from './src/Screens/MenuScreen';
import {PapeleraScreen} from './src/Screens/PapeleraScreen';
import {ImportScreen} from './src/Screens/ImportScreen';

const Stack = createStackNavigator();


class App extends Component{
  constructor (){
    super ();
    this.state = {
      data: [],
      isLoading: true,
      usuariosa: {}
      
    }
  }
  componentDidMount() {

  fetch("https://randomuser.me/api/?results=10")
  .then((response => response.json()))
  .then ((responseJson) => {

    this.setState ({
     isLoading: false,
     data: responseJson.results
    });

  })
  .catch((error) => {
    console.error(error);
  });
 }

render() {

  return(

    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name ="Menu principal" component={MenuScreen}/>
        <Stack.Screen name ="Screen FlatList"  component={Screen_FlatList} options={{title: "Contactos", headerStyle:{flex:0.15}}}/>
        <Stack.Screen name ="Papelera" component={PapeleraScreen}/>
        <Stack.Screen name ="NosotrasScreen" component={NosotrasScreen}/>
        <Stack.Screen name ="Tarjetas Importadas" component={ImportScreen}/> 
       
      </Stack.Navigator>
    </NavigationContainer>
 
  )

}
}

export default App;



