/**
 * Created by liuyang on 17-4-25.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    ListView,
    View,
    Image,
    Text,
} from 'react-native';
import {rootURL} from '../Components/RootURL';
import { TabNavigator } from "react-navigation";
import ListViewBasics from './MySericeListViewComponent';
class RecentChatsScreen extends React.Component {




    render() {
        return (
            <View style={{flex:1,backgroundColor:'#dddddd',}}>
                <ListViewBasics/>
            </View>
        )
    }
}

class PendingConfirmationScreen extends React.Component {
    constructor(){
        super();
        this.state={
            obj:{},
        }
    }
    _pendingConfirmation() {
        let URL="/api/appointment_service/normal_user_unconfirmed.json";
        fetch(rootURL+URL+'?token='+token+'&normal_user_id='+userId,{
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).then((responseJson) => {
            console.log(321)
            this.setState({
                obj: responseJson.result
            })
            console.log(this.state.obj)
        }).catch((error) => {
            console.error(error);
        });
    }
    componentDidMount() {
        this._pendingConfirmation()
    }

    render() {
        return (
            <View style={{flex:1,backgroundColor:'#dddddd'}}>
                <ListViewBasics isData={this.state.obj}/>
            </View>

        )
    }
}

class PendingReturnScreen extends React.Component {
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#dddddd'}}>
                <ListViewBasics/>
            </View>
        )
    }
}

class TobepaidScreen extends React.Component {
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#dddddd'}}>
                <ListViewBasics/>
            </View>
        )
    }
}
const MyServiceComponent = TabNavigator({
    已确认: { screen: RecentChatsScreen },
    待确认: { screen: PendingConfirmationScreen },
    待复诊: { screen: PendingReturnScreen },
    待支付: { screen: TobepaidScreen },

}, {
    tabBarOptions: {
        activeTintColor:'#06a9ef',
        inactiveTintColor:'gray',
        style:{
            backgroundColor:'#ffffff',
            height:50,
        }
    },
});



export default MyServiceComponent;

