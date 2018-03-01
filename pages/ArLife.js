/**
 * Created by LiuQiang on 2017/4/22.
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
    ScrollView,
    TouchableHighlight
} from 'react-native';

import Banner from '../Components/Banner';
import ArLifeMiddle from '../Components/ArLifeMiddle';
import ArClinic  from './ArClinic';
import {rootURL} from '../Components/RootURL';


export default class ArLife extends React.Component {
    constructor() {
        super();
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            selectedTab: '首页'
        }
    }
    componentDidMount() {
        this._refreshData(token);
        // this._refreshData(this.props.token);
    }
    _refreshData(token) {
        let URL="/api/doctor/recommend.json"
        fetch(rootURL+URL+'?token='+token, {
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).then((responseJson) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseJson.result),
            });
        }).catch((error) => {
            console.error(error);
        });
    }
    _onRowPress(rowID) {
        console.log('_onRowPress ' + rowID);
    }
    _onArClinic() {
        const navigate = this.props.navigation.navigate;
        navigate('ArClinic');
    }
    _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={()=>{
                this._onRowPress(rowID);
            }} style={{backgroundColor:'#ffffff',marginTop:2}}>
                <View style={styles.doctors}>
                    <View style={styles.doctorImg}>
                        <Image style={styles.img} source={{uri: rowData.head_url}}/>
                    </View>
                    <View style={styles.doctorContent}>
                        <Text style={styles.doctorName}>
                            <Text style={{fontSize:16,fontWeight:'bold'}}>
                                {rowData.name}
                            </Text>
                            <Text style={styles.chanKe}>
                                &nbsp;&nbsp;产科
                            </Text>
                            <Text style={{fontSize:12,marginLeft:5}}>
                                &nbsp;&nbsp;{rowData.job_title}
                            </Text>
                        </Text>
                        <Text style={{fontSize:16,paddingBottom:8}}>
                            {rowData.hospital_name}
                        </Text>
                        <Text style={{color:'#707070'}}>
                            {rowData.introducation}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <View style={styles.page}>
                <Banner url={require('../images/pic_home_banner.png')}/>
                <ScrollView>
                    <View style={styles.TrList}>
                        <View style={styles.TrListRow}>
                            <TouchableOpacity style={styles.TrListContent} onPress={this._onArClinic.bind(this)}>
                                <ArLifeMiddle url={require('../images/icon_fuzhen.png')} title='复诊'
                                              content='及时复诊预约'/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.TrListContent} onPress={this._onArClinic.bind(this)}>
                                <ArLifeMiddle url={require('../images/icon_aierzhensuo.png')} title='爱尔诊所'
                                              content='名医坐诊'/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.TrListRow}>
                            <TouchableOpacity style={styles.TrListContent} onPress={this._onArClinic.bind(this)}>
                                <ArLifeMiddle url={require('../images/icon_mingyilianmeng.png')} title='名医联盟'
                                              content='线上资询'/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.TrListContent} onPress={this._onArClinic.bind(this)}>
                                <ArLifeMiddle url={require('../images/icon_major.png')} title='商户联盟'
                                              content='信赖商户'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={styles.hot}>
                        名医联盟推荐医生
                    </Text>
                    <ListView dataSource={this.state.dataSource}
                              renderRow={this._renderRow.bind(this)}/>
                </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    page: {
        flex: 1,
        flexDirection: 'column'
    },
    TrList: {
        justifyContent: 'space-between',
        flexWrap:'wrap',

    },
    TrListRow:{
        flex:1,
        flexDirection: 'row',
    },
    TrListContent:{
        flex:1,
        backgroundColor:'#ffffff',
        marginBottom:2,
        marginLeft:2,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    img: {
        width: 70,
        height: 70,

        paddingTop: 18,
    },
    hot: {
        fontSize: 22,
        padding: 10,
        marginTop:5,
        backgroundColor:'#ffffff',
    },
    doctors: {
        flexDirection: 'row',
        padding: 10
    },
    doctorImg: {
        flex: 2,
        paddingLeft: 5,
    },
    doctorContent: {
        flex: 5,
        flexDirection: 'column',
    },
    doctorName: {
        flexDirection: 'row',
        paddingBottom: 8
    },
    chanKe: {
        fontSize: 16,
        marginLeft:20
    },

});