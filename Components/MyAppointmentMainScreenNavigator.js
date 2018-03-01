/**
 * Created by liuyang on 17-4-25.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';
import { TabNavigator } from "react-navigation";
import AppListViewBasics from  './AppointMainListView'
import {rootURL} from '../Components/RootURL';
class RecentChatsScreen extends React.Component {
    constructor(){
        super();
        this.state={
            obj:{},
        }
    }
    _unPaidData() {
        let URL="/api/appointment_order/normal_user_unpaid.json";
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
        this._unPaidData()
    }

    render() {
        return (
            <View style={{flex:1}}>
                <AppListViewBasics isPaidData={this.state.obj}/>
            </View>

        )
    }
}

class AllContactsScreen extends React.Component {
    constructor(){
        super();
        this.state={
            obj:{},
        }
    }
    _paidData() {
        let URL="/api/appointment_order/normal_user_paid.json";
        fetch(rootURL+URL+'?token='+token+'&normal_user_id='+userId,{
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).then((responseJson) => {
            console.log(123)
            this.setState({
                obj: responseJson.result
            })
            console.log(this.state.obj)
        }).catch((error) => {
            console.error(error);
        });
    }
    componentDidMount() {
        this._paidData()
    }
    render() {
        return (
            <View style={{flex:1}}>
                <AppListViewBasics isPaidData={this.state.obj}/>
            </View>
        )
    }
}

 const ScreenNavigator = TabNavigator({
    未付款: { screen: RecentChatsScreen },
    已付款: { screen: AllContactsScreen },

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




export default ScreenNavigator;


