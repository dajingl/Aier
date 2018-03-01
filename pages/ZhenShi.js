/**
 * Created by zhangjie on 17-4-22.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    ListView,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import MyDocuterInfo from '../Components/MyDocuterInfo';
import {rootURL} from '../Components/RootURL';
export default class ZhenShi extends Component {
    static navigationOptions = {
        title: '诊 室',
    };
    _data = [];
    constructor() {
        super();
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            isRefreshing: false,
            isLoadingMore: false
        }
    }
    render() {
        return (
            <View>
                <ListView dataSource={this.state.dataSource}
                          renderRow={this._renderRow.bind(this)}
                          refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._onRefresh.bind(this)}/>}
                          renderFooter={this._renderFooter.bind(this)}
                          onEndReached={this._onEndReached.bind(this)}
                />
            </View>
        );
    }
    // 组件加载完成后更新数据
    componentWillMount() {
        this._refreshData(token,hospital_id,speciality_id);
    }
    _onRowPress(id) {
        global.doctor_id=id
        this.props.navigation.navigate('DocuterInfo');
    }
    _renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={()=>{
                this._onRowPress(rowData.id);
            }}>
            <MyDocuterInfo source={{uri: rowData.head_url}}
             name={rowData.name} job_title={rowData.job_title} introducation={rowData.introducation}/>
            </TouchableOpacity>
        );
    }
    _onRefresh() {
        this._refreshData(token,hospital_id,speciality_id);
    }
    _refreshData(token,hospital_id,speciality_id) {
        this.setState({
            isRefreshing: true
        });
        let URL="/api/doctor/speciality\_of\_hospital.json"
            fetch(rootURL+URL+'?token='+token+'&hospital_id='+hospital_id+'&speciality_id='+speciality_id+'&page=0&count=20', {
                method: 'GET'
            }).then((response) => {
                return response.json()
            }).then((responseJson) => {
                this._data = responseJson.result;
                console.log(responseJson.result);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this._data),
                    isRefreshing: false
                });
            }).catch((error) => {
                console.error(error);
            });
    }
    _loadMoreData(token,hospital_id,speciality_id) {
        if (this._data.length == 0) {
            return;
        }
        this.setState({
            isLoadingMore: true
        });
        let URL="/api/doctor/speciality\_of\_hospital.json"
            // fetch('http://www.bigbug.tech:8080/hospital-appointment-api/api/doctor/recommend.json?token=e7168ad103b0b443f737670d65bbfc26', {
        fetch(rootURL+URL+'?token='+token+'&hospital_id='+hospital_id+'&speciality_id='+speciality_id+'&page=0&count=20', {
                method: 'GET'
            }).then((response) => {
                return response.json()
            }).then((responseJson) => {
                this._data = responseJson.result;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(this._data),
                    isLoadingMore: false
                });
            }).catch((error) => {
                console.error(error);
            });
    }
    _renderFooter() {
        if (this.state.isLoadingMore) {
            return (
                <ActivityIndicator/>
            );
        } else {
            return null;
        }
    }
    _onEndReached() {
        this._loadMoreData(token,hospital_id,speciality_id);
    }
}
