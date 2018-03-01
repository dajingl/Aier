/**
 * Created by zhangjie on 17-4-24.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView,
    TouchableOpacity,
} from 'react-native';

const amTime=[{'time':'08:00','timeNew':'8:0'},{'time':'08:30','timeNew':'8:30'},{'time':'09:00','timeNew':'9:0'},{'time':'09:30','timeNew':'9:30'},
    {'time':'10:00','timeNew':'10:0'},{'time':'10:30','timeNew':'10:30'},{'time':'11:00','timeNew':'11:0'},{'time':'11:30','timeNew':'11:30'},]
const pmTime=[{'time':'14:00','timeNew':'14:0'},{'time':'14:30','timeNew':'14:30'},{'time':'15:00','timeNew':'15:0'},{'time':'15:30','timeNew':'15:30'},
    {'time':'16:00','timeNew':'16:0'},{'time':'16:30','timeNew':'16:30'},{'time':'17:00','timeNew':'17:0'},{'time':'17:30','timeNew':'17:30'},]

class MyDocuterTime extends Component {
    _Source=[
        {
            "date": "2015-11-30",
            "am_times": [
                {
                    "count": 2,
                    "time": "8:0"
                },
                {
                    "count": 2,
                    "time": "9:0"
                }
            ],
            "am": true,
            "pm_total": 0,
            "am_total": 4,
            "pm": false,
            "pm_times": []
        },
        {
            "date": "2015-12-1",
            "am_times": [],
            "am": false,
            "pm_total": 0,
            "am_total": 0,
            "pm": false,
            "pm_times": []
        },
        {
            "date": "2015-12-2",
            "am_times": [
                {
                    "count": 1,
                    "time": "8:0"
                },
                {
                    "count": 2,
                    "time": "10:0"
                }
            ],
            "am": true,
            "pm_total": 0,
            "am_total": 3,
            "pm": true,
            "pm_times": []
        },
        {
            "date": "2015-12-3",
            "am_times": [],
            "am": false,
            "pm_total": 0,
            "am_total": 0,
            "pm": false,
            "pm_times": []
        },
        {
            "date": "2015-12-4",
            "am_times": [],
            "am": false,
            "pm_total": 0,
            "am_total": 0,
            "pm": false,
            "pm_times": []
        },
        {
            "date": "2015-12-5",
            "am_times": [],
            "am": true,
            "pm_total": 0,
            "am_total": 0,
            "pm": true,
            "pm_times": []
        },
        {
            "date": "2015-12-6",
            "am_times": [
                {
                    "count": 1,
                    "time": "11:0"
                }
            ],
            "am": true,
            "pm_total": 3,
            "am_total": 1,
            "pm": true,
            "pm_times": [
                {
                    "count": 2,
                    "time": "15:0"
                },
                {
                    "count": 1,
                    "time": "15:30"
                }
            ]
        }
    ]
    _amTime=amTime
    _pmTime=pmTime
    _isSelectTimeTitle='上午'
    constructor(){
        super();
        // console.log(this.props.rowId)
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        let _amSource=this._Source[0].am_times;
        let _pmSource=this._Source[0].pm_times;
        this._amTime.map(function (v,i,a) {
        console.log(_amSource)
          _amSource.some(function(initV,initI,initA){
              if (v.timeNew == initV.time) {
                  v.title = '余数' + initV.count + '个';
                  return v.timeNew == initV.time
              } else {
                  v.title = '不可预约';
              }
          })
            v.isSelect=false;
            return a;
        })
        this._pmTime.map(function (v,i,a) {
            _pmSource.some(function(initV,initI,initA){
                if (v.timeNew == initV.time) {
                    v.title = '余数' + initV.count + '个';
                    return v.timeNew == initV.time
                } else {
                    v.title = '不可预约';
                }
            })
            v.isSelect=false;
            return a;
        })

        console.log(this._amTime);

        this.state={
            isSelectTimeTitle:this._isSelectTimeTitle,
            dataSourceTime:ds.cloneWithRows(this._amTime),
        }
    }
    _makeDataSource(){
        alert(this.props.rowId)
        let _amSource=this._Source[this.props.rowId].am_times;
        let _pmSource=this._Source[this.props.rowId].pm_times;
        this._amTime.map(function (v,i,a) {
            _amSource.some(function(initV,initI,initA){
                if (v.timeNew == initV.time) {
                    v.title = '余数' + initV.count + '个';
                    return v.timeNew == initV.time
                } else {
                    v.title = '不可预约';
                }
            })
            v.isSelect=false;
            return a;
        })
        this._pmTime.map(function (v,i,a) {
            _pmSource.some(function(initV,initI,initA){
                if (v.timeNew == initV.time) {
                    v.title = '余数' + initV.count + '个';
                    return v.timeNew == initV.time
                } else {
                    v.title = '不可预约';
                }
            })
            v.isSelect=false;
            return a;
        })
        if(this.props.isSelectTimeTitle=='上午'){
            let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.state={
                dataSourceTime:ds.cloneWithRows(this._amTime),
            }
        }

        console.log(this._amTime)

    }

    _onSelectTime(){
        this._makeDataSource()
       // alert(this.props.isSelectTimeTitle)
       // alert(_isSelectTimeTitle)
    }
    _renderRow(rowData,sectionID,rowID){
        return(
                <TouchableOpacity onPress={this._onSelectTime.bind(this)} activeOpacity={1} style={[styles.time]}>
                    <Text style={[styles.titleTime]}>{rowData.time}</Text>
                    <Text style={[styles.titleTime]}>{rowData.title}</Text>
                </TouchableOpacity>
        )
    }
    render() {
        return (
            <ListView contentContainerStyle={styles.contentTime}
                      dataSource={this.state.dataSourceTime}
                      renderRow={this._renderRow.bind(this)}/>
        )
    }
}




export default class MyDocuterDate extends Component {
    _dataSource=[
        {
            "date": "2015-11-30",
            "am_times": [
                {
                    "count": 2,
                    "time": "8:0"
                },
                {
                    "count": 2,
                    "time": "9:0"
                }
            ],
            "am": true,
            "pm_total": 0,
            "am_total": 4,
            "pm": false,
            "pm_times": []
        },
        {
            "date": "2015-12-1",
            "am_times": [],
            "am": false,
            "pm_total": 0,
            "am_total": 0,
            "pm": false,
            "pm_times": []
        },
        {
            "date": "2015-12-2",
            "am_times": [
                {
                    "count": 1,
                    "time": "8:0"
                },
                {
                    "count": 2,
                    "time": "10:0"
                }
            ],
            "am": true,
            "pm_total": 0,
            "am_total": 3,
            "pm": true,
            "pm_times": []
        },
        {
            "date": "2015-12-3",
            "am_times": [],
            "am": false,
            "pm_total": 0,
            "am_total": 0,
            "pm": false,
            "pm_times": []
        },
        {
            "date": "2015-12-4",
            "am_times": [],
            "am": false,
            "pm_total": 0,
            "am_total": 0,
            "pm": false,
            "pm_times": []
        },
        {
            "date": "2015-12-5",
            "am_times": [],
            "am": true,
            "pm_total": 0,
            "am_total": 0,
            "pm": true,
            "pm_times": []
        },
        {
            "date": "2015-12-6",
            "am_times": [
                {
                    "count": 1,
                    "time": "11:0"
                }
            ],
            "am": true,
            "pm_total": 3,
            "am_total": 1,
            "pm": true,
            "pm_times": [
                {
                    "count": 2,
                    "time": "15:0"
                },
                {
                    "count": 1,
                    "time": "15:30"
                }
            ]
        }
        ]
    constructor(){
        super();
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this._dataSource.map(function (v,i,a) {
            v.isSelectAm=false;
            v.isSelectPm=false;
            return a;
        })
        this.state={
            isSelectTimeTitle:'上午',
            isSelectRowId:0,
            dataSource:ds.cloneWithRows(this._dataSource),
        }
    }
    _onSelect(rowData,rowID,isAm){
        alert(rowID+isAm);
        if(isAm=='上午'){
            if(rowData.am&&!(rowData.isSelectAm)){
                rowData.isSelectAm=true;
            }
            else{
                rowData.isSelectAm=false;
            }
        }else{
            if(rowData.pm&&!(rowData.isSelectPm)){
                rowData.isSelectPm=true;
            }
            else{
                rowData.isSelectPm=false;
            }
        }
        this._dataSource[rowID]=rowData;
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
            isSelectTimeTitle:isAm,
            isSelectRowId:rowID,
            dataSource:ds.cloneWithRows(this._dataSource),
        })
    }
    _renderRow(rowData,sectionID,rowID){
        return(
            <View  style={styles.nav}>
                <View style={[styles.center,styles.day]}><Text style={styles.titleCenter}>{rowData.date}</Text></View>
                <TouchableOpacity onPress={()=>{this._onSelect(rowData,rowID,'上午')}} activeOpacity={1}>
                    <View style={[styles.center,styles.am,(rowData.isSelectAm)?{backgroundColor:'#09a9ef'}:{}]}><Text>{(rowData.am)?'坐诊':''}</Text></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{this._onSelect(rowData,rowID,'下午')}} activeOpacity={1}>
                    <View style={[styles.center,styles.am,(rowData.isSelectPm)?{backgroundColor:'#09a9ef'}:{}]}><Text>{(rowData.pm)?'坐诊':''}</Text></View>
                </TouchableOpacity>
            </View>
        )
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
                        <View style={[styles.center,styles.day]}><Text>日期</Text></View>
                        <View style={[styles.center,styles.am]}><Text>上午</Text></View>
                        <View style={[styles.center,styles.am]}><Text>下午</Text></View>
                    </View>
                    <ListView contentContainerStyle={styles.date}
                              dataSource={this.state.dataSource}
                              renderRow={this._renderRow.bind(this)}/>
                </View>
            </View>
            <View  style={styles.dateSelect}>
                <View style={[styles.center,styles.head]}>
                    <Text>选择{this.state.isSelectTimeTitle}时间</Text>
                </View>

                <MyDocuterTime isSelectTimeTitle={this.state.isSelectTimeTitle} rowId={this.state.isSelectRowId}/>

            </View>
        </View>
        );
    }
}
const styles = StyleSheet.create({
    dateSelect: {
        marginVertical: 5,
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
    date:{
        // flex:7,
        flexDirection: 'row',
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
        width:85,
        marginTop:1,
        paddingVertical:8,
        backgroundColor: '#ffffff',
    }
});


//
// {
//     obj.map(function (item) {
//         return (
//             <TouchableOpacity onPress={this._onPressButton}
//                               style={styles.flex1}>
//
//                 <View key={item.id}>
//                     <View style={styles.weekPage}>
//                         <Text style={styles.weekText}>
//                             {item.week}
//                         </Text>
//                     </View>
//                     <View style={styles.visitPage}>
//                         <Text style={styles.visitText}>
//                             {item.data1}
//                         </Text>
//                     </View>
//                     <View style={styles.visitPage}>
//                         <Text style={styles.visitText}>
//                             {item.data2}
//                         </Text>
//                     </View>
//                 </View>
//             </TouchableOpacity>
//         )
//     })
// }



//
// export default class MyDocuterDate extends Component {
//     _dataSource=[{"date":"12.05 周五","am":"上午","pm":"下午"},{"date":"12.05  周五","am":"","pm":"",'value':''},
//         {"date":"12.05  周五","am":"","pm":""},{"date":"12.05  周五","am":"","pm":"",'value':''},
//         {"date":"12.05  周五","am":"","pm":""},{"date":"12.05  周五","am":"","pm":""},{"date":"12.05  周五","am":"","pm":"",'value':''}]
//     constructor(){
//         super();
//         let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//         this._dataSource.map(function (v,i,a) {
//             v.isSelectAm=false;
//             v.isSelectPm=false;
//             return a;
//         })
//         this.state={
//             dataSource:ds.cloneWithRows(this._dataSource)
//         }
//     }
//     _onSelect(rowData,rowID,isAm){
//         alert(rowID+isAm);
//         if(isAm=='am'){
//             if(!(rowData.isSelectAm)){
//                 rowData.isSelectAm=true;
//             }
//             else{
//                 rowData.isSelectAm=false;
//             }
//         }else{
//             if(!(rowData.isSelectPm)){
//                 rowData.isSelectPm=true;
//             }
//             else{
//                 rowData.isSelectPm=false;
//             }
//         }
//         this._dataSource[rowID]=rowData;
//         let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
//         this.setState({
//             dataSource:ds.cloneWithRows(this._dataSource)
//         })
//     }
//     _renderRow(rowData,sectionID,rowID){
//         return(
//         <View  style={styles.nav}>
//             <View style={[styles.center,styles.day]}><Text style={styles.titleCenter}>{rowData.date}</Text></View>
//             <TouchableOpacity onPress={()=>{this._onSelect(rowData,rowID,'am')}} activeOpacity={1}>
//             <View style={[styles.center,styles.am,(rowData.isSelectAm)?{backgroundColor:'#09a9ef'}:{}]}><Text>{rowData.am}</Text></View>
//             </TouchableOpacity>
//             <TouchableOpacity onPress={()=>{this._onSelect(rowData,rowID,'pm')}} activeOpacity={1}>
//              <View style={[styles.center,styles.am,(rowData.isSelectPm)?{backgroundColor:'#09a9ef'}:{}]}><Text>{rowData.pm}</Text></View>
//             </TouchableOpacity>
//         </View>
//         )
//     }
//     render() {
//         return (
//             <View  style={styles.page}>
//                 <View style={[styles.center,styles.head]}>
//                     <Text>日期选择</Text>
//                 </View>
//                 <View style={styles.content}>
//                     <View >
//                         <View style={[styles.center,styles.day]}><Text>日期</Text></View>
//                         <View style={[styles.center,styles.am]}><Text>上午</Text></View>
//                         <View style={[styles.center,styles.am]}><Text>下午</Text></View>
//                     </View>
//                     <ListView contentContainerStyle={styles.date}
//                               dataSource={this.state.dataSource}
//                               renderRow={this._renderRow.bind(this)}/>
//                 </View>
//             </View>
//         );
//     }
// }
// const styles = StyleSheet.create({
//     page: {
//         marginVertical: 5,
//     },
//     titleCenter:{
//         textAlign:'center',
//     },
//     content:{
//         flexDirection: 'row',
//     },
//     nav:{
//         flex:1,
//     },
//     date:{
//         flex:7,
//         flexDirection: 'row',
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
//     day: {
//         marginVertical:1,
//         height:40,
//         marginRight:1,
//     },
//     am: {
//         marginBottom:1,
//         height: 30,
//         marginRight:1
//     },
// });