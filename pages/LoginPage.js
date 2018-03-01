/**
 * http://www.bigbug.tech
 * Created by 陈冬明 on 20/04/2017.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';
import MyTextInput from '../Components/TextInput';
import MyButtonInput from '../Components/ButtonInput';
import MyHeaderIcon from '../Components/MyHeaderIcon';
import MyLogoBg from '../Components/MyLogoBg';
import {rootURL} from '../Components/RootURL';

export default class LoginPage extends Component {
    static navigationOptions = {
        headerTitle:null,
        headerStyle:{backgroundColor:'#ffffff'}
    };
    constructor(){
        super()
        this.state={
            bodyObj:{phone:'',password:''},
        }
    }
    _onChangeText(text,value){
        this.state.bodyObj[value]=text;
        this.setState({
            bodyObj:this.state.bodyObj
        })
    }
    _onLoginClick() {
        console.log('12')
        let URL="/api/normal_user/authenticate.json"
        if(this.state.bodyObj.phone){
            fetch(rootURL+URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:'username='+this.state.bodyObj.phone+'&password='+this.state.bodyObj.password
            }).then((response) => {
                console.log(rootURL+URL+'?'+body)
                return response.json()
            }).then((responseJson) => {
                console.log(responseJson)
                if (!responseJson.success) {
                    alert(responseJson.error.message)
                } else {
                    global.token=responseJson.result.token;
                    global.userId=responseJson.result.id;
                    console.log(token)
                    console.log(userId)
                    this.props.navigation.navigate('FootNavigation');
                }
            }).catch((error) => {
                console.error(error);
            });
        }
        else{
            alert('请输入手机号');
        }
    }
    _onRegisterClick(){
        this.props.navigation.navigate('Register');
    }
    _onResetClick(){
        this.props.navigation.navigate('Reset');
    }
    render() {
        return (
            <View style={styles.page}>
                <MyHeaderIcon source={require('../images/logo.png')}/>
                <View  style={styles.content}>
                    <MyTextInput onChangeText={(text)=>this._onChangeText(text,'phone')} source={require('../images/user.png')} placeholder="请输入手机号"/>
                    <MyTextInput onChangeText={(text)=>this._onChangeText(text,'password')} source={require('../images/password.png')} placeholder="请输入密码"/>
                    <MyButtonInput title="登录" onPress={this._onLoginClick.bind(this)}/>
                    <View  style={styles.buttonView}>
                        <TouchableHighlight onPress={this._onResetClick.bind(this)}>
                            <Text>忘记密码</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={this._onRegisterClick.bind(this)}>
                            <Text>注册</Text>
                        </TouchableHighlight>
                    </View>
                </View>
                <View  style={styles.foot}>
                    <MyLogoBg source={require('../images/login_bg.png')} style={styles.foot}/>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    page:{
        flex:1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor:'#ffffff'
    },
    content: {
        marginHorizontal:35
    },
    buttonView:{
        marginHorizontal:10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    foot:{
        height:135,
    }
});