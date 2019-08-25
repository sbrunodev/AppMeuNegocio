import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { ScrollView, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

class SideMenu extends Component {
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>

                    <View style={styles.header}>
                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon
                                name="md-contact"
                                size={80}
                                color='black'

                            />
                        </View>

                        <View style={{ flex: 7, justifyContent: 'center', alignItems: 'flex-start' }}>
                            <Text style={{ fontWeight: 'bold', color: 'black' }}>Bruno Silva</Text>
                            <Text>brunosilva.dev@outlook.com</Text>
                        </View>

                    </View>

                    <View style={styles.navItemStyle}>
                        <Text style={styles.textItem} onPress={this.navigateToScreen('Home')}>
                            Inicio
                        </Text>
                    </View>

                    <View style={styles.navItemStyle}>
                        <Text style={styles.textItem} onPress={this.navigateToScreen('Venda')}>
                            Venda
                        </Text>
                    </View>

                    <View style={styles.navItemStyle}>
                        <Text style={styles.textItem} onPress={this.navigateToScreen('ProdutoList')}>
                            Produto
                        </Text>
                    </View>

                    <View style={styles.navItemStyle}>
                        <Text style={styles.textItem} onPress={this.navigateToScreen('ClienteList')}>
                            Cliente
                        </Text>
                    </View>

                    <View style={styles.navItemStyle}>
                        <Text style={styles.textItem} onPress={this.navigateToScreen('CategoriaList')}>
                            Categoria
                        </Text>
                    </View>

                    <View style={styles.navItemStyle}>
                        <Text style={styles.textItem} onPress={this.navigateToScreen('LancarConta')}>
                            Lançar contas a Pagar
                        </Text>
                    </View>

                    <View style={styles.navItemStyle}>
                        <Text style={styles.textItem} onPress={this.navigateToScreen('QuitarConta')}>
                            Quitar contas a Pagar
                        </Text>
                    </View>

                </ScrollView>


                <View style={styles.footerContainer}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Meu negócio 2019</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        //paddingTop: 20,
        flex: 1
    },
    header: {
        height: 100,
        justifyContent: 'center',
        backgroundColor: 'white',

        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'silver',
    },
    navItemStyle: {
        height: 40,
        justifyContent: 'center',
        paddingLeft: 5
    },
    textItem: {
        fontSize: 18
    },

    footerContainer: {
        padding: 20,
        backgroundColor: '#2B6DFA'
    }
});



SideMenu.propTypes = {
    navigation: PropTypes.object
};

export default SideMenu;
