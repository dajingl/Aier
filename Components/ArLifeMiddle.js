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

export default class ArLifeMiddle extends React.Component {


    render() {
        return (
            <View style={styles.page}>
                <View style={styles.text}>
                    <View>
                        <Text style={styles.fontTitle}>{this.props.title}</Text>

                    </View>
                    <View>
                        <Text style={styles.fontContent}>{this.props.content}</Text>
                    </View>
                </View>
                <View style={styles.pict}>
                    <Image source={this.props.url} style={styles.img}/>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    page: {
        flex:1,
        flexDirection: 'row',
        justifyContent:'space-between'

    },
    text: {
        flexDirection: 'column',
    },
    fontTitle: {
        fontSize:18
    },
    fontContent: {
        color:'#888888',
        fontSize: 14
    },
    pict:{
       padding:10
    },
    img: {
        width: 40,
        height: 40
    }


});