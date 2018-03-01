/**
 * Created by wangk on 17-4-22.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Button,
    ListView,
    TouchableWithoutFeedback
} from 'react-native';
import ModifyContactPage from './ModifyContactPage';
import {rootURL} from '../Components/RootURL';
export default class FamilyContactPage extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const _addConcat=function(){
            navigation.navigate('AddContactPage');
        }
        return {
            title:'家庭联系人',
            headerRight: <Button title="新增" onPress={() => _addConcat()}/>,
        };
    };
    _data = [];
    constructor() {
        super();
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
        }
    }
    _onModifyContactClick(rowData,rowID){
        const navigate = this.props.navigation.navigate;
        navigate('ModifyContactPage',{rowData:rowData,rowID:rowID});
    }
    componentDidMount() {
        this._refreshData(token,userId);
    }
    _refreshData(token,normal_user_id) {
        let URL="/api/patient/normal_user.json";
        fetch(rootURL+URL+'?token='+token+'&normal_user_id='+normal_user_id, {
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).then((responseJson) => {
            this._data = responseJson.result.slice(1);
            console.log(responseJson.result);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(this._data),
            });
        }).catch((error) => {
            console.error(error);
        });
    }
    _renderRow(rowData, sectionID, rowID) {
        return (
                    <View style={styles.page}>
                        {/*<TouchableWithoutFeedback onPress={this._onModifyContactClick.bind(this)}>*/}
                            <TouchableWithoutFeedback onPress={()=>this._onModifyContactClick(rowData,rowID)}>
                            <View style={styles.container}>
                                <Text style={styles.name}>{rowData.name}</Text>
                                <View style={styles.row}>
                                    <Image source={require('../images/icon_phone.png')} style={styles.img}/>
                                    <Text>{rowData.phone}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Image source={require('../images/icon_address.png')} style={styles.img}/>
                                    <Text>{rowData.address}</Text>
                                </View>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
        );
    }
    render() {
        return (
            <View>
                <ListView dataSource={this.state.dataSource}
                          renderRow={this._renderRow.bind(this)}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    page: {
        marginTop:1,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor:'#ffffff'
    },
    container: {
        paddingTop: 18,
        paddingBottom: 18,
        paddingLeft: 15,
    },
    name: {
        fontSize: 14,
        fontWeight:'bold'
    },
    row: {
        flexDirection: 'row',
        marginTop: 13
    },
    img: {
        width: 18,
        height: 20
    }

});