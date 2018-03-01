/**
 * Created by zhangjie on 17-4-21.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';
export default class MyHeaderIcon extends Component {
    render() {
        return (
            <View  style={styles.page}>
                <Image source={this.props.source} style={styles.img}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        justifyContent:'center',
    },
    img: {
        width:64,
        height:64
    }
});