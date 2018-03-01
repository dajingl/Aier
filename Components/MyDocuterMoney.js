/**
 * Created by zhangjie on 17-4-24.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
Button
} from 'react-native';
export default class MyDocuterMoney extends Component {
    render() {
        return (
            <View  style={styles.page}>
                <View  style={styles.left}>
                    <Text style={styles.textHead}>加急预约</Text>
                    <Text style={styles.textSubHead}>提前预约享受更多优惠</Text>
                </View>
                <View  style={styles.center}>
                    <Text style={styles.textLine}>200元</Text>
                    <Text style={styles.textRed}>{this.props.price}</Text>
                </View>
                <View  style={styles.right}>
                    <TouchableOpacity onPress={this.props.onPress}>
                        <Text style={{fontSize:18,color:'#ffffff'}}>提交</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        marginTop: 1,
        backgroundColor:'#ffffff',
        height:50,
    },
    left:{
        flex:2,
        padding:5,
    },
    textHead:{
        fontSize:14,
    },
    textSubHead:{
        fontSize:12,
    },
    textLine:{
        fontSize:12,
        textAlign:'right',
        textDecorationLine:'line-through'
    },
    textRed:{
        fontSize:16,
        textAlign:'right',
        color:'#f36e6f'
    },
    center:{
        flex:1,
        padding:5,
        paddingRight:5,
    },
    right:{
        flex:1,
        backgroundColor:'#09a9ef',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});