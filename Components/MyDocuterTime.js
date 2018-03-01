/**
 * Created by zhangjie on 17-4-24.
 */

// import React,{Component} from 'react';
// import {
//     StyleSheet,
//     View,
//     Text,
//     TouchableOpacity,
// } from 'react-native';
// export default class MyDocuterTime extends Component {
//     constructor(){
//         super();
//         this.state={
//             isSelect:false,
//         }
//     }
//     _onSelectTime(){
//         if(!(this.state.isSelect)){
//             this.setState({isSelect:true})
//         }
//         else{
//             this.setState({isSelect:false})
//         }
//     }
//     render() {
//         return (
//             <View  style={styles.page}>
//                 <View style={[styles.center,styles.head]}>
//                     <Text>日期选择</Text>
//                 </View>
//                 <View style={styles.content}>
//                     <TouchableOpacity onPress={this._onSelectTime.bind(this)} activeOpacity={1} style={[styles.time,(true)?styles.disActiveBack:{}]}>
//                         <Text style={[styles.title,(true)?styles.disActiveTitle:{}]}>08：00</Text>
//                         <Text style={[styles.title,(true)?styles.disActiveTitle:{}]}>不可预约</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={this._onSelectTime.bind(this)} activeOpacity={1} style={[styles.time,(this.state.isSelect)?{backgroundColor:'#09a9ef'}:{}]}>
//                         <Text style={styles.title}>08：00</Text>
//                         <Text style={styles.title}>不可预约</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={this._onSelectTime.bind(this)} activeOpacity={1} style={styles.time}>
//                         <Text style={styles.title}>08：00</Text>
//                         <Text style={styles.title}>不可预约</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={this._onSelectTime.bind(this)} activeOpacity={1} style={styles.time}>
//                         <Text style={styles.title}>08：00</Text>
//                         <Text style={styles.title}>不可预约</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={this._onSelectTime.bind(this)} activeOpacity={1} style={[styles.time,(true)?styles.disActiveBack:{}]}>
//                         <Text style={[styles.title,(true)?styles.disActiveTitle:{}]}>08：00</Text>
//                         <Text style={[styles.title,(true)?styles.disActiveTitle:{}]}>不可预约</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={this._onSelectTime.bind(this)} activeOpacity={1} style={[styles.time,(this.state.isSelect)?{backgroundColor:'#09a9ef'}:{}]}>
//                         <Text style={styles.title}>08：00</Text>
//                         <Text style={styles.title}>不可预约</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={this._onSelectTime.bind(this)} activeOpacity={1} style={styles.time}>
//                         <Text style={styles.title}>08：00</Text>
//                         <Text style={styles.title}>不可预约</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={this._onSelectTime.bind(this)} activeOpacity={1} style={styles.time}>
//                         <Text style={styles.title}>08：00</Text>
//                         <Text style={styles.title}>不可预约</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         );
//     }
// }
// const styles = StyleSheet.create({
//     page: {
//         // marginVertical: 10,
//     },
//     title:{
//         textAlign:'center'
//     },
//     disActiveTitle:{
//         color:'#f36e6f'
//     },
//     disActiveBack:{
//         backgroundColor:'#f0f0f0'
//     },
//     content:{
//         flexDirection: 'row',
//         flexWrap:'wrap',
//         justifyContent: 'space-between',
//     },
//     center:{
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#ffffff',
//     },
//     head: {
//         height: 30,
//     },
//     time:{
//     width:94,
//         marginTop:1,
//         paddingVertical:8,
//         backgroundColor: '#ffffff',
// }
// });

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import MyDocuterMoney from '../Components/MyDocuterMoney';
import {rootURL} from '../Components/RootURL';
export default class MyDocuterTime extends Component {
    _data = [];
    _amTime=[{'time':'08:00','timeNew':'8:0'},{'time':'08:30','timeNew':'8:30'},{'time':'09:00','timeNew':'9:0'},{'time':'09:30','timeNew':'9:30'},
        {'time':'10:00','timeNew':'10:0'},{'time':'10:30','timeNew':'10:30'},{'time':'11:00','timeNew':'11:0'},{'time':'11:30','timeNew':'11:30'},]
    _pmTime=[{'time':'14:00','timeNew':'14:0'},{'time':'14:30','timeNew':'14:30'},{'time':'15:00','timeNew':'15:0'},{'time':'15:30','timeNew':'15:30'},
        {'time':'16:00','timeNew':'16:0'},{'time':'16:30','timeNew':'16:30'},{'time':'17:00','timeNew':'17:0'},{'time':'17:30','timeNew':'17:30'},]

    constructor() {
        super();
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            price:'',
            date:'',
            time:'',
            dataSource:ds,
            amTime:ds.cloneWithRows(this._amTime),
            pmTime:ds.cloneWithRows(this._pmTime),
        }
    }
    componentWillMount() {
        this._getTime(this.props.token,this.props.doctorId,this.props.addressId);
    }
    _getTime(token,doctorId,addressId) {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let URL="/api/doctor/available_appointment.json"
        fetch(rootURL+URL+'?token='+token+'&doctor_id='+doctorId+'&address_id='+addressId, {
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
    _onSubmit(date,time){
        // console.log(date+'---'+time)
        alert('提交')
        this.props.onPress(date,time)

        // this.props.navigation.navigate('DiseaseDescription',{date:date,time:time});
    }
    render() {
        return (
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
                                      showsHorizontalScrollIndicator={true}
                                      horizontal={true}
                                      removeClippedSubviews={true}
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
                <MyDocuterMoney price={this.state.price} onPress={()=>{this._onSubmit(this.state.date,this.state.time)}}/>
            </View>
        )
}}
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