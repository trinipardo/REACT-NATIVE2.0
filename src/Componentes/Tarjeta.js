import React, { Component } from "react";
import { View, Image, Text, Modal, Button } from "react-native";
import { styles } from '../Styles/stilo';

export class Tarjeta extends Component {

  constructor() {
    super();
    this.state = {
      showModal: false,
      itemModal: null,
      tarjetasBorradas: [],

    }
  }



  showModal(item) {
    this.setState({ itemModal: item, showModal: !this.state.showModal });
  }


  render() {
    return (


      <View style={styles.container} >
        <View style={styles.tarjeta}>
          <Image style={styles.imagen} source={{ uri: this.props.item.picture.large }} />
          <Text style={styles.titulo}> {this.props.item.name.first}</Text>
          <Text style={styles.titulo}> {this.props.item.name.last}</Text>
          <Text style={styles.texto} > Email: {this.props.item.email}</Text>
          <Text style={styles.texto}> Register date: {this.props.item.dob.date.substring(0, 10)} ({this.props.item.dob.age})</Text>

          <View style={styles.botones}>

            <Button title="Mirar Detalle" onPress={() => this.setState({ showModal: !this.state.showModal })}>

            </Button>


            {
              this.props.showImportButton && <Button onPress={() => this.props.storeOfContacts(this.props.item)} title="Importar contacto"></Button>
            }

            {
              this.props.showRecuperarContacto &&
              <Button onPress={() => this.props.recuperarUsuario(this.props.item)} title="Recuperar usuario"> </Button>
            }



          </View>

          <View style={styles.closeButton}>

            {
              this.props.showRemoveButton &&
              <Button onPress={() => this.props.removeContact(this.props.item)} title="X"></Button>
            }

            {
              this.props.showRemovePapelera &&
              <Button onPress={() => this.props.eliminarItem(this.props.item)} title="X"> </Button>
            }
          </View>


          <Modal

            visible={this.state.showModal}
            animationType="fade"
            transparent={true}>

            <View style={styles.modalContainer}>

              <View style={styles.modal}>

                <Text style={styles.textModal}>
                  <Text> Location: {this.props.item.location.street.name},
                                {this.props.item.location.street.number},
                                {this.props.item.location.city},
                                {this.props.item.location.country},
                                {this.props.item.location.postcode}
                  </Text>

                  <Text> Register Date: {this.props.item.registered.date.substring(0, 10)} </Text>

                  <Text> Phone: {this.props.item.phone} </Text>
                  {

                    this.state.itemModal &&
                    this.state.itemModal.location.street.name &&
                    this.state.itemModal.location.street.number &&
                    this.state.itemModal.location.city &&
                    this.state.itemModal.location.country &&
                    this.state.itemModal.location.postcode &&
                    this.state.itemModal.registered.date &&
                    this.state.itemModal.phone

                  }


                </Text>

                <Text style={styles.closeButton} onPress={() => this.setState({ showModal: false })}> X </Text>
              </View>

            </View>

          </Modal>
        </View>

      </View>

    )
  }
}


