/**
 * Created by liuyang on 17-4-23.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    Button,
} from 'react-native';
import PersonalInformationComponent from '../Components/PersonalInformationComponent';
import {rootURL} from '../Components/RootURL';
export default class PersonalInformation extends React.Component {
    static navigationOptions = {
        title: '个人信息',
    };
    static defaultProps={
        Name:'小明',
        ID:1101983018,
        Sex :1,
        Address:'柬埔寨',
    };
    constructor(){
        super();
        this.state={
           obj: {
               //用户ID
               name: null,       //姓名
               gender: null,    //性别
               identity_card: null, // 身份证号
               address: null,     //地址
           }
        };
    }

    _onChange(key,text){
        this.state.obj[key]=text;
        this.setState({
            obj:this.state.obj      //用户ID
        });
        console.log(this.state)
    }

    _onSelect( value){
        this.state.obj.gender=value+1;
        this.setState({
            obj:this.state.obj
        })
        console.log(this.state.obj)
    }
    _reSetPersonalData() {
        let URL="/api/normal_user/update.json ";
        fetch(rootURL+URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:'id='+userId+'&token='+token+'&name='+this.state.obj.name+'&gender='+this.state.obj.gender+'&identity_card='+this.state.obj.identity_card
        }).then((response) => {
            return response.json()
        }).then((responseJson) => {
            console.log(responseJson);
            if (!responseJson.success) {
                alert(responseJson.error.message)
            } else {
                this.props.navigation.navigate('PersonalNew');
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        return (
            <View style={styles.page}>
                <View style={styles.wrap}>
                    <Text style={{ width:120,}}>姓名</Text>
                    <TextInput style={styles.Input} underlineColorAndroid="transparent"
                               onChangeText={(text) => this._onChange('name',text)}
                               placeholder="请输入姓名"
                    />
                </View>
                <View style={styles.wrap}>
                    <Text style={{ width:120,}}>身份证</Text>
                    <TextInput style={styles.Input} underlineColorAndroid="transparent"
                               onChangeText={(text) => this._onChange('state.identity_card',text)}
                               placeholder="请输入身份证号"
                    />
                </View>
                <View style={styles.wrap}>
                    <Text style={{ width:120}}>性别</Text>
                     <PersonalInformationComponent
                         onSelect={(value)=>this._onSelect(value)}
                     />
                </View>
                <View style={styles.wrap}>
                    <Text style={{ width:120,}}>地址</Text>
                    <TextInput style={styles.Input} underlineColorAndroid="transparent"
                               onChangeText={(text) => this._onChange('this.state.address',text)}
                               placeholder="请输入住址"
                    />
                </View>
                <View style={styles.promptBox}>
                    <Text style={styles.prompt1}>温馨提示</Text>
                    <Text style={styles.prompt2}>请你正确填写个人信息，以便为您带来更优质的服务!</Text>
                </View>
                <View style={styles.setBtnBox}>
                    <Button title='保存' onPress={this._reSetPersonalData.bind(this)}/>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    page:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: 'white',
    },
    wrap:{
        flexDirection:'row',
         justifyContent: 'flex-start',
        alignItems: 'center',
        height:48,
        borderColor:'#ddd',
        borderBottomWidth:1,
        paddingLeft:9,
    },
    Input:{
      borderWidth:0,
        flex:1,
    },
    promptBox:{
        margin:5,
        padding:5,
        borderWidth:1,
        borderColor:'#dddddd',
    },
    prompt1:{
        fontSize:12,
        marginBottom:10,
    },
    prompt2:{
        fontSize:12,
    },
    setBtnBox:{
        padding:9,
        paddingTop:15,
    }
});