import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    CheckBox,
    Alert
} from 'react-native';

import realm from '../../db/realm';

export default class Cliente extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Cliente",
        };
    };

    state = {
        id: '0',
        nome: '',
        cpf: '',
        celular: '',
        status: true
    };

    constructor(props) {
        super(props);
        //realm = new Realm({
        //    schema: [{ name: 'Cliente', primaryKey: 'id', properties: { id: 'int', nome: 'string', cpf: 'string', celular: 'string', status: 'bool' } }]
        //})
    }

    componentDidMount() {
        const { navigation } = this.props;
        var c = navigation.getParam('cliente');

        if (c)
            this.setState({ id: c.id, nome: c.nome, cpf: c.cpf, celular: c.celular, status: c.status });
    }



    async showFirstContactAsync() {

    }

    valida() {
        var sErro = "";
        if (this.state.nome == "" || this.state.nome == null)
            sErro = "Informe o Nome do Cliente";

        return sErro;
    }

    btnSalvar() {
        var sValida = this.valida();

        if (sValida == "") {

            var nome = this.state.nome;
            var cpf = this.state.cpf;
            var celular = this.state.celular;
            var status = this.state.status;

            var id;
            if (this.state.id == 0) {
                const lastUser = realm.objects('Cliente').sorted('id', true)[0];
                const highestId = lastUser == null ? 0 : lastUser.id;
                var id = highestId == null ? 1 : highestId + 1;
            }
            else
                id = this.state.id;


            try {
                realm.write(() => {
                    if (this.state.id == 0)
                        realm.create('Cliente', { id: id, nome: nome, cpf: cpf, celular: celular, status: status });
                    else
                        realm.create('Cliente', { id: id, nome: nome, cpf: cpf, celular: celular, status: status }, true);
                });
            }
            catch (err) {
                Alert.alert("Erro", err.toString());
            }
            this.setState({
                id: '0',
                nome: '',
                cpf: '',
                celular: '',
                status: true
            });


            if (this.state.id != 0)
                this.props.navigation.goBack();
        }
        else
            Alert.alert(sValida);
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

    renderInformacaoCb() {
        if (this.state.status == false) {
            return (
                <Text>
                    {'Esse Cliente não será mais exibido no momento de vincular a venda'}
                </Text>
            )
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <View style={styles.container}>

                    <Text style={styles.Label}>Nome</Text>

                    <TextInput style={styles.Input}
                        placeholder={"Nome"}
                        maxLength={30}
                        onChangeText={(Text) => { this.setState({ nome: Text }) }}
                        value={this.state.nome}
                        keyboardType={"default"}
                        underlineColorAndroid='transparent' />

                    <Text style={styles.Label}>CPF</Text>

                    <TextInput style={styles.Input}
                        placeholder={"CPF"}
                        maxLength={11}
                        onChangeText={(Text) => { this.setState({ cpf: Text }) }}
                        value={this.state.cpf}
                        keyboardType={"default"}
                        underlineColorAndroid='transparent' />

                    <Text style={styles.Label}>Celular</Text>

                    <TextInput style={styles.Input}
                        placeholder={"Celular"}
                        maxLength={11}
                        onChangeText={(Text) => { this.setState({ celular: Text }) }}
                        value={this.state.celular}
                        keyboardType={"default"}
                        underlineColorAndroid='transparent' />



                    <View style={styles.containerCb}>
                        <CheckBox
                            value={this.state.status}
                            onValueChange={() => this.setState({ status: !this.state.status })}
                        />

                        <Text style={styles.Label}> Situação: {(this.state.status == true) ? "Ativo" : "Inativo"} </Text>

                    </View>
                    {this.renderInformacaoCb()}


                </View>

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

    Label: {
        fontSize: 16,
        marginBottom: 2,
        marginTop: 5
    },

    containerCb: {
        flexDirection: 'row',
        marginTop: 15
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
