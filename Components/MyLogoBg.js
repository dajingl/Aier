/**
 * Created by zhangjie on 17-4-21.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Image
} from 'react-native';
export default class MyLogoBg extends Component {
    render() {
        return (
                <Image source={this.props.source} style={[{width:'100%'},this.props.style]}/>
        );
    }
}