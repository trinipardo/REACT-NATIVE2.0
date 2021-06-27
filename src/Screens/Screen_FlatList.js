import React, { Component } from 'react';
import {
  View,
  FlatList,
  TextInput,
  Button,
  Text,
  ActivityIndicator,
  SafeAreaView,

} from 'react-native';
import { getData } from '../Biblioteca/RandomUsers';
import { Tarjeta } from "../Componentes/Tarjeta";
import Header from "../Componentes/Header";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../Styles/stilo';




export class Screen_FlatList extends Component {
  constructor() {
    super();
    this.state = {
      contactos: [],
      cantidadContactos: "0", 
      cargarDatos: false,
      text: '',
      search: '',
      contactoOriginal: [],
      textoBuscar: " ",
      contactosImportados: [],
      numeroContactos: " ",
      apiImportada: []
    }
  }

  componentDidMount() {
    this.unsuscribe = this.props.navigation.addListener("focus", () => {
      this.getContactoStore();
    })
  }

  componentWillUnmount() {
    this.unsuscribe()
  }

  keyExtractor = (item, idx) => idx.toString();
  renderItem = ({ item }) => {
    return (

      <View>
        <Tarjeta
          showRemovePapelera={false}
          showRemoveButton={false}
          showImportButton={true}
          storeOfContacts={this.storeOfContacts.bind(this)}
          item={item}
          showRecuperarContacto={false}

        ></Tarjeta>



      </View>
    )
  }


  async storeOfContacts(value) {
    try {

      alert("El contacto seleccionado fue importado correctamente")

      this.state.contactosImportados.push(value)

      const jsonValue = JSON.stringify(this.state.contactosImportados)

      await AsyncStorage.setItem("@misContactos", jsonValue)

      let cantidadDeContactosImportados = this.state.contactosImportados.length
      this.setState({ cantidadContactos: cantidadDeContactosImportados })

      let resultado = this.state.contactos.filter((item) => {
        return item.login.uuid !== value.login.uuid
      })

      this.setState({ contactos: resultado })
    } catch (error) {
      console.log(error);
    }
  }

  cargarContactos() {
    this.getDataApi()
    this.setState({ cargarDatos: true })
  }

  async getDataApi() {
    let tarjetas = await getData(this.state.numeroContactos)
    this.setState({ contactos: tarjetas, apiImportada: tarjetas, cargarDatos: false })
  }

  async getContactoStore() {
    try {
      const value = await AsyncStorage.getItem("@misContactos");
      console.log(value);

      if (value !== null) {
        const tarjetas_recuperadas = JSON.parse(value);
        this.setState({ contactosImportados: tarjetas_recuperadas })
      } else {
        console.log("No existe");
      }
    } catch (error) {
      console.log(error);
    }
  }

  separator = () => {
    return (
      <View style={styles.separator} />

    )
  }



  render() {

    return (

      <SafeAreaView style={styles.containerFlatList}>

        <Header />


        <View>
          <TextInput style={styles.SearchBar} placeholder="Ingrese cantidad" keyboardType="numeric" onChangeText={text => { this.setState({ numeroContactos: text }) }} >

          </TextInput>
          <Button title="Cargar" onPress={this.cargarContactos.bind(this)}></Button>
          <Text > Cantidad de importados : {this.state.cantidadContactos} </Text>

        </View>



        {
          this.state.cargarDatos
            ? <ActivityIndicator
              color="black"
              size={50}
            />

            : <FlatList style={{ height: "80%" }} //para indicarle que le estas pasando un objeto
              data={this.state.contactos}
              renderItem={this.renderItem}
              separator={this.separator}
              keyExtractor={this.keyExtractor}


            >
            </FlatList>
        }

      </SafeAreaView>
    )
  }

}


