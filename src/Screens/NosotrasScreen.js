import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import Nosotras from "../Componentes/Nosotras";
import Header from "../Componentes/Header";
import { styles } from '../Styles/stilo';

export class NosotrasScreen extends Component {

    separator = () => {
        return (
            <View style={styles.separator} />
        )
    }

    render() {

        return (
            <View>

                <Header />

                <Nosotras separator={this.separator} >
                </Nosotras>

            </View>
        )

    }



}