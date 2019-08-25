import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView } from 'react-native';
import { Card } from '../../components/Card';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Home extends Component {

  /*
  <View style={styles.containerInformacao} >
    <Text style={styles.textoInformacao}>Empresa LTDA ME</Text>
    <Text style={styles.subTitulo}>Bruno Silva</Text>
  </View>
  */
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#2196f3" barStyle="light-content" />

        <ScrollView style={{  }}>

          <Card
            titulo="Produtos"
            subTitulo="Gerencie seus Produtos"
            caminhoImg="produtos"
          />

          <Card
            titulo="Categorias"
            subTitulo="Gerencie as categorias dos seus Produtos"
            caminhoImg="categorias"
          />

          <Card
            titulo="Clientes"
            subTitulo="Controle seus clientes"
            caminhoImg="clientes"
          />

          <Card
            titulo="Contas a Pagar"
            subTitulo="Gerencie a saude financeira da sua Empresa"
            caminhoImg="contas"
          />


        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerInformacao: {
    height: 60,
    backgroundColor: '#FEFEFE',
    elevation: 1,
  },
  textoInformacao: {
    fontSize: 18,
    margin: 5,
    marginLeft: 15,
    marginTop: 0

  },
  subTitulo: {
    color: '#333333',
    marginBottom: 5,
    marginLeft: 15,
  },

  btn: {
    padding: 12,
    width: "100%",
    backgroundColor: 'white',
    fontSize: 18,
    borderBottomColor: '#E5E5E5',
    borderBottomWidth: 1
  }
});
