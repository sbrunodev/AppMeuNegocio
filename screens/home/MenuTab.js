import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


export default class MenuTab extends Component {

    render() {
        return (
            <View style={styles.container}>

                <Text style={{ paddingLeft: 15, fontSize: 20, marginTop: 10, color: 'black' }}>Menu</Text>

                <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.push('CategoriaList')}>
                    <Text style={styles.texto}>Categoria</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.push('ClienteList')}>
                    <Text style={styles.texto}>Cliente</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.push('ProdutoList')}>
                    <Text style={styles.texto}>Produto</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.push('LancarConta')}>
                    <Text style={styles.texto}>Lançar contas a Pagar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => this.props.navigation.push('QuitarConta')}>
                    <Text style={styles.texto}>Quitar contas a Pagar</Text>
                </TouchableOpacity>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    btn: {
        borderBottomColor: 'silver',
        borderBottomWidth: 1,
        height: 40,
        width: "100%",
        justifyContent:'center',
        
    },
    texto: {
        fontSize: 16,
        marginLeft: 15
    }
});
