/**
 * Created by LiuQiang on 2017/4/24.
 */
import React from 'react';
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

import Clinic  from './Clinic';
import {rootURL} from '../Components/RootURL';
export  default class ArClinic extends React.Component {
    static navigationOptions = {
        title: '爱尔诊所'
    };
    constructor() {
        super();
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
        }
    }
    componentDidMount() {
        this._refreshDataArClinic(token);
    }
    _refreshDataArClinic(token) {
        let URL="/api/hospital/all.json"
        fetch(rootURL+URL+'?token='+token,
            {
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).then((responseJson) => {
            console.log(responseJson.result);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseJson.result),
            });
        }).catch((error) => {
            console.error(error);
        });
    }
    _onRowPress(id) {
        console.log('_onRowPress ' + id);
        const navigate = this.props.navigation.navigate;
        global.hospital_id=id
        navigate('Clinic');
    }
    _renderRow(rowData, sectionID, rowID) {
        console.log(rowData);
        return (
            <TouchableOpacity onPress={()=>{
                this._onRowPress(rowData.id);
            }}>
                <View style={styles.page}>
                    <View style={styles.img}>
                        <Image source={{uri: rowData.pic_url}} style={styles.images}/>
                    </View>
                    <View style={styles.ClinicContent}>
                        <View style={styles.Titles}>
                            <Text style={styles.ClinicTitle}> {rowData.name}</Text>
                            <Text style={{paddingLeft:10}}>&nbsp;{rowData.doctor_count}位医生</Text>
                        </View>
                        <View style={styles.ClinicKind}>
                            <Text style={{color:'#fff'}}> {rowData.departments[0].name}</Text>
                        </View>
                        <View style={styles.address}>
                            <Image source={require('../images/icon_address.png') } style={{height: 16,width:16}}/>
                            <Text style={styles.ClinicLocal}>{rowData.address}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        return (
            <View>
                <ListView dataSource={this.state.dataSource}
                          renderRow={this._renderRow.bind(this)}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        padding: 12,
        borderWidth: 1,
        backgroundColor: "#ffffff",
        borderColor:'#dddddd'
    },
    img: {
        flex: 2
    },
    ClinicContent: {
        flex: 5
    },
    images: {
        height: 70,
        width: 80

    },
    Titles: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: 5
    },
    ClinicTitle: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    ClinicKind: {

        width: 60,
        height: 30,
        padding: 2,
        backgroundColor: '#60bdf8',
        borderRadius: 3

    },
    ClinicLocal: {
        fontSize: 14,
        color: '#898989',
        paddingBottom:3
    },
    address: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 5
    }

})