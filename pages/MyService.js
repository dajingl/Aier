/**
 * Created by liuyang on 17-4-26.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    Button,
} from 'react-native';
import MyServiceComponent from '../Components/MyServiceComponent';
export default class MyService extends React.Component {

    static navigationOptions = {
        title: '我的预约',
    };
    render() {
        return (
            <View style={styles.page}>
                <MyServiceComponent/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    page:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
});