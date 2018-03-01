/**
 * Created by wangk on 17-4-27.
 */

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    Image,
    TouchableOpacity
} from 'react-native';
import MyDiseaseProcess from '../Components/MyDiseaseProcess';
import {rootURL} from '../Components/RootURL';
export default class PaymentPage extends React.Component {
    static navigationOptions = {
        title: '支付',
    };
    constructor(){
        super()
        this.state={
            selectPay:0,
        }
    }
    _saveButtonClick() {
        const {params} = this.props.navigation.state;
            let URL="/api/appointment_order/pay.json"
            fetch(rootURL+URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body:'token='+token+'&order_id='+params.data.id+'&pay_type='+this.state.selectPay
            }).then((response) => {
                return response.json()
            }).then((responseJson) => {
                console.log(responseJson)
                if(responseJson.success){
                    alert('支付成功')
                }else{
                    alert(responseJson.error.message)
                }
                this.props.navigation.navigate('FootNavigation');
            }).catch((error) => {
                console.error(error);
            });
    }
    _selectPay(index){
        this.setState({
            selectPay: index,
        });
    }
    render() {
        const {params} = this.props.navigation.state;
        // let time_type=(params.data.time_type==1?'普通':(params.data.time_type==2?'加急':'实时'))
        return (
            <View style={styles.page}>
                <MyDiseaseProcess titleOne='病情描述' sourceOne={false}
                                  titleTwo='支付' sourceTwo={true}
                                  titleThree='平台确认' sourceThree={false}
                                  titleFour='医院就诊' sourceFour={false}/>
                <View style={styles.rowTitle}>
                    <View style={styles.left}>
                        <Text style={styles.fontText}>{params.data.doctor_name}--
                            {params.data.doctor_department}
                            {((params.data.time_type=='1')?'普通':(params.data.time_type=='2'?'加急':'实时'))}
                        </Text>
                    </View>
                    <View style={styles.right}>
                        <Text style={styles.fontColor}>{params.data.price}元</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text>预约时间:</Text>
                    <Text style={styles.appointmentTime}>{params.data.appointment_time}</Text>
                </View>
                <View style={styles.row}>
                    <Text>就诊地址:</Text>
                    <Text style={styles.appointmentTime}>{params.data.appointment_address}</Text>
                </View>
                <View style={styles.row}>
                    <Text>病情描述:</Text>
                    <Text style={styles.appointmentTime}>{params.data.patient_condition}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.fontText}>请选择支付方式</Text>
                </View>
                <View style={[styles.payment,styles.center]}>
                    <TouchableOpacity style={[{flex:8},styles.center]} onPress={()=>this._selectPay(1)}>
                        <Image style={styles.img} source={require('../images/weixinzhifu.png')}/>
                        <View  style={styles.paymentMethod}>
                            <Text >微信支付</Text>
                            <Text >推荐安装微信5.0及以上版本用户使用</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={{flex:1}}>
                        {this.state.selectPay!=1?null:<Image style={{width:30, height:30}}  source={require('../images/agree.png')}/>}
                    </View>
                </View>
                <View style={[styles.payment,styles.center]}>
                    <TouchableOpacity  style={[{flex:8},styles.center]} onPress={()=>this._selectPay(2)}>
                    <Image style={styles.img} source={require('../images/zhifubao.png')}/>
                    <View style={styles.paymentMethod}>
                        <Text >支付宝支付</Text>
                        <Text >推荐安装支付宝客户端的用户使用</Text>
                    </View>
                    </TouchableOpacity>
                    <View style={{flex:1}}>
                        {this.state.selectPay!=2?null:<Image style={{width:30, height:30}}  source={require('../images/agree.png')}/>}
                    </View>
                </View>

                <View style={styles.btn}>
                    <Button title="确认支付" onPress={this._saveButtonClick.bind(this)}/>
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
    rowTitle: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ddd',
        paddingTop: 15,
        paddingBottom: 15
    },
    left: {
        flex: 3,
        paddingLeft: 15,
    },
    fontText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#444'
    },
    right: {
        flex: 0.5,
        justifyContent: 'flex-start'
    },
    fontColor: {
        fontSize: 12,
        color: 'red'
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ddd',
        padding: 13,
    },
    center:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
    },
    payment: {
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderColor: '#ddd',
        paddingLeft: 16,
        paddingTop: 13,
        paddingBottom: 13
    },
    img: {
        width: 40,
        height: 40
    },
    paymentMethod: {
        justifyContent: 'flex-start',
        marginLeft: 23,
    },
    btn: {
        marginLeft: 9,
        marginRight: 9,
        marginTop:28
    }


});





