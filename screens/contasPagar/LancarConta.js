import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Picker,
    DatePickerAndroid,
    TimePickerAndroid,
    ScrollView,
    Keyboard
} from 'react-native';


export default class LancarConta extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Lançar contas a Pagar",
        };
    };

    state = {
        descricao: "",
        cbForma: "V",
        nroParcela: 0,
        parcelas: null,
        dataVencimento: "",
        valor: 0
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

    getFormatterDate(day, month, year) {
        return (
            day.toString().padStart(2, '0') +
            '/' + (month + 1).toString().padStart(2, '0') +
            '/' + year);
    }

    async openAndroidDatePicker(index) {

        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date()
            });

            if (action == DatePickerAndroid.dateSetAction) {
                var dataFormat = getFormatterDate(day, month, year);

                if (this.state.cbForma == "P") {
                    var listParcelas = this.state.parcelas;
                    listParcelas[index].dataVencimento = dataFormat;
                    this.setState({ parcelas: listParcelas });
                }
                else {
                    this.setState({ dataVencimento: dataFormat });
                }

                Keyboard.dismiss();
            }
            else
                console.log('Cancel');


        } catch ({ code, message }) {
            console.warn('Cannot open date picker', message);
        }
    }

    btnSalvar() {

    }

    changeData(index) {
        this.openAndroidDatePicker(index);
    }

    alteraValorParcelas(index, valor) {
        var listParcelas = this.state.parcelas;
        listParcelas[index].valor = valor;
        this.setState({ parcelas: listParcelas });
    }

    renderParcelas() {
        if (this.state.cbForma == "P" && this.state.nroParcela > 0)
            return (
                <View>
                    {
                        this.state.parcelas.map((item, index) => (
                            <View key={item.numero} style={{ marginTop: 5, marginBottom: 20 }}>
                                <Text style={styles.Label}>Parcela: {item.numero}</Text>

                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ width: "50%" }}>
                                        <Text style={styles.Label}>{"Valor da Conta"}</Text>

                                        <TextInput style={styles.Input}
                                            placeholder='R$ 0,00'
                                            maxLength={12}
                                            onChangeText={(text) => this.alteraValorParcelas(index, text)}
                                            keyboardType='numeric'
                                            underlineColorAndroid='transparent' />
                                    </View>

                                    <View style={{ width: "45%", marginLeft: "5%" }}>
                                        <Text style={styles.Label}>{"Data de Vencimento"}</Text>


                                        <TouchableOpacity style={styles.Input} onPress={() => this.changeData(index)}>
                                            <Text>{item.dataVencimento}</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>


                            </View>
                        ))
                    }
                </View>
            )
    }

    renderFormaPagamento() {
        //{this.renderEntradaTexto('Valor da Conta', 'R$ 0,00', 'numeric', 7)}

        if (this.state.cbForma == "V")
            return (
                <View>

                    <View>
                        <Text style={styles.Label}>{"Valor da Conta"}</Text>

                        <TextInput style={styles.Input}
                            placeholder='R$ 0,00'
                            maxLength={12}
                            onChangeText={(text) => this.setState({ valor: text })}

                            keyboardType='numeric'
                            underlineColorAndroid='transparent' />
                    </View>


                    <View>



                        <Text style={styles.Label}>{"Data de Vencimento"}</Text>

                        <TouchableOpacity style={styles.Input} onPress={() => this.changeData(0)}>
                            <Text>{this.state.dataVencimento}</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            )
        else
            return (
                <View>
                    <Text style={styles.Label}>{"Quantidade de Parcelas"}</Text>

                    <View style={{ flexDirection: 'row', flex: 1 }}>

                        <TextInput style={[styles.Input, { width: "100%" }]}
                            maxLength={2}
                            keyboardType='numeric'
                            onChangeText={(text) => this.gerarParcelas(text)}
                            underlineColorAndroid='transparent' />

                    </View>

                </View>
            )
    }

    gerarParcelas(nroParcelas) {

        var listParcelas = new Array;
        for (var i = 0; i < nroParcelas; i++)
            listParcelas.push({ numero: (i + 1), valor: 0, dataVencimento: "" });

        this.setState({ parcelas: listParcelas, nroParcela: nroParcelas });
    }


    formatReal(int) {
        var tmp = int + '';
        tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
        if (tmp.length > 6)
            tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

        return tmp;
    }


    renderTotal() {

        var ValorTotal = 0;

        if (this.state.cbForma == "V")
            ValorTotal = this.state.valor;
        else
            if (this.state.parcelas != null)
                for (var i = 0; i < this.state.parcelas.length; i++)
                    ValorTotal += parseFloat(this.state.parcelas[i].valor);

        return (
            <View style={styles.containerTotal} >
                <Text style={styles.LabelTotal}>R$ {this.formatReal(ValorTotal)}</Text>
            </View>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.container}>

                        {this.renderEntradaTexto('Descrição', 'Onde, como ou porque', 'default', 100)}

                        <View>
                            <Text style={styles.Label}>{"Forma de Pagamento"}</Text>
                            <View style={{ borderColor: 'silver', borderWidth: 1 }}>
                                <Picker
                                    selectedValue={this.state.cbForma}
                                    style={{ height: 40, width: "100%" }}
                                    onValueChange={(itemValue, itemIndex) => this.setState({ cbForma: itemValue })}>
                                    <Picker.Item label="A vista" value="V" />
                                    <Picker.Item label="A prazo" value="P" />
                                </Picker>
                            </View>
                        </View>

                        {this.renderFormaPagamento()}

                        {this.renderParcelas()}

                        {this.renderTotal()}

                    </View>
                </ScrollView>

                <View style={styles.bottom}>
                    <TouchableOpacity style={[styles.btn, { height: 50 }]}
                        onPress={() => this.btnSalvar()}>
                        <Text>Realizar Lançamento</Text>
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

    containerTotal: {
        flex: 1,
        alignItems: 'flex-end'
    },

    Label: {
        fontSize: 16,
        marginBottom: 2,
        color: 'black'
    },

    LabelTotal: {
        fontSize: 30,
        marginBottom: 2,
        color: 'black'
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

    containerCb: {
        flexDirection: 'row',
        marginTop: 15
    },

    btn: {
        //marginTop: 50,
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

    btnDate: {

    }

});
