import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    CheckBox
} from 'react-native';

export default class CriarConta extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Criar Conta",

        };
    };

    state = {
        cbSituacao: true,
    }

    async componentDidMount() {
        this.props.navigation.setParams({ getContatos: this.getContatos });
    }

    async showFirstContactAsync() {
        // Ask for permission to query contacts.

        /*
        const permission = await Permissions.askAsync(Permissions.CONTACTS);

        if (permission.status !== 'granted') {
            // Permission was denied...
            alert('Permissão Negada');
            return;
        }

        const contacts = await Contacts.getContactsAsync({
            fields: [
                Contacts.PHONE_NUMBERS,
                Contacts.EMAILS,
            ],
            pageSize: 10,
            pageOffset: 0,
        });

        alert(contacts.total);
        alert(contacts.lenght);
        alert(contacts.count);

       
            Alert.alert(
                'Your first contact is...',
                `Name: ${contacts.data[0].name}\n` +
                `Phone numbers: ${contacts.data[0].phoneNumbers[0].number}\n` +
                `Emails: ${contacts.data[0].emails[0].email}`
            );
        */
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

    render() {
        return (

            <View style={{ flex: 1 }}>
                <View style={styles.container}>


                    {this.renderEntradaTexto('Nome', 'Nome', 'default', 100)}
                    {this.renderEntradaTexto('Celular', 'Celular ou Telefone', 'default', 15)}
                    {this.renderEntradaTexto('Empresa', 'Nome Fantasia', 'default', 15)}

                    <Text style={styles.Label}>Acesso</Text>
                    {this.renderEntradaTexto('Email', 'Nome@example.com.br', 'default', 100)}

                    {this.renderEntradaTexto('Senha', '••••••••', 'default', 15)}
                    {this.renderEntradaTexto('Confirmar senha', '••••••••', 'default', 15)}

                    <View style={styles.containerCb}>
                        <CheckBox
                            value={this.state.cbSituacao}
                            onValueChange={() => this.setState({ cbSituacao: !this.state.cbSituacao })}
                        />

                        <Text style={styles.Label}> Aceito os termos de uso </Text>
                    </View>

                </View>


                <View style={styles.bottom}>
                    <TouchableOpacity style={[styles.btn, { height: 40 }]}
                        onPress={() => this.btnSalvar()}>
                        <Text>Criar Conta</Text>
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
