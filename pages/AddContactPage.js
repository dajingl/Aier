/**
 * Created by wangk on 17-4-22.
 */

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TextInput
} from 'react-native';
// import ContactInformation from '../Components/ContactInformation';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import FamilyContactPage from './FamilyContactPage';
import {rootURL} from '../Components/RootURL';

 class ContactInformation extends React.Component {
     render() {
         return (
             <View style={styles.row}>
                 <Text style={styles.text}>{this.props.name}</Text>
                 <TextInput underlineColorAndroid="transparent" placeholder={this.props.placeholder}
                            onChangeText={this.props.onChangeText} placeholderTextColor="#aaaaaa" style={styles.input}/>
             </View>
         );
     }
 }

export default class AddContactPage extends React.Component {
    static navigationOptions = {
        title: '添加联系人',
    };
    constructor(){
        super()
        this.state={
            bodyObj:{name:'',identity_card:'',phone:'',address:'',gender:''},
        }
    }
    _onSelect(index, value){
        alert(index+'---'+value)
        this.state.bodyObj.gender=value;
        this.setState({
            bodyObj:this.state.bodyObj
        })
    }
    _saveButtonClick() {
        console.log(this.state.bodyObj)
        let URL="/api/patient/add.json"
        fetch(rootURL+URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:'name='+this.state.bodyObj.name+'&identity_card='+this.state.bodyObj.identity_card+
            '&phone='+this.state.bodyObj.phone+'&address='+this.state.bodyObj.address
            +'&gender='+this.state.bodyObj.gender
            +'&token='+token
            +'&normal_user_id='+userId
        }).then((response) => {
            return response.json()
        }).then((responseJson) => {
            console.log(responseJson)
            if(responseJson.success){
                alert('添加成功')
                this.props.navigation.navigate('FamilyContactPage');
            }else{
                alert(responseJson.error.message)
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    _onChangeText(text,value){
        this.state.bodyObj[value]=text;
        this.setState({
            bodyObj:this.state.bodyObj
        })
    }
    render() {
        return (
            <View style={styles.content}>
                <ContactInformation onChangeText={(text)=>this._onChangeText(text,'name')} name="姓名" placeholder="请输入联系人姓名"/>
                <ContactInformation onChangeText={(text)=>this._onChangeText(text,'identity_card')} name="身份证" placeholder="请输入身份证号"/>
                <View style={styles.row}>
                    <Text style={styles.text}>性别</Text>
                    <RadioGroup onSelect={(index, value) => this._onSelect(index, value)}
                                style={styles.radio}>
                        <RadioButton value={'1'}>
                            <Text>男</Text>
                        </RadioButton>
                        <RadioButton value={'2'}>
                            <Text>女</Text>
                        </RadioButton>
                    </RadioGroup>
                    {/*<Text style={styles.text}></Text>*/}
                </View>
                <ContactInformation onChangeText={(text)=>this._onChangeText(text,'phone')} name="联系电话" placeholder="请输入联系电话"/>
                <ContactInformation onChangeText={(text)=>this._onChangeText(text,'address')} name="地址" placeholder="请输入地址"/>
                <View style={styles.border}>
                     <Text>温馨提示</Text>
                     <Text>请您正确填写联系人信息，以便为您带来更优质的服务！</Text>
                 </View>
                <View style={styles.but}>
                    <Button title="保存" onPress={this._saveButtonClick.bind(this)}/>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    row: {
        flexDirection: 'row',
        alignItems:'center',
        paddingLeft: 16,
        marginTop:2,
        backgroundColor:'#ffffff'
    },
    text: {
        flex: 1,
        alignItems:'flex-start',
        fontSize: 14,
        color: '#444444'
    },
    input: {
        flex: 3,
    },
    radio:{
        flex: 3,
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    border:{
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#dddddd',
        paddingVertical: 8,
        paddingHorizontal: 11,
        backgroundColor:'#ffffff'
    },
    but: {
        paddingVertical: 8,
        paddingHorizontal:20,
        backgroundColor:'#ffffff'
    }
});





