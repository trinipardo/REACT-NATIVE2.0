import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { stylesNosotras } from '../Styles/stilo';


class Nosotras extends Component {



  render() {

    return (
      <ScrollView>

        <View style={stylesNosotras.container} >


          <View style={stylesNosotras.tarjeta} >
            <Image source={require('@Img/trini.jpg')} style={stylesNosotras.imagen} />
            <Text style={stylesNosotras.titulo}>Trinidad Pardo</Text>
            <Text style={stylesNosotras.texto} >Ubicación: Buenos Aires, Argentina</Text>
            <Text style={stylesNosotras.texto}>Fecha de nacimiento: 7 de febrero del 2001 </Text>
            <Text style={stylesNosotras.texto}>Edad: 20</Text>

          </View>

          <View style={stylesNosotras.tarjeta} >
            <Image source={require('@Img/delfi.jpg')} style={stylesNosotras.imagen} />
            <Text style={stylesNosotras.titulo}>Delfina Orlansky</Text>
            <Text style={stylesNosotras.texto} >Ubicación: Buenos Aires, Argentina</Text>
            <Text style={stylesNosotras.texto}>Fecha de nacimiento: 19 de enero del 2001 </Text>
            <Text style={stylesNosotras.texto}>Edad: 20</Text>

          </View>


          <View style={stylesNosotras.tarjeta} >
            <Image source={require('@Img/mora.jpg')} style={stylesNosotras.imagen} />
            <Text style={stylesNosotras.titulo}>Mora Jaichengo</Text>
            <Text style={stylesNosotras.texto} >Ubicación: Buenos Aires, Argentina</Text>
            <Text style={stylesNosotras.texto}>Fecha de nacimiento: 20 de diciembre de 1999  </Text>
            <Text style={stylesNosotras.texto}>Edad: 21</Text>

          </View>


        </View>
      </ScrollView>





    )
  };

}

export default Nosotras