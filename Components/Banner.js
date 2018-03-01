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
    Image
} from 'react-native';

export default class Banner extends React.Component {


    render() {
        return (
            <View>
                <Image source={this.props.url} style={styles.img}/>
            </View>)
    }
}


const styles = StyleSheet.create({

    img:{
       width:'100%',
       height:150
    }


});