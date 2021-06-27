import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import {
  View,
  FlatList,
  Alert,
} from 'react-native';
import { Tarjeta } from "../Componentes/Tarjeta";


export class PapeleraScreen extends Component {

  constructor() {
    super();
    this.state = {
      contactos: [],
      tarjetas: [],
      tarjetasBorradas: [],


    }
  }

  showAlert() {
    Alert.alert(
      "Estas seguro que deseas eliminar definitivamente el contacto?",
      [
        { text: "Aceptar", onPress: () => console.log("Se presiono Aceptar") },
        { text: "Cancelar", onPress: () => console.log("Se presiono Cancel") },
      ]
    )
  }

  componentDidMount() {
    this.unsuscribe = this.props.navigation.addListener("focus", () => {
      this.getBorrados();
      this.getContactoStore();
    })
  }
  componentWillUnmount() {
    this.unsuscribe()
  }

  async getContactoStore() {
    try {
      const value = await AsyncStorage.getItem("@misContactos")

      if (value !== null) {
        const usuariosObtenidos = JSON.parse(value);
        this.setState({ tarjetas: usuariosObtenidos })
      } else {
        console.log("No se encuentra nada");
      }
    } catch (error) {
      console.log(error)
    }
  }


  async getBorrados() {
    try {
      const value = await AsyncStorage.getItem("@misContactosEliminados");

      if (value !== null) {
        const contactos_recuperado = JSON.parse(value);
        this.setState({ tarjetasBorradas: contactos_recuperado })
      } else {
        console.log("No se encuentra nada");
      }
    }
    catch (error) {
      console.log(error);

    }
  }

  async eliminarItem(value) {

    Alert.alert("Usted ha eliminado definitivamente el contacto.")
    try {
      let resultado = this.state.tarjetasBorradas.filter((item) => {
        return item.login.uuid !== value.login.uuid
      })

      this.setState({ tarjetasBorradas: resultado })

      const jsonValue = JSON.stringify(resultado)
      await AsyncStorage.setItem("@misContactosEliminados", jsonValue)
    } catch (error) {
      console.log(error);
    }
  }

  async recuperarUsuario(value) {
    try {
      let resultado = this.state.tarjetasBorradas.filter((item) => {
        return item.login.uuid !== value.login.uuid
      })

      this.setState({ tarjetasBorradas: resultado })

      const eliminados = JSON.stringify(resultado)
      await AsyncStorage.setItem("@misContactosEliminados", eliminados)

      this.state.tarjetas.push(value)

      const jsonValue = JSON.stringify(this.state.tarjetas)

      await AsyncStorage.setItem("@misContactos", jsonValue)
    } catch (error) {
      console.log(error);
    }
  }



  keyExtractor = (item, idx) => idx.toString();
  renderItem = ({ item }) => {

    return (
      <View>
        <Tarjeta
          item={item}
          showRemovePapelera={true}
          eliminarItem={this.eliminarItem.bind(this)}
          showRecuperarContacto={true}
          recuperarUsuario={this.recuperarUsuario.bind(this)}

        />
      </View>
    )
  }


  render() {

    return (

      <View>

        <FlatList
          data={this.state.tarjetasBorradas}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />




      </View>

    )
  }
}