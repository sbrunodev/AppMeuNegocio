import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    CheckBox
} from 'react-native';

import realm from '../../db/realm';


export default class Categoria extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Categoria",
        };
    };

    state = {
        id: '0',
        descricao: '',
        status: true,
    };

    constructor(props) {
        super(props);
        //realm = new Realm({
        //    schema: [{ name: 'Categoria', primaryKey: 'id', properties: { id: 'int', descricao: 'string', status: 'bool' } }]
        //})
    }

    

    componentWillMount() {

    }

    componentDidMount() {
        const { navigation } = this.props;
        var c = navigation.getParam('categoria');

        if (c)
            this.setState({ id: c.id, descricao: c.descricao, status: c.status });
    }

    GetItens() {


    }

    valida() {
        var sErro = "";
        if (this.state.descricao == "" || this.state.descricao == null)
            sErro = "Informe uma descrição para a Categoria";

        return sErro;
    }

    btnSalvar() {
        var sValida = this.valida();

        if (sValida == "") {

            var descricao = this.state.descricao;
            var status = this.state.status;
            var id;
            if (this.state.id == 0) {
                const lastUser = realm.objects('Categoria').sorted('id', true)[0];
                const highestId = lastUser == null ? 0 : lastUser.id;
                var id = highestId == null ? 1 : highestId + 1;
            }


            try {
                realm.write(() => {

                    if (this.state.id == 0)
                        realm.create('Categoria', { id: id, descricao: descricao, status: status });
                    else
                        realm.create('Categoria', { id: this.state.id, descricao: descricao, status: status }, true);
                });
            }
            catch (err) {
                Alert.alert("Erro", err.toString());
            }
            this.setState({ descricao: '' });


            if (this.state.id != 0)
                this.props.navigation.goBack();
        }
        else
            Alert.alert(sValida);
    }

    renderInformacaoCb() {
        if (this.state.status == false) {
            return (
                <Text>
                    {'Essa categoria não será mais exibida no momento de escolher a categoria para o Produto'}
                </Text>
            )
        }
    }

    render() {

        return (

            <View style={{ flex: 1 }}>
                <View style={styles.container}>

                    <Text style={styles.Label}>Descrição</Text>

                    <TextInput style={styles.Input}
                        placeholder={"Descrição"}
                        maxLength={30}
                        onChangeText={(Text) => { this.setState({ descricao: Text }) }}
                        value={this.state.descricao}
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
        height: 40
    },

    btn: {
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
