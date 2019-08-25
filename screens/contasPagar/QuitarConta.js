import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Platform,
    TextInput,
    FlatList,
    Alert,
    TouchableOpacity,
    Modal,
    TouchableHighlight,
    ToastAndroid,
    Vibration,
    Linking,
    ScrollView
} from 'react-native';


import Icon from 'react-native-vector-icons/Ionicons';

export default class QuitarConta extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Quitar contas a Pagar",
        };
    };

    state = {
        categorias: [
            { key: '1', descricao: 'Item 1' },
            { key: '2', descricao: 'Item 2' },
            { key: '3', descricao: 'Item 3' },
            { key: '4', descricao: 'Item 4' },
            { key: '5', descricao: 'Item 5' },
            { key: '6', descricao: 'Item 6' },
            { key: '7', descricao: 'Item 7' },
            { key: '8', descricao: 'Item 8' },

        ],
        modalVisible: false,

        descricao: 'Conta de água, referente ao mes de fevereiro. com 2% de juros pelo atraso',
        formaPagamento: 'Á vista',
        valor: 'R$ 171,00',
        dataVencimento: '26/01/2019'

    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    clickBtn() {
        this.props.navigation.push('LancarConta')
    }

    compartilharWhatsApp() {

        var message = "Quitar contas a Pagar \n\n";

        message += "Descrição: \n";
        message += this.state.descricao + "\n\n";

        message += "Forma de Pagamento: ";
        message += this.state.formaPagamento + "\n\n";

        message += "Data de Vencimento: ";
        message += this.state.dataVencimento + "\n\n";

        message += "Valor: ";
        message += "R$ 171,00";

        Linking.openURL(`whatsapp://send?text=${message}`);
    }

    clickItem(key) {
        //Alert.alert(key);
        this.setModalVisible(true);
    }

    pagarConta() {

        ToastAndroid.showWithGravityAndOffset(
            'Conta paga com sucesso',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            50,
        );

        const DURATION = 10000;
        const PATTERN = [1000, 2000, 3000];

        //Vibration.vibrate(DURATION);
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.Label}>Pesquisar</Text>

                <TextInput style={styles.Input}
                    placeholder={"Descrição Ex.:"}
                    maxLength={10}
                    keyboardType={"default"}
                    underlineColorAndroid='transparent' />

                <FlatList
                    data={this.state.categorias}
                    extraData={this.state}
                    style={styles.List}

                    renderItem={
                        ({ item }) => {
                            return (
                                <TouchableOpacity style={styles.ItemContainer} onPress={() => this.clickItem(item.key)}>
                                    <View>
                                        <Text style={styles.ItemTextTitulo}> {'Descrição'}</Text>
                                        <Text style={[styles.ItemText, { color: 'black' }]}> {'Conta de água'}</Text>

                                        <View style={{ flexDirection: 'row' }}>
                                            <View style={{ width: "50%" }}>
                                                <Text style={styles.ItemTextTitulo}> {'Data de Vencimento'}</Text>
                                                <Text style={[styles.ItemText, { color: 'black' }]}> {'26/01/2019'}</Text>
                                            </View>


                                            <View style={{ width: "50%", alignItems: 'flex-end' }}>
                                                <Text style={styles.ItemTextTitulo}> {'Valor'}</Text>
                                                <Text style={[styles.ItemText, { color: 'black', fontSize: 20, fontWeight: 'bold' }]}> {'R$ 171,00'}</Text>
                                            </View>
                                        </View>

                                    </View>
                                </TouchableOpacity>
                            )
                        }
                    }
                />


                <TouchableOpacity style={styles.FloatingButton} onPress={() => this.clickBtn()}>

                </TouchableOpacity>




                <View style={{ marginTop: 22 }}>

                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            //Alert.alert('Modal has been closed.');
                        }}>

                        <View>
                            <ScrollView>

                                <View style={{ flex: 1, flexDirection: 'row', height: 60, backgroundColor: '#28a745', justifyContent: 'center', alignItems:'center' }}>



                                    <View style={{ flex: 8, paddingLeft: 15 }}>
                                        <Text style={{ fontSize: 23, color: 'white', fontWeight: 'bold' }}>Quitar contas a Pagar</Text>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity onPress={() => this.compartilharWhatsApp()}>
                                            <Icon
                                                name="md-share"
                                                size={30}
                                                color='white'

                                            />
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity onPress={() => { this.setModalVisible(!this.state.modalVisible); }}>
                                            <Icon
                                                name="md-close"
                                                size={30}
                                                color='white'

                                            />
                                        </TouchableOpacity>
                                    </View>

                                   

                                    
                                </View>


                                <View style={{ marginTop: 10, padding: 8, }}>

                                    <View>
                                        <Text style={{ fontSize: 16, color: 'black', marginTop: 15 }}>Descrição</Text>
                                        <Text style={{ fontSize: 18, color: 'gray' }}> {this.state.descricao} </Text>
                                    </View>

                                    <View>
                                        <Text style={{ fontSize: 16, color: 'black', marginTop: 15 }}>Forma de Pagamento</Text>
                                        <Text style={{ fontSize: 18, color: 'gray' }}> {this.state.formaPagamento}  </Text>
                                    </View>

                                    <View>
                                        <Text style={{ fontSize: 16, color: 'black', marginTop: 15 }}>Data de Vencimento</Text>
                                        <Text style={{ fontSize: 18, color: 'gray' }}> {this.state.dataVencimento}  </Text>
                                    </View>


                                    <View style={{ marginTop: 15, alignItems: 'flex-start', borderTopColor: 'gray', borderTopWidth: 2, paddingRight: 0 }}>
                                        <Text style={{ fontSize: 16, color: 'black' }}>Valor</Text>
                                        <Text style={{ fontSize: 25, color: 'gray', fontWeight: 'bold' }}> {this.state.valor}  </Text>
                                    </View>

                                </View>

                            </ScrollView>

                        </View>


                        <View style={styles.bottom}>

                       

                            <TouchableOpacity style={styles.Btn} onPress={() => this.pagarConta()}>
                                <Text style={styles.BtnText}> Realizar Pagamento </Text>
                            </TouchableOpacity>


                        </View>
                    </Modal>
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

        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        height: 50,

        //borderTopColor: 'black',
        borderTopWidth: 1,
        //backgroundColor: 'white',
    },

    BtnText: {
        color: 'black',
        fontSize: 15

    },

    ItemTextTitulo: {

        fontSize: 13,
        color: 'gray'
    },

    ItemText: {
        padding: 2,
        fontSize: 17,
        paddingTop: 0,
    },

    ItemContainer: {
        borderBottomColor: '#d1d1d1',
        borderBottomWidth: 1,
        marginBottom: 2
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

    FloatingButtonIcons: {
        elevation: 10
    },

    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },

    navigationFilename: {
        marginTop: 5,
    },

    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },

    bottom: {
        flex: 1,
        justifyContent: 'flex-end',
    }

});
