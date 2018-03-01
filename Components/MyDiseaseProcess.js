/**
 * Created by zhangjie on 17-4-25.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
} from 'react-native';
class Circle extends Component{
    render(){
        return(
            <View>
                <View  style={styles.text}>
                    <Image style={{width:22,height:22}} source={(this.props.source)?require('../images/icon_right_blue.png'):require('../images/circle.png')}/>
                    <Text>{this.props.title}</Text>
                </View>
            </View>
        )
    }
}
class Line extends Component{
    render(){
        return(
            <View>
                <View>
                    <Image source={require('../images/line.png')}/>
                </View>
            </View>
        )
    }
}
export default class MyDiseaseProcess extends Component {
    render(){
        return(
        <View  style={styles.page}>
            <Circle source={this.props.sourceOne} title={this.props.titleOne}/>
            <Line/>
            <Circle source={this.props.sourceTwo} title={this.props.titleTwo}/>
            <Line/>
            <Circle source={this.props.sourceThree} title={this.props.titleThree}/>
            <Line/>
            <Circle source={this.props.sourceFour} title={this.props.titleFour}/>
        </View>
        )
    }
}
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        justifyContent:'space-around',
        alignItems:'center',
        height:62,
        marginVertical:1,
        paddingHorizontal:8,
        backgroundColor:'#ffffff'
    },
    text:{
        flexDirection: 'column',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:16,
    }});