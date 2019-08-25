import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    CheckBox,
    ScrollView,
    Picker,
    Alert
} from 'react-native';

import realm from '../../db/realm';

export default class Produto extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Produto",
        };
    };

    state = {
        id: '0',
        descricao: '',
        valorProduto: 0,
        categoria: '-1',
        unidade: 'un',
        quantidade: null,
        status: true,
    }



    valida() {
        var sErro = "";
        if (this.state.descricao == "" || this.state.descricao == null)
            sErro = "Informe uma descrição para o Produto \n";

        if (this.state.valorProduto == "" || this.state.valorProduto == null || this.state.valorProduto == 0)
            sErro += "Informe uma descrição para o Produto \n";

        if (this.state.categoria == "" || this.state.categoria == null || this.state.categoria == -1)
            sErro += "Informe uma Categoria \n";

        if (this.state.quantidade == "" || this.state.quantidade == null)
            this.setState({ quantidade: 0 });

        return sErro;
    }

    btnSalvar() {
        var sValida = this.valida();

        if (sValida == "") {

            var descricao = this.state.descricao;
            var status = this.state.status;
            var id;
            if (this.state.id == 0) {
                const lastUser = realm.objects('Produto').sorted('id', true)[0];
                const highestId = lastUser == null ? 0 : lastUser.id;
                var id = highestId == null ? 1 : highestId + 1;
            }

            var valor = parseFloat(this.state.valorProduto);
            var quantidade = parseFloat(this.state.quantidade);


            try {
                realm.write(() => {

                    if (this.state.id == 0)
                        realm.create('Produto', {
                            id: id,
                            descricao: this.state.descricao,
                            valor: valor,
                            categoria: this.state.categoria,
                            unidade: this.state.unidade,
                            quantidade: quantidade,
                            status: this.state.status
                        });
                    else
                        realm.create('Produto', { id: this.state.id, descricao: descricao, status: status }, true);
                });
            }
            catch (err) {
                Alert.alert("Erro", err.toString());
            }

            this.setState({
                id: '0',
                descricao: '',
                valorProduto: 0,
                categoria: '-1',
                unidade: 'un',
                quantidade: '',
                status: true,
            });


            if (this.state.id != 0)
                this.props.navigation.goBack();
        }
        else
            Alert.alert("Erros Encontrados", sValida);
    }

    getContatos() {

    }

    renderEntradaTexto(pDescricao, pPlaceholder, pKeyboard, pMaxLength) {
        return (
            <View>
                <Text style={styles.Label}>{pDescricao}</Text>

                <TextInput style={styles.Input}
                    placeholder={pPlaceholder}
                    maxLength={pMaxLength}
                    keyboardType={pKeyboard}
                    underlineColorAndroid='transparent' />
            </View>
        )
    }

    getCategorias() {
        let rCategorias = realm.objects('Categoria').filtered('status = true');
        var categorias = new Array;
        for (var i = 0; i < rCategorias.length; i++) {
            var p = rCategorias[i];
            categorias.push({ id: p.id, descricao: p.descricao, status: p.status });
        }

        return categorias;

    }

    render() {
        var categorias = this.getCategorias();
        let itensCategoria = categorias.map((obj) => {
            return (
                <Picker.Item key={obj.id} label={obj.descricao} value={obj.id} />
            )
        })

        return (

            <View style={{ flex: 1 }}>
                <ScrollView style={styles.container}>

                    <Text style={styles.Label}>Descrição</Text>

                    <TextInput style={styles.Input}
                        placeholder={"Descrição"}
                        maxLength={30}
                        onChangeText={(Text) => { this.setState({ descricao: Text }) }}
                        value={this.state.descricao}
                        keyboardType={"default"}
                        underlineColorAndroid='transparent' />

                    <Text style={styles.Label}>Valor do Produto</Text>

                    <TextInput style={styles.Input}
                        placeholder={"Valor do Produto"}
                        maxLength={15}
                        onChangeText={(Text) => { this.setState({ valorProduto: Text }) }}
                        value={this.state.valorProduto}
                        keyboardType={"numeric"}
                        underlineColorAndroid='transparent' />

                    <View style={{}}>
                        <Text style={styles.Label}>Categoria</Text>
                        <View style={{ borderColor: 'silver', borderWidth: 1 }}>
                            <Picker
                                selectedValue={this.state.categoria}
                                style={{ height: 39, width: "100%" }}
                                onValueChange={(itemValue) => { this.setState({ categoria: itemValue }); }}>

                                {itensCategoria}


                            </Picker>
                        </View>
                    </View>

                    <View style={{}}>
                        <Text style={styles.Label}>Unidade de Medida</Text>
                        <View style={{ borderColor: 'silver', borderWidth: 1 }}>
                            <Picker
                                selectedValue={this.state.unidade}
                                style={{ height: 39, width: "100%" }}
                                onValueChange={(itemValue) => { this.setState({ unidade: itemValue }); }}>
                                <Picker.Item label='Unidade' value='un' />
                                <Picker.Item label='Kg' value='kg' />
                                <Picker.Item label='Mt' value='mt' />
                                <Picker.Item label='Cm' value='cm' />
                            </Picker>
                        </View>
                    </View>

                    <Text style={styles.Label}>Quantidade em Estoque</Text>

                    <TextInput style={styles.Input}
                        placeholder={"Quantidade em Estoque"}
                        maxLength={15}
                        onChangeText={(Text) => { this.setState({ quantidade: Text }) }}
                        value={this.state.quantidade}
                        keyboardType={"numeric"}
                        underlineColorAndroid='transparent' />




                    <View style={styles.containerCb}>
                        <CheckBox
                            value={this.state.status}
                            onValueChange={() => this.setState({ status: !this.state.status })}
                        />

                        <Text style={styles.Label}> Situação: {(this.state.status == true) ? "Ativo" : "Inativo"} </Text>
                    </View>

                    <Text>
                        {this.state.status ?
                            ''
                            : 'Esse Produto não será mais exibido no momento de escolher Produtos para vendas/compras'}
                    </Text>





                </ScrollView>

                <View style={styles.bottom}>
                    <TouchableOpacity style={[styles.btn, { height: 50 }]}
                        onPress={() => this.btnSalvar()}>
                        <Text>Salvar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },

    containerCb: {
        flexDirection: 'row',
        marginTop: 15
    },

    Label: {
        fontSize: 16,
        marginBottom: 2,
        marginTop: 5,
    },

    Input: {
        padding: 10,
        width: "100%",
        fontSize: 15,
        borderColor: "#bababa",
        backgroundColor: "#fff",
        borderWidth: 1,
        height: 40,

    },

    btn: {
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        fontSize: 18,
        backgroundColor: '#DDDDDD',
    },
    bottom: {
        height: 40,
        justifyContent: 'flex-end',

    },



});
