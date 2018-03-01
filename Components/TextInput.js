/**
 * Created by zhangjie on 17-4-21.
 */
/**
 * http://www.bigbug.tech
 * Created by 陈冬明 on 20/04/2017.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

export default class MyTextInput extends Component {
    render() {
        return (
            <View  style={styles.page}>
                <View style={styles.icon}>
                    <Image source={this.props.source}/></View>
                <View style={this.props.value?styles.inputRight:styles.input}>
                    <TextInput onChangeText={this.props.onChangeText} placeholder={this.props.placeholder}/>
                </View>
                {this.props.value?<TouchableOpacity onPress={this.props.onpress} style={styles.text}><Text style={{color:'black',textAlign:'right'}}>{this.props.value}</Text></TouchableOpacity>:null}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        padding: '3%',
    },
    input: {
        flex: 9,
        height: 45,
    },
    icon:{
        flex: 1,
    },
    inputRight: {
        flex: 5,
        height: 45,
    },
    text: {
        flex: 4,
        paddingTop:13
    }
});

