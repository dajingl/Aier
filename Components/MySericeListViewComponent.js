/**
 * Created by liuyang on 17-4-27.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    ListView,
    View,
    Image,
    Text,
} from 'react-native';

export default class ListViewBasics extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            obj: ds.cloneWithRows([
                {
                    doctor_image_url: require('../images/adam.jpg'),
                    appointment_address: "爱尔眼科医院 高新路100号",
                    doctor_job_title: "主任医师",
                    doctor_name: "张三",
                    workId: '001',
                    isState:'复诊',
                    VisitTime:'2017-01'
                }
            ])
        };
    }
    componentDidMount() {
        if(this.props.isData) {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            this.setState({
                obj: ds.cloneWithRows(this.props.isData)
            })
        }
    }
    render() {
        return (
                <ListView
                    dataSource={this.state.obj}
                    renderRow={this._renderRow.bind(this)}
                />
        );
    }
    _renderRow(rowData, sectionID, rowID) {
        return (
            <View style={styles.item}>
                <View style={{flex:1, alignItems: 'center',}}>
                    <Image  style={{width:68,height:78,marginBottom:30}} source={rowData.doctor_image_url} />
                    <Text style={{textAlign:'center'}}>{rowData.isState}</Text>
                </View>
                <View style={styles.info}>
                    <View style={styles.nameLine}>
                        <Text style={styles.name}>{rowData.doctor_name}</Text>
                        <Text style={styles.name}>{'工号'+rowData.workId}</Text>
                    </View>
                    <Text style={{marginBottom:2,}}>{rowData.appointment_address}</Text>
                    <Text style={{marginBottom:5,}}>{rowData.doctor_job_title}</Text>
                    <Text style={styles.promptBox}>{'建议复诊时间：'+rowData.VisitTime}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item:{
        // flex: 1,
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderBottomWidth:1,
        backgroundColor:'white',
        paddingTop:12,
        paddingBottom:14,

    },
    nameLine:{
        flexDirection:'row',
        justifyContent: 'flex-start',
        marginBottom:10,
    },
    name:{
        fontSize:16,
        fontWeight:'bold',
    },
    info:{
        flex:3
    },
    appointmentData:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    promptBox:{
        width:162,
        height:26,
        padding:2,
        marginTop:5,
        borderWidth:1,
        borderRadius: 3,
        borderColor:'#09a9ef',
        fontSize:12,
        color:'#09a9ef',

    }
});