/**
 * Created by zhangjie on 17-4-24.
 */

// import React, {Component} from 'react';
// import {
//     StyleSheet,
//     View,
//     Text,
//     ListView,
//     Image,
//     RefreshControl,
//     ActivityIndicator,
//     TouchableOpacity,
//     ScrollView,
// } from 'react-native';
// import MyDocuterInfo from '../Components/MyDocuterInfo';
// import MyDocuterSelect from '../Components/MyDocuterSelect';
// import MyDocuterDate from '../Components/MyDocuterDate';
// import MyDocuterTime from '../Components/MyDocuterTime';
// import MyDocuterMoney from '../Components/MyDocuterMoney';
// import {rootURL} from '../Components/RootURL';
// export default class DocuterInfo extends Component {
//     static navigationOptions = {
//         title: '医生详情',
//     };
//     constructor() {
//         super();
//         let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//         this.state = {
//             docutinfoData: {},
//         }
//     }
//     _onSubmit(date,time){
//         alert(date+'--'+time)
//         // this.props.navigation.navigate('DiseaseDescription',{date:date,time:time});
//     }
//     componentWillMount() {
//         const {params} = this.props.navigation.state;//token;doctorId
//         this._getDocutinfoData(params.token,params.doctorId);
//     }
//     _getDocutinfoData(token,doctorId) {
//         let URL="/api/doctor/show.json"
//         fetch(rootURL+URL+'?token='+token+'&doctor_id='+doctorId, {
//             method: 'GET'
//         }).then((response) => {
//             return response.json()
//         }).then((responseJson) => {
//             console.log(responseJson.result);
//             this.setState({
//                 docutinfoData: responseJson.result,
//             });
//         }).catch((error) => {
//             console.error(error);
//         });
//     }
//     render() {
//         const {params} = this.props.navigation.state;//token;doctorId
//         return (
//             <ScrollView showsVerticalScrollIndicator={true}>
//                 <MyDocuterInfo source={{uri: this.state.docutinfoData.head_url}}
//                                name={this.state.docutinfoData.name} job_title={this.state.docutinfoData.hospital_name}
//                                introducation={this.state.docutinfoData.hospital_department_name}/>
//                 <MyDocuterSelect selectOne="预约" contentOne={this.state.docutinfoData.big_hospital_name} selectTwo="资料" contentTwo={this.state.docutinfoData.introducation}/>
//                 {/*<MyDocuterDate/>*/}
//                 {(this.state.docutinfoData.name)?<MyDocuterTime onPress={()=>{this._onSubmit(date,time)}} token={params.token} doctorId={params.doctorId} addressId={this.state.docutinfoData.addresses[0].id}/>:null}
//                 {/*<MyDocuterMoney onPress={()=>{this._onSubmit(date,time)}}/>*/}
//             </ScrollView>
//         )
//     }
// }

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    Image,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import MyDocuterInfo from '../Components/MyDocuterInfo';
import MyDocuterSelect from '../Components/MyDocuterSelect';
import MyDocuterMoney from '../Components/MyDocuterMoney';
import {rootURL} from '../Components/RootURL';
export default class DocuterInfo extends Component {
    _data = [];
    _amTime=[{'time':'08:00','timeNew':'8:0'},{'time':'08:30','timeNew':'8:30'},{'time':'09:00','timeNew':'9:0'},{'time':'09:30','timeNew':'9:30'},
        {'time':'10:00','timeNew':'10:0'},{'time':'10:30','timeNew':'10:30'},{'time':'11:00','timeNew':'11:0'},{'time':'11:30','timeNew':'11:30'},]
    _pmTime=[{'time':'14:00','timeNew':'14:0'},{'time':'14:30','timeNew':'14:30'},{'time':'15:00','timeNew':'15:0'},{'time':'15:30','timeNew':'15:30'},
        {'time':'16:00','timeNew':'16:0'},{'time':'16:30','timeNew':'16:30'},{'time':'17:00','timeNew':'17:0'},{'time':'17:30','timeNew':'17:30'},]
    static navigationOptions = {
        title: '医生详情',
    };
    constructor() {
        super();
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            docutinfoData: {},
            price:'',
            date:'',
            time:'',
            time_type:'',
            dataSource:ds,
            amTime:ds.cloneWithRows(this._amTime),
            pmTime:ds.cloneWithRows(this._pmTime),
        }
    }
    componentWillMount() {
        this._getDocutinfoData(token,doctor_id);
    }
    _onSubmit(date,time,time_type){
        if(date){
            global.appointment_time=date+' '+time
            this.props.navigation.navigate('DiseaseDescription',{name:this.state.docutinfoData.name,time_type:time_type});
        }else{
            alert('请选择就诊时间')
        }
    }
    _getDocutinfoData(token,doctor_id) {
        let URL="/api/doctor/show.json";
        fetch(rootURL+URL+'?token='+token+'&doctor_id='+doctor_id, {
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).then((responseJson) => {
            console.log(responseJson.result);
            global.address_id=responseJson.result.addresses[0].id;
            this._getTime(token,doctor_id,responseJson.result.addresses[0].id);
            this.setState({
                docutinfoData: responseJson.result,
            });
        }).catch((error) => {
            console.error(error);
        });
    }
    _getTime(token,doctor_id,address_id) {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let URL="/api/doctor/available_appointment.json"
        fetch(rootURL+URL+'?token='+token+'&doctor_id='+doctor_id+'&address_id='+address_id, {
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).then((responseJson) => {
            console.log(responseJson.result);
            this._data=responseJson.result;
            this.setState({
                dataSource: ds.cloneWithRows(this._data),
            });
        }).catch((error) => {
            console.error(error);
        });
    }
    _onSelect(rowData,rowID){
        if(rowData.am||rowData.pm){
            this._data.map(function (v,i,a) {
                if(rowID==i){
                    v.active=true;
                }else{
                    v.active=false;
                }
                return a;
            })
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                date:rowData.date,
                time_type:rowData.time_type,
                price:rowData.price,
                dataSource: ds.cloneWithRows(this._data),
            });
            this._amTime.map(function (v,i,a) {
                rowData.am_times.some(function(initV,initI,initA){
                    if (v.time == initV.time) {
                        v.count=initV.count
                        return v.time == initV.time
                    } else {
                        v.count=-1
                    }
                })
                v.active=false;
                return a;
            })
            this._pmTime.map(function (v,i,a) {
                rowData.pm_times.some(function(initV,initI,initA){
                    if (v.time == initV.time) {
                        v.count=initV.count
                        return v.time == initV.time
                    } else {
                        v.count=-1
                    }
                })
                v.active=false;
                return a;
            })
            this.setState({
                amTime: ds.cloneWithRows(this._amTime),
                pmTime: ds.cloneWithRows(this._pmTime),
            });
        }
    }
    _renderRow(rowData,sectionID,rowID){
        return(
            <TouchableOpacity  style={[{width:60,overflow:'hidden'}]} onPress={()=>{this._onSelect(rowData,rowID)}} activeOpacity={1}>
                <View style={[styles.center,styles.day,(rowData.active)?{backgroundColor:'#09a9ef'}:{}]}><Text style={styles.titleCenter}>{rowData.date.slice(5)}</Text></View>
                <View style={[styles.center,styles.am,(rowData.active)?{backgroundColor:'#09a9ef'}:{}]}><Text>{(rowData.am)?'坐诊':''}</Text></View>
                <View style={[styles.center,styles.am,(rowData.active)?{backgroundColor:'#09a9ef'}:{}]}><Text>{(rowData.pm)?'坐诊':''}</Text></View>
            </TouchableOpacity>
        )
    }
    _onSelectTime(rowData,sectionID,rowID){
        if(rowData.count>0){
            this._amTime.map(function (v,i,a) {
                if(v.time==rowData.time){
                    v.active=true;
                }else{
                    v.active=false;
                }
                return a;
            })
            this._pmTime.map(function (v,i,a) {
                if(v.time==rowData.time){
                    v.active=true;
                }else{
                    v.active=false;
                }
                return a;
            })
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                time:rowData.time,
                amTime: ds.cloneWithRows(this._amTime),
                pmTime: ds.cloneWithRows(this._pmTime),
            });
        }
    }
    _renderRowTime(rowData,sectionID,rowID){
        return(
            <TouchableOpacity onPress={()=>{this._onSelectTime(rowData,rowID)}} activeOpacity={1} style={[styles.time,rowData.count>0?(rowData.active?{backgroundColor:'#09a9ef'}:{}):{backgroundColor:'#f0f0f0'}]}>
                <Text style={[styles.titleTime,rowData.count>0?{}:{color:'red'}]}>{rowData.time}</Text>
                <Text style={[styles.titleTime,rowData.count>0?{}:{color:'red'}]}>{rowData.count>0?'余数为'+rowData.count:'不可预约'}</Text>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <ScrollView showsVerticalScrollIndicator={true}>
                <MyDocuterInfo source={{uri: this.state.docutinfoData.head_url}}
                               name={this.state.docutinfoData.name} job_title={this.state.docutinfoData.hospital_name}
                               introducation={this.state.docutinfoData.hospital_department_name}/>
                <MyDocuterSelect selectOne="预约" contentOne={this.state.docutinfoData.big_hospital_name} selectTwo="资料" contentTwo={this.state.docutinfoData.introducation}/>
                <View>
                    <View  style={styles.dateSelect}>
                        <View style={[styles.center,styles.head]}>
                            <Text>日期选择</Text>
                        </View>
                        <View style={styles.content}>
                            <View >
                                <View style={[styles.center,styles.day]}><Text>日 期</Text></View>
                                <View style={[styles.center,styles.am]}><Text>上 午</Text></View>
                                <View style={[styles.center,styles.am]}><Text>下 午</Text></View>
                            </View>
                            <ListView
                                dataSource={this.state.dataSource}
                                renderRow={this._renderRow.bind(this)}
                                {/*showsHorizontalScrollIndicator={true}*/}
                                {/*horizontal={true}*/}
                                {/*removeClippedSubviews={true}*/}
                            />
                        </View>
                    </View>
                    <View style={styles.dateSelect}>
                        <View style={[styles.center,styles.head]}>
                            <Text>选择上午时间</Text>
                        </View>
                        <ListView
                            contentContainerStyle={styles.contentTime}
                            dataSource={this.state.amTime}
                            renderRow={this._renderRowTime.bind(this)}
                        />
                    </View>
                    <View style={styles.dateSelect}>
                        <View style={[styles.center,styles.head]}>
                            <Text>选择下午时间</Text>
                        </View>
                        <ListView
                            contentContainerStyle={styles.contentTime}
                            dataSource={this.state.pmTime}
                            renderRow={this._renderRowTime.bind(this)}
                        />
                    </View>
                    <MyDocuterMoney price={this.state.price} onPress={()=>{this._onSubmit(this.state.date,this.state.time,this.state.time_type)}}/>
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    dateSelect: {
        marginTop: 5,
    },
    titleCenter:{
        textAlign:'center',
    },
    content:{
        flexDirection: 'row',
    },
    nav:{
        flex:1,
    },
    center:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    head: {
        height: 30,
    },
    day: {
        marginVertical:1,
        height:40,
        marginRight:1,
    },
    am: {
        marginBottom:1,
        height: 30,
        marginRight:1
    },
    contentTime:{
        flexDirection: 'row',
        flexWrap:'wrap',
        justifyContent: 'space-between',
    },
    titleTime:{
        textAlign:'center'
    },
    time:{
        width:'24.5%',
        marginTop:1,
        paddingVertical:8,
        backgroundColor: '#ffffff',
    }
});