import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';


export default class Resumo extends Component {

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#2B6DFA" barStyle="light-content" />

                <View style={styles.containerTituloResumo}>
                    <Text style={styles.titulo}>Resumo do Dia 11/02/2010</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    containerTituloResumo: {
        margin: 10,
        borderBottomColor: 'silver',
        borderBottomWidth: 1
    },
    titulo: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black'
    }

});
