/**
 * Created by zhangjie on 17-4-21.
 */
import React,{Component} from 'react';
import CheckBox from 'react-native-checkbox';
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
export default class Register extends Component {
    static navigationOptions = {
        title: '注 册',
    };
    constructor(){
        super()
        this.state={
            bodyObj:{phone:'',key:'',password:'',invite:'',isAgree:false},
        }
    }
    _onChangeText(text,value){
        this.state.bodyObj[value]=text;
        this.setState({
            bodyObj:this.state.bodyObj
        })
    }
    _getInfo(){
        if(this.state.bodyObj.isAgree){
            let URL="/api/normal_user/register.json"
            fetch(rootURL+URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:'username='+this.state.bodyObj.phone+'&sms_code='+this.state.bodyObj.key+'&password='+this.state.bodyObj.password+'&invitation_code='+this.state.bodyObj.invite
            }).then((response) => {
                return response.json()
            }).then((responseJson) => {
                console.log(responseJson)
                if(responseJson.success){
                    alert('注册成功')
                    this.props.navigation.navigate('LoginPage');
                }else{
                    alert(responseJson.error.message)
                }
            }).catch((error) => {
                console.error(error);
            });
        }else{
            alert('请选择是否同意协议');
            return
        }
    }
    _getKey(){
      let URL="/api/sms/send_register_code.json"
        alert(rootURL+URL)
        alert(this.state.bodyObj.phone)
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
    render() {
        return (
            <ScrollView style={styles.page}>
                <MyHeaderIcon source={require('../images/logo.png')}/>
                <View style={styles.content}>
                    <MyTextInput onChangeText={(text)=>this._onChangeText(text,'phone')} source={require('../images/user.png')} placeholder="请输入手机号"/>
                    <MyTextInput onChangeText={(text)=>this._onChangeText(text,'key')} source={require('../images/key.png')} placeholder="请输入验证码" value="获取验证码" onpress={this._getKey.bind(this)}/>
                    <MyTextInput onChangeText={(text)=>this._onChangeText(text,'password')} source={require('../images/password.png')} placeholder="请输入密码"/>
                    <MyTextInput onChangeText={(text)=>this._onChangeText(text,'invite')} source={require('../images/invite.png')} placeholder="请输入邀请码"/>
                    <View style={{marginHorizontal:25}}>
                        <CheckBox
                            label="同意"
                            checkboxStyle={{width:20,height:20}}
                            underlayColor="transparent"
                            onChange={(checked) => this._onChangeText(!checked,'isAgree')}
                        />
                    </View>
                    <MyButtonInput onPress={this._getInfo.bind(this)} title="注 册"/>
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