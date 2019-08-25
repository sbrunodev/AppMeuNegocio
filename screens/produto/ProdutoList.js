import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
    Picker,
    ActivityIndicator,
    ToastAndroid
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import realm from '../../db/realm';

export default class ProdutoList extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Produtos",
        };
    };

    state = {
        produtos: [],
        loading: false,
        pesquisar: ''
    };

    clickBtn() {
        this.props.navigation.push('Produto')
    }

    clickItem(key) {
        Alert.alert(key);
    }

    formatNumber(numero) {
        var numero = numero.toFixed(2).split('.');
        numero[0] = "R$ " + numero[0].split(/(?=(?:...)*$)/).join('.');
        return numero.join(',');
    }

    componentDidMount() {
        this.load();
        this.props.navigation.addListener('willFocus', this.load);
    }


    load = () => {
        this.pesquisar();
    }

    getProduto(id) {
        for (var i = 0; i < this.state.produtos.length; i++)
            if (this.state.produtos[i].id == id)
                return this.state.produtos[i];
    }

    clickItem(key) {
        this.props.navigation.push('Produto', { produto: this.getProduto(key) });
    }


    getFiltros() {
        var sFiltro = "";
        var flag = false;
        if (this.state.pesquisar != '' && this.state.pesquisar != null) {
            sFiltro = 'descricao CONTAINS "' + this.state.pesquisar + '"';
            flag = true;
        }

        //Alert.alert("Situação", this.state.pesquisarStatus + "");

        if (this.pStatusValue != null && this.pStatusValue != '' && this.pStatusValue != 0) {

            if (flag)
                sFiltro += " and ";

            sFiltro += ' status =  ';
            sFiltro += this.pStatusValue == 1 ? "true" : "false";
        }
        return sFiltro;
    }

    pesquisar() {

        this.setState({ loading: true });

        let dbProdutos;
        var produtos = new Array;

        sFiltro = this.getFiltros();


        if (sFiltro == "")
            dbProdutos = realm.objects('Produto');
        else
            dbProdutos = realm.objects('Produto').filtered(sFiltro);


        for (var i = 0; i < dbProdutos.length; i++) {
            var p = dbProdutos[i];
            var objCategoria = realm.objectForPrimaryKey('Categoria', p.categoria);
            produtos.push({ id: p.id, descricao: p.descricao, status: p.status, valor: p.valor, quantidade: p.quantidade, categoria: p.categoria, categoriaDescricao: objCategoria.descricao, unidade: p.unidade });
        }

        this.setState({ produtos: produtos, loading: false });


    }

    dbExcluir(item) {

        realm.write(() => {
            var obj = realm.objectForPrimaryKey('Produto', item.id);
            realm.delete(obj);
        });

        this.pesquisar();
    }



    excluir(Obj) {
        Alert.alert(
            'Excluir',
            'Deseja excluir o Produto ' + Obj.descricao,
            [
                //{ text: 'Ask me later', onPress: () => console.log('Ask me later pressed') },
                {
                    text: 'Não',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'Sim', onPress: () => this.dbExcluir(Obj) },
            ],
            { cancelable: false },
        );
    }

    renderButton() {
        if (this.state.loading) {
            return (
                <ActivityIndicator size="large" color="#0E86F1" />
            );
        }
        else {
            return (
                <TouchableOpacity style={{ width: "100%", backgroundColor: "#0E86F1", height: 40 }} onPress={() => this.pesquisar()}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Icon name="md-search" color="#fff" size={30} />
                    </View>
                </TouchableOpacity>
            );
        }
    }

    renderItens() {

        if (!this.state.loading) {
            if (this.state.produtos == null || this.state.produtos.length == 0) {
                const info = realm ? realm.objects('Produto').length : 0;

                if (info == 0) {
                    return (
                        <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ fontSize: 18, color: 'black', marginBottom: 10 }}>Nenhum Produto foi adicionado</Text>
                            <Text style={{ fontSize: 16, color: '#2E2E2E' }}>
                                Adicione novos Produtos e tenha um maior gerenciamento sobre sua quantidade vendida/comprada
                    </Text>
                            <TouchableOpacity style={styles.FloatingButtonCenter} onPress={() => this.clickBtn()}>
                                <Icon
                                    name="md-add"
                                    size={30}
                                    color='white'

                                />
                            </TouchableOpacity>
                        </View>
                    );
                }
                else {
                    return (
                        <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ fontSize: 18, color: 'black', marginBottom: 10 }}>Nenhum Produto foi Encontrada</Text>
                        </View>
                    );
                }
            }
            else {
                return (
                    <FlatList
                        data={this.state.produtos}
                        extraData={this.state}

                        renderItem={
                            ({ item }) => {
                                return (
                                    <TouchableOpacity style={styles.ItemContainer}
                                        onLongPress={() => this.excluir(item)}
                                        onPress={() => this.clickItem(item.id)}>

                                        <View>
                                            <Text style={styles.ItemTextTitulo}> {'Produto'}</Text>
                                            <Text style={styles.ItemText}> {item.descricao}</Text>


                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: "50%" }}>
                                                    <Text style={styles.ItemTextTitulo}> {'Categoria'}</Text>
                                                    <Text style={styles.ItemText}> {item.categoriaDescricao}</Text>
                                                </View>


                                                <View style={{ width: "50%", alignItems: 'flex-end' }}>
                                                    <Text style={styles.ItemTextTitulo}> {'Valor'}</Text>
                                                    <Text style={[styles.ItemText,
                                                    { fontSize: 25, fontWeight: 'bold' }]}>
                                                        {"R$ " + item.valor.toFixed(2)}</Text>
                                                </View>
                                            </View>

                                        </View>

                                    </TouchableOpacity >
                                )
                            }
                        }
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.List}
                    />
                );
            }
        }
        else {
            return (
                <View style={{ flex: 1, alignItems: 'center', marginTop: 50 }}>
                    <ActivityIndicator size="large" color="#0E86F1" />
                    <Text style={{ fontSize: 18, color: 'black', marginBottom: 10 }}>Pesquisando :D</Text>
                </View>
            );
        }
    }

    renderFloatingButton() {
        if (this.state.produtos != null && this.state.produtos.length != 0) {
            return (
                <TouchableOpacity style={styles.FloatingButton} onPress={() => this.clickBtn()}>
                    <Icon
                        name="md-add"
                        size={30}
                        color='white'
                    />
                </TouchableOpacity>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={{ flexDirection: 'row' }}>

                    <View style={{ width: '58%', marginRight: '2%' }}>
                        <Text style={styles.Label}>Pesquisar </Text>

                        <TextInput style={styles.Input}
                            placeholder={"Descrição Ex.:"}
                            maxLength={10}
                            keyboardType={"default"}
                            onChangeText={(Text) => { this.setState({ pesquisar: Text }); this.pesquisar() }}

                            underlineColorAndroid='transparent' />
                    </View>

                    <View style={{ width: '40%' }}>
                        <Text style={styles.Label}>Situação</Text>
                        <View style={{ borderColor: 'silver', borderWidth: 1 }}>
                            <Picker
                                selectedValue={this.pStatusValue}
                                style={{ height: 39, width: "100%" }}
                                onValueChange={(itemValue, itemIndex) => { this.pStatusValue = itemValue; this.pesquisar(); }}>
                                <Picker.Item label="Todas" value="0" />
                                <Picker.Item label="Ativo" value="1" />
                                <Picker.Item label="Inativo" value="2" />
                            </Picker>
                        </View>
                    </View>

                </View>

                {this.renderItens()}
                {this.renderFloatingButton()}

            </View >
        );
    }
}

