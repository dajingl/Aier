/**
 * Created by zhangjie on 17-4-21.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Button
} from 'react-native';
export default class MyButtonInput extends Component {
    render() {
        return (
            <View  style={styles.page}>
                <Button title={this.props.title} onPress={this.props.onPress}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    page: {
        padding: '3%',
    }
});