import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    DatePickerAndroid,
    Picker,
    Keyboard,
    Modal,
    Alert,
    TextInput
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

export default class Venda extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Venda",
        };
    };

    state = {
        codigo: "",
        cbForma: "V",
        dataVenda: "",
        addProduto: true,
        modalAdicionarProdutoVisible: false,

        // Adiciona Itens
        itemCodigo: '',
        itemProdutoCodigo: '',
        itemQuantidade: '',
        itemValorUnitario: '',
        itemValorDesconto: '',
        itemTotal: '',

        itensProdutos: []
    }

    constructor() {
        super();


    }

    Inicializa() {
        var d = new Date();
        this.setState({ dataVenda: d.toLocaleDateString('pt-BR') });
        //Alert.alert( this.getFormatterDate(d.getDay(), d.getMonth(), d.getFullYear()) );
    }

    componentWillMount() {
        this.Inicializa();
    }

    changeData() {
        this.openAndroidDatePicker();
    }

    getFormatterDate(day, month, year) {
        return (
            day.toString().padStart(2, '0') +
            '/' + (month + 1).toString().padStart(2, '0') +
            '/' + year);
    }

    async openAndroidDatePicker() {

        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date()
            });

            if (action == DatePickerAndroid.dateSetAction) {
                var dataFormat = this.getFormatterDate(day, month, year);

                this.setState({ dataVenda: dataFormat });

                Keyboard.dismiss();
            }
            else
                console.log('Cancel');


        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    adicionarProduto() {

    }


    getTotalItens() {

        var Total = ((this.state.itemValorUnitario * this.state.itemQuantidade) - this.state.itemValorDesconto);
        console.log(Total);
        if (!isNaN(Total))
            return "R$ " + Total;
        else
            return "";
    }

    renderAdicionaProduto() {

        if (this.state.addProduto) {
            return (
                <View style={{ margin: 10 }}>

                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 25, color: 'black', fontWeight: 'bold' }}>Adicionar Produtos</Text>
                    </View>


                    <View style={{ marginBottom: 5 }}>

                        <View style={{}}>
                            <Text>{"Código"}</Text>

                            <TextInput style={styles.Input}
                                placeholder={""}
                                maxLength={11}
                                onChangeText={(Text) => { this.setState({ itemCodigo: Text }) }}
                                value={this.state.itemCodigo}
                                keyboardType={"numeric"}
                                underlineColorAndroid='transparent' />

                        </View>

                        <View style={{}}>
                            <Text>{"Produto"}</Text>
                            <View style={{ borderColor: 'silver', borderWidth: 1 }}>
                                <Picker
                                    selectedValue={this.state.itemProdutoCodigo}
                                    style={{ height: 38, width: "100%" }}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ itemProdutoCodigo: itemValue })}>
                                    <Picker.Item label="Selecione o Produto" value="0" />
                                    <Picker.Item label="Produto 1" value="1" />
                                    <Picker.Item label="Produto 2" value="2" />
                                    <Picker.Item label="Produto 3" value="3" />
                                </Picker>
                            </View>
                        </View>

                        <View style={{}}>
                            <Text>{"Quantidade"}</Text>

                            <TextInput style={styles.Input}
                                placeholder={""}
                                maxLength={11}
                                onChangeText={(Text) => { this.setState({ itemQuantidade: Text }) }}
                                value={this.state.itemQuantidade}
                                keyboardType={"numeric"}
                                underlineColorAndroid='transparent' />

                        </View>

                        <View style={{}}>
                            <Text>{"Preço Unitário"}</Text>
                            <TextInput style={styles.Input}
                                placeholder={""}
                                maxLength={11}
                                onChangeText={(Text) => { this.setState({ itemValorUnitario: Text }) }}
                                value={this.state.itemValorUnitario}
                                keyboardType={"numeric"}
                                underlineColorAndroid='transparent' />
                        </View>


                        <View style={{}}>
                            <Text>{"Desconto"}</Text>

                            <TextInput style={styles.Input}
                                placeholder={""}
                                maxLength={11}
                                onChangeText={(Text) => { this.setState({ itemValorDesconto: Text }) }}
                                value={this.state.itemValorDesconto}
                                keyboardType={"numeric"}
                                underlineColorAndroid='transparent' />


                            <View style={{}}>
                                <Text>{"Total"}</Text>
                                <Text style={{ fontSize: 30, color: 'black' }} >{this.getTotalItens()}</Text>
                            </View>

                        </View>

                    </View>


                    <View>
                        <TouchableOpacity style={[styles.btn, { height: 30, backgroundColor: '#28a745' }]}
                            onPress={() => this.adicionarProduto()}>
                            <Text style={{ color: 'white', fontSize: 15 }}>Adicionar Produto</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.btn, { height: 30, backgroundColor: 'gray' }]}
                            onPress={() => {
                                this.setState({ modalAdicionarProdutoVisible: !this.state.modalAdicionarProdutoVisible })
                            }}>
                            <Text style={{ color: 'white', fontSize: 15 }}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            );
        }
        else {

        }

    }

    renderFloatingButton() {
        //if (this.state.clientes != null && this.state.clientes.length != 0) {
        return (
            <TouchableOpacity style={styles.FloatingButton} onPress={() => this.setState({ modalAdicionarProdutoVisible: !this.state.modalAdicionarProdutoVisible })}>
                <Icon
                    name="md-add"
                    size={30}
                    color='white'
                />
            </TouchableOpacity>
        )
        //}
    }

    render() {
        console.log('Render');
        return (

            <View style={styles.container}>

                <View style={{ marginTop: 5 }}>
                    <Modal

                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalAdicionarProdutoVisible}
                        onRequestClose={() => {
                            Alert.alert('Modal has been closed.');
                        }}>
                        <View style={{ margin: 22, backgroundColor: 'white', elevation: 5, borderColor: 'gray' }}>

                            {this.renderAdicionaProduto()}

                        </View>
                    </Modal>
                </View>

                <View style={[styles.containerInformacao, { marginTop: 0 }]}>

                    <View style={{ margin: 10, marginTop: 0, flex: 6 }}>
                        <Text>{"Vendedor"}</Text>
                        <View style={{ borderColor: 'silver', borderWidth: 1 }}>
                            <Picker
                                selectedValue={this.state.cbForma}
                                style={{ height: 41, width: "100%" }}
                                onValueChange={(itemValue, itemIndex) => this.setState({ cbForma: itemValue })}>
                                <Picker.Item label="Selecione o Vendedor" value="0" />
                                <Picker.Item label="Bruno Silva" value="1" />
                                <Picker.Item label="Emiry Mirella" value="2" />
                            </Picker>
                        </View>
                    </View>

                    <View style={{ margin: 10, marginTop: 0, flex: 4 }}>
                        <Text>{"Data da Venda"}</Text>
                        <TouchableOpacity style={styles.Input} onPress={() => this.changeData()}>
                            <Text>{this.state.dataVenda}</Text>
                        </TouchableOpacity>
                    </View>

                </View>




                {this.renderFloatingButton()}

            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    containerInformacao: {
        height: 80,
        backgroundColor: '#FEFEFE',
        //elevation: 1,
        //flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: 'silver',
        margin: 5
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
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        fontSize: 18,
        backgroundColor: '#DDDDDD',
    },

    btnAdicionarProduto: {

        alignItems: 'flex-start',
        fontSize: 18,
        height: 30,
        justifyContent: 'center',

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

    Input: {
        padding: 10,
        width: "100%",
        fontSize: 15,
        borderColor: "#bababa",
        backgroundColor: "#fff",
        borderWidth: 1,
        height: 40
    },
});
