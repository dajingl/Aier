/**
 * Created by wangk on 17-4-22.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    Button
} from 'react-native';

import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import {rootURL} from '../Components/RootURL';

export default class ModifyContactPage extends React.Component {
    static navigationOptions = {
        title: '修改联系人',
    };
    // 默认值
    constructor() {
        super();
        this.state = {
            bodyObj: {
                name: '',
                identity_card: '',
                gender: '',
                phone: '',
                address: ''
            }
        };
        // console.log(token);
    };
    // 修改
    _onChangeText(text, value) {
        this.state.bodyObj[value] = text;
        this.setState({
            bodyObj: this.state.bodyObj
        })
    };
    componentWillMount() {
        const {params}=this.props.navigation.state;
        this.state.bodyObj.name = params.rowData.name;
        this.state.bodyObj.identity_card = params.rowData.identity_card;
        this.state.bodyObj.gender = params.rowData.gender;
        this.state.bodyObj.phone = params.rowData.phone;
        this.state.bodyObj.address = params.rowData.address;
        this.setState({
            bodyObj:this.state.bodyObj
        })
    }
    // 性别选择   男1    女2
    _onSelect(index, value){
        // alert(index+'---'+value);
        this.state.bodyObj.gender=value;
        this.setState({
            bodyObj:this.state.bodyObj
        })
    }

    // 保存
    _saveContactButtonClick() {
        console.log(this.state.bodyObj)
        const {params}=this.props.navigation.state;
        let URL="/api/patient/update.json";
        fetch(rootURL+URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:'token='+token+'&name='
            +this.state.bodyObj.name+'&identity_card='
            +this.state.bodyObj.identity_card +'&gender='
            +this.state.bodyObj.gender+'&phone='
            +this.state.bodyObj.phone+'&address='
            +this.state.bodyObj.address
            +'&id='+params.rowData.id
        }).then((response) => {
            return response.json()
        }).then((responseJson) => {
            console.log(responseJson);
            if(responseJson.success){
                alert('修改成功');
                this.props.navigation.navigate('FamilyContactPage');
            }else{
                alert(responseJson.error.message)
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    // 删除
    _removeContactButtonClick() {
        const {params}=this.props.navigation.state;
        let URL="/api/patient/remove.json ";
        fetch(rootURL+URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:'token='+token+'&patient_id='+params.rowData.id

        }).then((response) => {
            console.log(response);
            return response.json()

        }).then((responseJson) => {
            console.log(responseJson);
            if(responseJson.success){
                alert('删除成功');
                this.props.navigation.navigate('FamilyContactPage');
            }else{
                alert(responseJson.error.message)
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    render() {
        // const {params} = this.props.navigation.state;
        return (
            <View style={styles.page}>
                <View style={styles.row}>
                    <Text style={styles.text}>姓名</Text>
                    <TextInput onChangeText={(text)=>this._onChangeText(text, 'name')}
                               defaultValue={this.state.bodyObj.name} style={styles.input}/>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>身份证</Text>
                    <TextInput onChangeText={(text)=>this._onChangeText(text, 'identity_card')}
                               defaultValue={this.state.bodyObj.identity_card} style={styles.input}/>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>性别</Text>
                    <RadioGroup selectedIndex={this.state.bodyObj.gender-1}
                                onSelect={(index, value) => this._onSelect(index, value)}
                                style={styles.radio}>
                        <RadioButton value={'1'}>
                            <Text>男</Text>
                        </RadioButton>
                        <RadioButton value={'2'}>
                            <Text>女</Text>
                        </RadioButton>
                    </RadioGroup>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>联系电话</Text>
                    <TextInput onChangeText={(text)=>this._onChangeText(text, 'phone')}
                               defaultValue={this.state.bodyObj.phone} style={styles.input}/>
                </View>
                <View style={styles.row}>
                    <Text style={styles.text}>地址</Text>
                    <TextInput onChangeText={(text)=>this._onChangeText(text, 'address')}
                               defaultValue={this.state.bodyObj.address} style={styles.input}/>
                </View>
                <View style={styles.border}>
                    <Text>温馨提示</Text>
                    <Text>请您正确填写联系人信息，以便为您带来更优质的服务！</Text>
                </View>
                <View style={styles.btn}>
                    <Button title="保存" onPress={this._saveContactButtonClick.bind(this)}/>
                </View>
                <View style={styles.btn}>
                    <Button title="删除" onPress={this._removeContactButtonClick.bind(this)}/>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#fff'
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#dddddd',
        alignItems: 'center',
        paddingLeft: 16
    },
    text: {
        flex: 1,
        fontSize: 14,
        color: '#444444',
        alignItems: 'flex-start',
    },
    input: {
        flex: 3,
        height: 44,
    },
    radio: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    border: {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#dddddd',
        paddingTop: 11,
        paddingLeft: 4.5,
        paddingBottom: 11,
        marginTop: 4.5,
        marginLeft: 4.5,
        marginRight: 4.5,
        marginBottom: 15
    },
    btn: {
        marginLeft: 9,
        marginRight: 9,
        paddingBottom: 10
    },
});