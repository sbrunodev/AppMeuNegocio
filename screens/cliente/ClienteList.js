import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TextInput,
    TouchableOpacity,
    Picker,
    ActivityIndicator,
    Alert,
} from 'react-native';


import Icon from 'react-native-vector-icons/Ionicons';

import realm from '../../db/realm';

export default class ClienteList extends React.Component {

    pStatusValue = 0;

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Clientes",
        };
    };

    state = {
        clientes: [],
        loading: false,
        pesquisar: ''
    }

    constructor(props) {
        super(props);
        //realm = new Realm({
        //    schema: [{ name: 'Cliente', primaryKey: 'id', properties: { id: 'int', nome: 'string', cpf: 'string', celular: 'string', status: 'bool' } }]
        //})
    }


    componentDidMount() {
        this.load();
        this.props.navigation.addListener('willFocus', this.load);
    }

    load = () => {
        this.pesquisar();
    }



    clickBtn() {
        this.props.navigation.push('Cliente')
    }

    getCliente(id) {
        for (var i = 0; i < this.state.clientes.length; i++)
            if (this.state.clientes[i].id == id)
                return this.state.clientes[i];
    }

    clickItem(key) {
        this.props.navigation.push('Cliente', { cliente: this.getCliente(key) });
    }

    getFiltros() {
        var sFiltro = "";
        var flag = false;
        if (this.state.pesquisar != '' && this.state.pesquisar != null) {
            sFiltro = 'nome CONTAINS "' + this.state.pesquisar + '"';
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
        
            let rCategorias;
            var clientes = new Array;

            sFiltro = this.getFiltros();


            if (sFiltro == "")
                rCategorias = realm.objects('Cliente');
            else
                rCategorias = realm.objects('Cliente').filtered(sFiltro);


            for (var i = 0; i < rCategorias.length; i++) {
                var p = rCategorias[i];
                clientes.push({ id: p.id, nome: p.nome, cpf: p.cpf, celular: p.celular, status: p.status });
            }

            this.setState({ clientes: clientes, loading: false });
       
    }

    dbExcluir(item) {

        realm.write(() => {
            var obj = realm.objectForPrimaryKey('Cliente', item.id);
            realm.delete(obj);
        });

        this.pesquisar();
    }

    excluir(Obj) {
        Alert.alert(
            'Excluir',
            'Deseja excluir o Cliente ' + Obj.nome,
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
            if (this.state.clientes == null || this.state.clientes.length == 0) {
                const info = realm ? realm.objects('Cliente').length : 0;

                if (info == 0) {
                    return (
                        <View style={{ flex: 1, alignItems: 'center', marginTop: 20 }}>
                            <Text style={{ fontSize: 18, color: 'black', marginBottom: 10 }}>Nenhum cliente foi adicionado</Text>
                            <Text style={{ fontSize: 16, color: '#2E2E2E' }}>
                                Adicione novos clientes e tenha um maior gerenciamento sobre quem está comprando/realizando seus produtos/serviços
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
                            <Text style={{ fontSize: 18, color: 'black', marginBottom: 10 }}>Nenhuma cliente foi Encontrada</Text>
                        </View>
                    );
                }
            }
            else {



                return (
                    <FlatList
                        data={this.state.clientes}
                        extraData={this.state}

                        renderItem={
                            ({ item }) => {
                                return (
                                    <TouchableOpacity style={styles.ItemContainer}
                                        onLongPress={() => this.excluir(item)}
                                        onPress={() => this.clickItem(item.id)}>

                                        <View>
                                            <Text style={styles.ItemTextTitulo}> {'Nome'}</Text>
                                            <Text style={styles.ItemText}> {item.nome}</Text>



                                            <View style={{ flexDirection: 'row' }}>
                                                <View style={{ width: "50%" }}>
                                                    <Text style={styles.ItemTextTitulo}> {'CPF'}</Text>
                                                    <Text style={styles.ItemText}> {item.cpf}</Text>
                                                </View>


                                                <View style={{ width: "50%", alignItems:'flex-end' }}>
                                                    <Text style={styles.ItemTextTitulo}> {'Celular'}</Text>
                                                    <Text style={styles.ItemText}> {item.celular}</Text>
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
        if (this.state.clientes != null && this.state.clientes.length != 0) {
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




              


            </View>
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
        color: 'gray'
    },

    ItemText: {
        fontSize: 17,
        
        color: '#404040'
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
    }




});
