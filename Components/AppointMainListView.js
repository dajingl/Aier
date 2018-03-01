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

export default class AppListViewBasics extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            obj: ds.cloneWithRows([
                {
                    patient_image_url: "http://localhost:8080/aierlife-api/upload/appointment_1449415574029.png",
                    patient_gender: 1,
                    time_type: 1,
                    create_time: "2015-12-06 11:26:14",
                    appointment_address: "爱尔眼科医院 高新路100号",
                    serial_number: "2015120611261426141449415574242",
                    patient_condition: "牙疼",
                    doctor_hostital: "爱尔眼科医院",
                    price: 100.0,
                    patient_name: "大毛",
                    doctor_department: "齿科",
                    patient_phone: "13000000001",
                    doctor_job_title: "主任医师",
                    id: 3,
                    doctor_name: "张三"
                }
            ])
        };
    }
    componentDidMount() {
        if(this.props.isPaidData) {
            const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
            if (this.props.isPaidData.time_type == 1) {
                this.props.isPaidData.time_type = '普通预约'
            } else if (this.props.isPaidData.time_type == 2) {
                this.props.isPaidData.time_type = '加急预约'
            } else if (this.props.isPaidData.time_type == 3) {
                this.props.isPaidData.time_type = '实时预约'
            }
            this.setState({
                obj: ds.cloneWithRows(this.props.isPaidData)
            })
        }
    }
    render() {
        return (
            <View>
                <ListView
                    dataSource={this.state.obj}
                    renderRow={this._renderRow.bind(this)}
                />
            </View>

        );
    }
    _renderRow(rowData, sectionID, rowID) {
        return (
            <View style={styles.appointment}>
                <View style={styles.appointmentData}>
                    <Text style={{textAlign:'left',marginBottom:5,}}>{rowData.create_time+' '+rowData.patient_name}</Text>
                    <Text>{rowData.doctor_department+' '+rowData.doctor_name}</Text>
                </View>
                <View style={styles.appointmentData}>
                    <Text style={{textAlign:'right',marginBottom:5,}}>{rowData.time_type}</Text>
                    <Text style={{textAlign:'right',color:'red'}}>{rowData.price}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    appointment:{
        // flex: 1,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        borderBottomWidth:1,
        borderBottomColor: '#dddddd',
        padding:19,
        backgroundColor:'#fff'
    },
    appointmentData:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    }
});