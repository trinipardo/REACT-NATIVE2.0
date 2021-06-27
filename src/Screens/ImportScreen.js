import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput } from 'react-native';
import { Tarjeta } from "../Componentes/Tarjeta";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../Styles/stilo';



export class ImportScreen extends Component {


    constructor() {
        super();
        this.state = {
            contador: 0,
            contactosImportados: [],
            tarjetasBorradas: [],
            tarjetas: [],
            text: "",
            contactoOriginal: [],
            usuarios: [],
            comentarios: " ",



        }
    }

    componentDidMount() {
        this.unsuscribe = this.props.navigation.addListener("focus", () => {
            this.getContactoStore();
            this.getBorrados
        })
    }

    componentWillUnmount() { 
        this.unsuscribe()

    }

    async getContactosStorage() {
        try {
            const value = await AsyncStorage.getItem("@miTarjeta");
            console.log(value);

            if (value !== null) {
                const contactos_recuperado = JSON.parse(value);
                this.setState({ usuarios: contactos_recuperado })
            } else {
                console.log("No se encuentra nada");
            }
        }

        catch (error) {
            console.log(error);
        }
    }

    async getContactoStore() {
        try {
            const value = await AsyncStorage.getItem("@misContactos");

            if (value !== null) {
                const usuariosObtenidos = JSON.parse(value);
                this.setState({ tarjetas: usuariosObtenidos, contactoOriginal: usuariosObtenidos })

            } else {
                console.log("No se encuentra nada");
            }
        } catch (error) {
            console.log(error);
        }
    }

    //CUANDO VUELVEN A APARECER LOS CONTACTOS DE LA PAPELERA
    async getBorrados() {
        try {
            const value = await AsyncStorage.getItem("@misContactosEliminados");
            if (value != null) {
                const contactos_recuperado = JSON.parse(value);
                this.setState({ tarjetasBorradas: contactos_recuperado })
            } else {
                console.log("No se encuentra nada")
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    //ELIMINAR CONTACTO
    async removeContact(value) {
        try {
            Alert.alert("El contacto ha sido eliminado exitosamente. Lo puede encontrar en la papelera de reciclaje.")

            this.state.tarjetasBorradas.push(value)
            const eliminados = JSON.stringify(this.state.tarjetasBorradas)
            await AsyncStorage.setItem("@misContactosEliminados", eliminados)

            let resultado = this.state.tarjetas.filter((item) => {
                return item.login.uuid !== value.login.uuid
            })

            this.setState({ tarjetas: resultado })

            const jsonValue = JSON.stringify(resultado)
            await AsyncStorage.setItem("@misContactos", jsonValue)
        } catch (error) {
            console.log(error);
        }
    };

    async storeBorrados(value) {
        try {

            Alert.alert("El contacto eliminado se encuentra en la papelera de reciclaje")
            this.state.tarjetasBorradas.push(value)
            const jsonValue = JSON.stringify(this.state.tarjetasBorradas)
            await AsyncStorage.setItem("@misContactosEliminados", jsonValue)
        } catch (error) {
            console.log(error);
        }
    }

    //BUSCADOR
    buscadorNombre(text) {
        if (text.length > 0) {
            const searchData = this.state.tarjetas.filter(item => {
                const itemFirst = item.name.first.toUpperCase();
                const textoIngresado = text.toUpperCase();

                return itemFirst.includes(textoIngresado)
            });

            this.setState({
                tarjetas: searchData,
                text: text
            })
        } else {
            this.setState({
                tarjetas: this.state.contactoOriginal
            })
        }
    }

    buscadorApellido(text) {
        if (text.length > 0) {
            const searchData = this.state.tarjetas.filter(item => {
                const itemLast = item.name.last.toUpperCase();
                const textoIngresado = text.toUpperCase();
                return itemLast.includes(textoIngresado)
            });

            this.setState({
                tarjetas: searchData,
                text: text
            })
        } else {
            this.setState({
                tarjetas: this.state.contactoOriginal
            })
        }
    }

    buscadorEdad(text) {
        if (text.length > 0) {
            const searchData = this.state.tarjetas.filter(item => {
                const itemEdad = item.dob.age.toString()
                return itemEdad.includes(text)
            });

            this.setState({
                tarjetas: searchData,
                text: text
            })
        } else {
            this.setState({
                tarjetas: this.state.contactoOriginal

            })
        }
    }





    //COMENTAR TARJETAS (SEGUIMOS INTENTANDO)
    async guardarComentarios(value) {
        try {


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
                    showRemovePapelera={false}
                    showRemoveButton={true}
                    showImportButton={false}
                    removeContact={this.removeContact.bind(this)}
                    showRecuperarContacto={false}
                    item={item}>

                </Tarjeta>


                <TextInput keyboardType="default" placeholder="Puede realizar comentarios si lo desea.." numverOfLines={5} multiline={true} onChangeText={text => this.setState({ comentarios: text })}
                />

                <TouchableOpacity onPress={() => this.guardarComentarios(item)}>
                    <Text> Guardar comentario! </Text>
                </TouchableOpacity>

            </View>
        )
    }


    render() {

        return (
            <View>
                <TextInput style={styles.SearchBar} keyboardType="default" placeholder="Buscar por nombre" onChangeText={(text) => this.buscadorNombre(text)} />
                <TextInput style={styles.SearchBar} keyboardType="default" placeholder="Buscar por apellido" onChangeText={(text) => this.buscadorApellido(text)} />
                <TextInput style={styles.SearchBar} keyboardType="number-pad" placeholder="Buscar por edad" onChangeText={(text) => this.buscadorEdad(text)} />
                <FlatList style={{ height: "80%" }}
                    data={this.state.tarjetas}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                />
            </View>
        )
    }
}