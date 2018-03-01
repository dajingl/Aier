/**
 * Created by zhangjie on 17-4-24.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text
} from 'react-native';
export default class MyDocuterInfo extends Component {
    render() {
        return (
            <View style={styles.page} >
                <View style={styles.img} >
                    <Image style={{width:60,height:60,}}  source={this.props.source}/>
                </View>
                <View style={styles.info}>
                    <Text style={styles.infoHead}>{this.props.name}</Text>
                    <Text style={styles.infoSubHead}>{this.props.job_title}</Text>
                    <Text style={styles.infoContent}>{this.props.introducation}</Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    page: {
        // activeOpacity:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        marginTop:1,
        backgroundColor:'#ffffff',
    },
    img:{
        flex: 1,
        paddingLeft:5
    },
    info:{
        flex:3,
        marginLeft:5
    },
    infoHead:{
        fontSize:15,
        fontWeight:'bold',
        color:'#444444'
    },
    infoSubHead:{
        fontSize:14,
        color:'#707070',
        marginVertical:3,
    },
    infoContent:{
        fontSize:12,
        color:'#838383',
        lineHeight:20
    }
});