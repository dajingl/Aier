/**
 * Created by liuyang on 17-4-23.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    Button,
} from 'react-native';
 import ScreenNavigator from '../Components/MyAppointmentMainScreenNavigator';

export default class MyAppointment extends React.Component {
    static navigationOptions = {
        title: '我的预约',
    };

    render() {
        return (
            <View style={styles.page}>
                <ScreenNavigator />
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