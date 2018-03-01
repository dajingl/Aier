/**
 * Created by liuyang on 17-4-23.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Button,
    ScrollView
} from 'react-native';
import {rootURL} from '../Components/RootURL';
export default class PersonalNew extends React.Component {
    static navigationOptions = {
        title: '个人中新',
    };

    static defaultProps={
          name:'请编辑姓名',
          username:110,
    };
    constructor(){
        super();
        this.state={
            obj:{},
        }
    }

    //-----------获取个人资料

    _PersonalData() {
        let URL="/api/normal_user/show.json";
        fetch(rootURL+URL+'?token='+token+'&normal_user_id='+userId,{
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).then((responseJson) => {
            console.log(responseJson.result)
            this.setState({
                obj: responseJson.result
            })
            console.log(this.props)
        }).catch((error) => {
            console.error(error);
        });
    }
    componentDidMount(){
        this._PersonalData();
    }
    _PersonalInformationClick() { //个人信息  PersonalInformation

        console.log(this.props)
        this.props.navigation.navigate('PersonalInformation');
    }
    _ResetClick(){ //修改密码
        this.props.navigation.navigate('Reset');
    }
    _MyAppointmentClick() { //我的预约
         this.props.navigation.navigate('MyAppointment',{...this.props});
    }
    _FamilyContactClick(){ //家庭联系人
    this.props.navigation.navigate('FamilyContactPage');
    }
    render() {
        return (
            <View style={styles.page}>
                    <View style={styles.pageback}>
                        <View>
                        <Text style={styles.user}>{this.state.obj.name?this.state.obj.name:this.props.name}</Text>
                         </View>
                        <View style={styles.isItem}>
                            <Image style={styles.icon} source={require('../images/icon_phone.png')}/>
                            <Text style={styles.isData}>{this.state.obj.username?this.state.obj.username:this.props.username}</Text>
                        </View>
                    </View>

                    <View style={styles.pageback}>
                        <View style={styles.isItem}>
                            <Image style={styles.icon} source={require('../images/icon_edit.png')}/>
                            <Text style={styles.isData}
                                  onPress={this._PersonalInformationClick.bind(this)}
                            >编辑个人信息</Text>
                        </View>
                        <View style={styles.isItem}>
                            <Image style={styles.icon} source={require('../images/icon_password_red.png')}/>
                            <Text style={styles.isData}
                                  onPress={this._ResetClick.bind(this)}
                            >修改密码</Text>
                        </View>
                    </View>

                    <View style={styles.pageback}>
                        <View style={styles.isItem}>
                            <Image style={styles.icon} source={require('../images/icon_appointment.png')}/>
                            <Text style={styles.isData}
                                  onPress={this._MyAppointmentClick.bind(this)}
                            >我的预约</Text>
                        </View>
                        <View style={styles.isItem}>
                            <Image style={styles.icon} source={require('../images/icon_people.png')}/>
                            <Text style={styles.isData}
                                  onPress={this._FamilyContactClick.bind(this)}
                            >家庭联系人</Text>
                        </View>
                    </View>

                    <View style={styles.pageback}>
                        <View style={styles.isItem}>
                            <Image style={styles.icon} source={require('../images/icon_people.png')}/>
                            <Text style={styles.isData}
                                  onPress={this._MyAppointmentClick.bind(this)}
                            >意见反馈</Text>
                        </View>
                        <View style={styles.isItem}>
                            <Image style={styles.icon} source={require('../images/icon_info.png')}/>
                            <Text style={styles.isData}
                                  onPress={this._MyAppointmentClick.bind(this)}
                            >关于</Text>
                        </View>
                    </View>
                <Text style={styles.Exitlogin}>退出登录</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    page:{
        backgroundColor: '#f8f8f8',
        flex: 1,
        justifyContent:'space-between',
    },
    pageback:{
        flex: 1,
        flexDirection:'column',   //  默认column  纵向排列
        justifyContent: 'flex-start',  //  子元素沿主轴排列方式
        alignItems: 'flex-start',
        padding: 9,
            backgroundColor: 'white',
         margin:2,
    },
    user:{
        fontSize: 18,
    },
    isItem:{
        flex: 1,
        flexDirection:'row', //  默认column  纵向排列
        // justifyContent: 'flex-start',  //  子元素沿主轴排列方式
        alignItems: 'center'
    },
    icon:{
        width:20,
        resizeMode :'contain',
    },
    isContainer:{
        flex: 1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems: 'center',
    },
    isIcon:{
        width:40,
    },
    isData:{
        padding:9,
    },
    Exitlogin:{
        margin:10,
        textAlign:'center',
        backgroundColor: 'white',
        padding:10,
    }
});
