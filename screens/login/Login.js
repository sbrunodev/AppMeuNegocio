import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    CheckBox,
    Alert,
    StatusBar
} from 'react-native';

export default class Login extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        };
    };

    state = {
        cbSituacao: true,
    }

    async componentDidMount() {
        this.props.navigation.setParams({ getContatos: this.getContatos });
    }

    async showFirstContactAsync() {

    }

    btnSalvar() {
        this.showFirstContactAsync();
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

    btnEntrar() {
        //this.props.navigation.push('App');
        this.props.navigation.navigate('App');
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#2196f3" barStyle="light-content" />
                <View style={{ heigth: 40, alignItems: 'center', justifyContent: 'center', marginTop: 25, marginBottom: 25 }}>
                    <Text style={[styles.Label, { fontSize: 40, color: 'black' }]}> Meu negócio  </Text>
                </View>

                <View style={{ flex: 1 }}>
                    {this.renderEntradaTexto('Usuário', 'Usuário', 'default', 20)}
                    {this.renderEntradaTexto('Senha', '••••••••', 'default', 15)}

                    <View style={styles.containerCb}>
                        <CheckBox
                            value={this.state.cbSituacao}
                            onValueChange={() => this.setState({ cbSituacao: !this.state.cbSituacao })}
                        />

                        <Text style={styles.Label}> Manter Conectado </Text>
                    </View>

                    <TouchableOpacity style={[styles.btn, { backgroundColor: '#007bff' }]} onPress={() => this.btnEntrar()}>
                        <Text style={{ fontSize: 16, color: 'white' }}>Entrar</Text>
                    </TouchableOpacity>

                    <Text style={{ textAlign: 'right', fontSize: 17 }} >Ajuda ? </Text>

                </View>

                <View style={{ alignItems: 'center', height: 100 }}>
                    <TouchableOpacity onPress={() => Alert.alert('Esqueceu sua senha ?')}>
                        <Text style={{ fontSize: 18 }}>Esqueceu sua senha ?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.push('CriarConta')}>
                        <Text style={{ fontSize: 18 }}>Criar conta</Text>
                    </TouchableOpacity>
                </View>

            </View >
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
    }

});
