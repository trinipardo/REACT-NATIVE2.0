

import React, {Component} from 'react';
import { render } from 'react-dom';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity
 
} from 'react-native';

import { stylesButton, stylesConsola, stylesText } from './src/Styles/stilo';
import { FontAwesomeIcon, fontAwesomeIcon } from   '@fortawesome/react-native-fontawesome';
import {faBars, faBell, faCoffee, faEnvelopeOpenText, faSearch} from '@fortawesome/free-solid-svg-icons';


class App extends Component{
  constructor (){
    super ();
    this.state = {
      data: [],
      isLoading: true,
    }
  }



componentDidMount() {

 fetch("https://randomuser.me/api/?results=10")
  .then((response => response.json()))
  .then ((responseJson) => {

    this.setState ({
     isLoading: false,
     data: responseJson
    });

  })
  .catch((error) => {
    console.error(error);
  });
 }


render() {
  return (

    <View style= {{flex: 1, backgroundColor: 'black'}}>
      
      <View style= {stylesConsola.stiloConsola}> 
     
      <View style= {stylesConsola.stiloIcon}></View>

         <FontAwesomeIcon style= {stylesConsola.stiloIconSearch} icon= {faSearch} />
         <FontAwesomeIcon style= {stylesConsola.stiloIconBell} icon= {faBell} />

         <TouchableOpacity onPress= {() => this.setState({textoIngresado: this.state.textHandlerNombre + "" + this.state.textHandlerApellido + "" + this.state.textHandlerTelefono})}>

         <FontAwesomeIcon style= {stylesConsola.stiloIconBars} icon={faBars}  />
         
         </TouchableOpacity>
        
        <Text style={stylesConsola.stiloConsolaTexto}> MyConections </Text> 
      </View>
      

  
<View style= {{flex:  1, flexDirection:'row', justifyContent: 'flex-start', alignItems: 'center', flexWrap: 'wrap'}}>
   
    <View style= {stylesButton.stiloImportar}> 
        <Text style= {stylesButton.stiloImportarTexto}> Importar Tarjetas </Text>
    </View>

    <View style= {{borderRadius: 10, width: 200, height: 150,  backgroundColor: 'pink',  top: 15, marginLeft: 8, flex: 1.40}}> 
        <Text style= {{fontSize: 25, top: 40, marginLeft:30}}> Ver tarjetas importadas </Text>
    </View>
    
    <View style= {{borderRadius: 10, width: 200, height: 150,  backgroundColor: 'pink',  top: 20, marginLeft: 8, flex: 1.40}}> 
        <Text style= {{fontSize: 25, top: 40, marginLeft:30}}> Papelera de reciclaje </Text>
    </View>

    <View style= {{borderRadius: 10, width: 200, height: 150,  backgroundColor: 'pink',  top: 25, marginLeft: 8, flex: 1.40, justifyContent: 'space-between'}}> 
        <Text style= {{fontSize: 25, top: 40, marginLeft:30}}> Buscar Tarjetas </Text>
    </View>

    <View style= {{borderRadius: 10, width: 200, height: 150,  backgroundColor: 'pink',  top: 30, marginLeft: 8, flex: 1.40}}> 
        <Text style= {{fontSize: 25, top: 40, marginLeft:30}}> Acerca de nosotros! </Text>
    </View>

    </View>
  
  </View>

  )

}

}




export default App;


 
