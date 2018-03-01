/**
 * Created by LiuQiang on 2017/4/24.
 */
import  React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    Button,
    Image,
    ListView,
    TouchableOpacity,
    ScrollView
} from 'react-native';

import Banner from '../Components/Banner';
import GrayBg from '../Components/grayBg';

import {rootURL} from '../Components/RootURL';

export  default  class Clinic extends React.Component {
    static navigationOptions = {
        title: '爱尔诊所'
    };
    constructor() {
        super();
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            data:'',
        }
    }
    _abc(specialityId){
        global.speciality_id=specialityId
        this.props.navigation.navigate('ZhenShi');
    }
    _ShowMap(){
        this.props.navigation.navigate('BaiduMap',{
            ...this.state.data
        });
    }
    componentDidMount() {
        this._refreshDataArClinic(hospital_id,token);
    }
    _refreshDataArClinic(hospital_id,token) {
        let URL="/api/hospital/show.json"
        fetch(rootURL+URL+'?token='+token+'&hospital_id='+hospital_id,
            {
             method: 'GET',
            }
        ).then((response) => {
            return response.json()
        }).then((responseJson) => {
            console.log(responseJson.result);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseJson.result.specialities),
                data:responseJson.result
            });
        }).catch((error) => {
            console.error(error);
        });
    }
    _onRowPress(rowID) {
        console.log('_onRowPress ' + rowID);
        const navigate = this.props.navigation.navigate;
        navigate('ZhenShi');
    }
    _renderRowClinic(rowData, sectionID, rowID) {
        console.log(rowData);
        return (
            <TouchableOpacity onPress={()=>{
                this._onRowPress(rowID);
            }}>
            <View style={styles.Clinic}>
                <TouchableOpacity onPress={()=>this._abc(rowData.id)}>
                    <View style={{flexDirection: 'column',flex:11}}>
                        <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
                            <View>
                                <Text style={{fontSize:16,fontWeight:'bold'}}>{rowData.name}</Text>
                            </View>
                            <View>
                                <Text style={{paddingLeft:10,fontSize:12}}>{rowData.doctor_count}位三甲医生</Text>
                            </View>
                        </View>
                        <View style={{paddingTop:10}}>
                            <Text style={{fontSize:14}}>{rowData.description}</Text>
                            <Text style={{fontSize:12}}>{rowData.description}</Text>
                        </View>
                    </View>
                    <View style={styles.more}>
                        <Image source={require('../images/icon_common_rightarrow.png') }
                               style={{height: 25,width:25}}/>
                    </View>
                   </TouchableOpacity>
                </View>
             </TouchableOpacity>
        )
    }
    render() {
         console.log(this.state.data);
        return (
            <ScrollView>
                <View style={styles.page}>

                    <Banner url={require('../images/slide1.jpg')}/>

                    <View style={styles.ClinicContent}>
                        <View>
                            <Text style={styles.ClinicName}>{this.state.data.name}</Text>
                        </View>
                        <View style={styles.iconText}>
                            <View style={styles.Text}>
                                <Image source={require('../images/right.png') } style={{height: 20,width:20}}/>
                                <Text style={styles.TextContent}>三甲名医出诊</Text>
                            </View>

                            <View style={styles.Text}>
                                <Image source={require('../images/right.png') } style={{height: 20,width:20}}/>
                                <Text style={styles.TextContent}>无过度医疗</Text>
                            </View>
                        </View>

                        <View style={styles.address}>

                            <View style={styles.addressLeft}>
                                <Image source={require('../images/icon_address.png') } style={{height: 25,width:25}}/>
                                <Text onPress={this._ShowMap.bind(this)} style={styles.ClinicLocal}> {this.state.data.address}</Text>
                            </View>

                            <View>
                                <Image source={require('../images/icon_common_rightarrow.png') }
                                       style={{height: 25,width:25}}/>
                            </View>
                        </View>

                        <View style={styles.address}>
                            <View style={styles.addressLeft}>
                                <Image source={require('../images/icon_phone.png') } style={{height: 25,width:25}}/>
                                <Text style={styles.ClinicLocal}>{this.state.data.phone}</Text>
                            </View>

                            <View>
                                <Image source={require('../images/icon_common_rightarrow.png') }
                                       style={{height: 25,width:25}}/>
                            </View>
                        </View>

                    </View>
                    <GrayBg/>

                    <View style={styles.DepartmentSelection}>
                        <Text style={styles.Department}>科室</Text>
                        <TextInput underlineColorAndroid='transparent' placeholderTextColor='#60bdf8'
                                   placeholder="点击科室选择医生进行" style={styles.input}/>
                    </View>

                    <ListView dataSource={this.state.dataSource}
                              renderRow={this._renderRowClinic.bind(this)}/>
                    <GrayBg/>
                    <View style={styles.DepartmentSelection}>
                        <Text style={styles.Department}>诊所介绍</Text>
                    </View>
                    <View>
                        <Text style={styles.introduce}>
                            {this.state.data.description}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({

    page: {
        flexDirection: 'column',
        backgroundColor: "#ffffff"
    },
    ClinicName: {
        fontSize: 16,


        fontWeight: 'bold'
    },
    ClinicContent: {
        padding: 10
    },
    iconText: {
        flexDirection: 'row',
    },
    Text: {
        flexDirection: 'row',
        padding: 5,

    },
    TextContent: {
        paddingLeft: 10,
        fontSize: 14
    },
    address: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingTop: 10

    },
    addressLeft: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingTop: 5
    },
    ClinicLocal: {
        fontSize: 16,
        color: '#898989',
        paddingLeft: 10
    },
    DepartmentSelection: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        padding: 5,
        borderBottomWidth: 1,
        borderColor: '#dddddd'

    },
    Department: {
        flex: 1,
        height: 35,
        fontSize: 16
    },
    input: {
        height: 44,
        flex: 7,
        paddingLeft: 2,
        fontSize: 12
    },
    Clinic: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
        borderWidth:1,
        borderColor:'#dddddd'
    },
    more: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    introduce: {
        padding: 10,
        fontSize: 14
    }
})