/*  <Text>Adicionar Nova Categoria</Text> */


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },

    Label: {
        fontSize: 16,
        marginBottom: 2,
    },



    List: {
        marginTop: 20,
    },

    Input: {
        padding: 10,
        width: "100%",
        fontSize: 15,
        borderColor: "#bababa",
        backgroundColor: "#fff",
        borderWidth: 1,
        height: 40
    },

    Btn: {
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        fontSize: 18,
        backgroundColor: '#DDDDDD',
    },

    ItemTextTitulo: {

        fontSize: 13,
        color: 'black'
    },

    ItemText: {
        padding: 2,
        fontSize: 17,
        paddingTop: 0,
    },

    ItemContainer: {
        borderBottomColor: '#d1d1d1',
        borderBottomWidth: 1,

    },

    FloatingButton: {
        position: 'absolute',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        right: 25,
        bottom: 25,
        backgroundColor: '#28a745',
        borderRadius: 50,
        elevation: 8

    },
    FloatingButtonCenter: {
        position: 'absolute',
        width: 65,
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#28a745',
        borderRadius: 50,
        elevation: 8,
        marginTop: 100
    },

    FloatingButtonIcons: {
        elevation: 10
    },
    ItemTextTitulo: {
        fontSize: 13,
        color: 'gray'
    },

    ItemText: {
        fontSize: 17,

        color: '#404040'
    },

});
