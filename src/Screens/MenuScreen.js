import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';
import Header from "../Componentes/Header";
import { stylesButton } from '../Styles/stilo';

export class MenuScreen extends Component {

  render() {
    return (

      <View style={{ flex: 1, backgroundColor: 'black' }}>

        <Header></Header>


        <View style={stylesButton.container}>

          <View style={stylesButton.stiloImportar}>
            <Text style={stylesButton.stiloImportarTexto} onPress={() => this.props.navigation.navigate('Screen FlatList')}> Ver Tarjetas </Text>

          </View>

          <View style={stylesButton.stiloImportar}>
            <Text style={stylesButton.stiloImportarTexto} onPress={() => this.props.navigation.navigate('Tarjetas Importadas')}> Tarjetas Importadas </Text>
          </View>

          <View style={stylesButton.stiloImportar}>
            <Text style={stylesButton.stiloImportarTexto} onPress={() => this.props.navigation.navigate('Papelera')} > Papelera de reciclaje </Text>
          </View>

          <View style={stylesButton.stiloImportar}>
            <Text style={stylesButton.stiloImportarTexto} onPress={() => this.props.navigation.navigate('NosotrasScreen')}> Acerca de nosotras </Text>
          </View>

        </View>

      </View>

    )

  }
}