// /**
//  * Created by zhangjie on 17-4-21.
//  */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    Image,
    Button,
    ScrollView
} from 'react-native';
import MyTextInput from '../Components/TextInput';
import MyButtonInput from '../Components/ButtonInput';
import MyHeaderIcon from '../Components/MyHeaderIcon';
import {rootURL} from '../Components/RootURL';

export default class Reset extends Component {
    static navigationOptions = {
        title: '重置密码',
    };
    constructor(){
        super()
        this.state={
            bodyObj:{phone:'',key:'',password:''},
        }
    }
    _getKey(){
        let URL="/api/sms/send_change_password_code.json"
        fetch(rootURL+URL+'?phone='+this.state.bodyObj.phone, {
            method: 'GET',
        }).then((response) => {
            return response.json()
        }).then((responseJson) => {
            console.log(responseJson)
            if(!responseJson.success){
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
    _onResetClick(){
        let URL="/api/normal_user/change_password.json"
        fetch(rootURL+URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:'username='+this.state.bodyObj.phone+'&password='+this.state.bodyObj.password+'&sms_code='+this.state.bodyObj.key
        }).then((response) => {
            return response.json()
        }).then((responseJson) => {
            console.log(responseJson)
            if(responseJson.success){
                alert('重置成功')
                this.props.navigation.navigate('LoginPage');
            }else{
                alert(responseJson.error.message)
            }
        }).catch((error) => {
            console.error(error);
        });
    }
    _onCancelClick(){
        this.props.navigation.navigate('LoginPage');
    }
    render() {
        return (
            <ScrollView style={styles.page}>
                <MyHeaderIcon source={require('../images/logo.png')}/>
                <View style={styles.content}>
                <MyTextInput onChangeText={(text)=>this._onChangeText(text,'phone')} source={require('../images/user.png')} placeholder="请输入手机号"/>
                <MyTextInput onChangeText={(text)=>this._onChangeText(text,'key')} source={require('../images/key.png')} placeholder="请输入验证码" value="获取验证码" onpress={this._getKey.bind(this)}/>
                <MyTextInput onChangeText={(text)=>this._onChangeText(text,'password')} source={require('../images/password.png')} placeholder="请输入密码"/>
                <MyButtonInput onPress={this._onResetClick.bind(this)} title="重 置"/>
                <MyButtonInput onPress={this._onCancelClick.bind(this)} title="取 消"/>
            </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    page:{
        marginTop:2,
        paddingTop:5,
        backgroundColor:'#ffffff'
    },
    content: {
        marginHorizontal:35
    },})

