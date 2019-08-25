import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Image } from 'react-native';


export class Card extends Component {


    render() {

      
        switch(this.props.caminhoImg)
        {
            case 'produtos': img = require("../img/produtos.jpg"); break;
            case 'categorias': img = require("../img/categorias.jpg"); break;
            case 'clientes': img = require("../img/clientes.png"); break;
            case 'contas': img = require("../img/contaspagar.png"); break;
        }

        return (
            <View style={styles.container}>

                <View style={styles.containerTitulo}>
                    <Text style={styles.titulo}>{this.props.titulo}</Text>
                    <Text style={styles.subTitulo}>{this.props.subTitulo}</Text>
                </View>

                <View style={styles.containerImg}>
                    <Image 
                        
                        source={img}


                        style={{ width: '100%', height: 200 }} />
                </View>

                <View style={styles.containerTexto}>
                    <Text style={styles.texto}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed tempus nunc. Pellentesque at suscipit magna. Nullam in tortor nunc. In hac habitasse platea dictumst
                    </Text>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        elevation: 2,
        borderBottomColor: 'gray',
    },

    containerTitulo: {
        height: 50,
        paddingLeft: 10,
        paddingTop: 5,
        marginBottom: 5,
        borderBottomColor: '#dedede',
        borderBottomWidth: 1,
    },

    containerTexto: {
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 10
    },

    containerImg: {
        paddingLeft: 10,
        paddingRight: 10,
    },

    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black'
    },

    subTitulo: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'gray'
    },

    texto: {
        fontSize: 14,
        color: 'gray'
    }

});
