import React, { Component } from 'react';
import { Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
  createDrawerNavigator
} from 'react-navigation';

import SideMenu from '../components/SideMenu';

import HomeScreen from '../screens/home/Home';
import ResumoScreen from '../screens/home/Resumo';
//import MenuTabScreen from '../screens/home/MenuTab';

import ProdutoScreen from '../screens/produto/Produto';
import ProdutoListScreen from '../screens/produto/ProdutoList';

import CategoriaScreen from '../screens/categoria/Categoria';
import CategoriaListScreen from '../screens/categoria/CategoriaList';

import ClienteScreen from '../screens/cliente/Cliente';
import ClienteListScreen from '../screens/cliente/ClienteList';

import LancarContaScreen from '../screens/contasPagar/LancarConta';
import QuitarContaListScreen from '../screens/contasPagar/QuitarConta';

import LoginScreen from '../screens/login/Login';
import CriarContaScreen from '../screens/login/CriarConta';

import VendaScreen from '../screens/venda/Venda';

const TabNavigator = createMaterialTopTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Inicio',
      },
    },


    Resumo: {
      screen: ResumoScreen,
      navigationOptions: {
        title: 'Resumo',
      },
    },


    //MenuTab: {
    //  screen: MenuTabScreen,
    //  navigationOptions: {
    //    title: 'Menu',
    //  },
    //},
  },
  {
    header: null,
    headerMode: 'none',

    tabBarOptions: {

      labelStyle: {
        fontSize: 12,
        color: '#2196f3',
      },
      tabStyle: {
        //width: 100,

      },
      style: {
        backgroundColor: '#white',
        //borderWidth:0,

        //borderBottomColor: 'silver',

        //elevation: 1
        //borderBottomWidth: 0, elevation: 5

      },
      indicatorStyle: {
        backgroundColor: '#2196f3',

      },
    }
  }
);

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: TabNavigator,
      navigationOptions: {
        title: 'Meu negócio',
        headerStyle: {
          backgroundColor: '#2196f3',

          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: 'white',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: (
          <TouchableOpacity onPress={() => { }}>
            <Icon
              name="md-menu"
              size={30}
              color='white'
              style={{ marginLeft: 15 }}
            />
          </TouchableOpacity>

        ),
        headerRight: (
          <TouchableOpacity>
            <Icon
              name="md-contact"
              size={30}
              color='white'
              style={{ marginRight: 15 }}
            />
          </TouchableOpacity>

        ),

      },
    },

    Produto: { screen: ProdutoScreen },
    ProdutoList: { screen: ProdutoListScreen },

    Categoria: { screen: CategoriaScreen },
    CategoriaList: { screen: CategoriaListScreen },

    Cliente: { screen: ClienteScreen },
    ClienteList: { screen: ClienteListScreen },

    LancarConta: { screen: LancarContaScreen },
    QuitarConta: { screen: QuitarContaListScreen },

    Venda: { screen: VendaScreen },

  },
  {
    initialRouteName: 'Home',
  }

);

const Gaveta = createDrawerNavigator({
  Home: { screen: AppNavigator },
  ProdutoList: { screen: ProdutoListScreen },
  CategoriaList: { screen: CategoriaListScreen },
  ClienteList: { screen: ClienteListScreen },
  LancarConta: { screen: LancarContaScreen },
  QuitarConta: { screen: QuitarContaListScreen },
},
  {
    contentComponent: SideMenu,
    drawerWidth: 300
  });

const AuthStack = createStackNavigator({
  Login: { screen: LoginScreen },
  CriarConta: { screen: CriarContaScreen },
});


export default createAppContainer(createSwitchNavigator(
  {
    App: Gaveta,
    Auth: AuthStack,

  },
  {
    initialRouteName: 'Auth',
  }
));