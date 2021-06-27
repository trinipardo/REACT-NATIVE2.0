import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { stylesConsola } from '../Styles/stilo';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';


class Header extends Component {


  render() {

    return (

      <View style={stylesConsola.containerHeader}>

        <View style={stylesConsola.stiloConsola}>

          <View style={stylesConsola.stiloIcon}></View>

          <FontAwesomeIcon style={stylesConsola.stiloIconSearch} icon={faSearch} />
          <FontAwesomeIcon style={stylesConsola.stiloIconBell} icon={faBell} />

          <FontAwesomeIcon style={stylesConsola.stiloIconBars} icon={faBars} />



          <Text style={stylesConsola.stiloConsolaTexto}> MyConections </Text>
        </View>

      </View>

    )
  }
}

export default Header
