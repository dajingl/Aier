/**
 * Created by zhangjie on 17-4-24.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';

export default class MyDocuterSelect extends Component {
    constructor(){
        super();
        this.state = {
           isSelectOne:true,
           isSelectTwo:false,
        }
    }
    _onSelectLickOne(){
        this.setState({
            isSelectOne:true,
            isSelectTwo:false,
        });
    }
    _onSelectLickTwo(){
        this.setState({
            isSelectOne:false,
            isSelectTwo:true,
        });
    }
    render() {
        return (
        <View>
            <View  style={styles.selectAll}>
                {/*<View style={[styles.selectView,this.state.isSelectOne?{borderColor:'#09a9ef'}:{}]}>*/}
                <View style={[styles.selectView,(this.state.isSelectOne)?styles.isActiveBorder:styles.disActiveBorder]}>
                    <TouchableOpacity onPress={this._onSelectLickOne.bind(this)} activeOpacity={1}>
                        <Text style={(this.state.isSelectOne)?styles.isActiveText:{}}>{this.props.selectOne}</Text>
                    </TouchableOpacity>
                </View>
                <View style={[styles.selectView,(this.state.isSelectTwo)?styles.isActiveBorder:styles.disActiveBorder]}>
                    <TouchableOpacity onPress={this._onSelectLickTwo.bind(this)} activeOpacity={1}>
                        <Text  style={(this.state.isSelectTwo)?styles.isActiveText:{}}>{this.props.selectTwo}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.textContent}>
                <Text>{(this.state.isSelectOne)?(this.props.contentOne):(this.props.contentTwo)}</Text>
            </View>
        </View>

        )
    }
}
const styles = StyleSheet.create({
    selectAll:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:2,
        height:40,
        backgroundColor:'#ffffff',
    },
    selectView: {
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:2,

    },
    disActiveBorder:{
     borderColor:'#dddddd',
    },
    isActiveBorder:{
    borderColor:'#09a9ef',
    },
    isActiveText:{
        color:'#09a9ef',
    },
    textContent: {
        flexDirection:'row',
        backgroundColor:'#ffffff',
        padding:12,
    },
});