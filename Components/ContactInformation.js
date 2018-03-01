/**
 * Created by wangk on 17-4-25.
 */

import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    Button
} from 'react-native';

export default class ContactInformation extends React.Component {
    render() {
        return (
                <View style={styles.row}>
                    <Text style={styles.text}>{this.props.name}</Text>
                    <TextInput underlineColorAndroid="transparent" placeholder={this.props.placeholder}
                               onChangeText={this.props.onChangeText}    placeholderTextColor="#aaaaaa" style={styles.input} />
                </View>
        );
    }

    // render() {
    //     return (
    //         <View style={styles.page}>
    //             <View style={styles.row}>
    //                 <Text style={styles.text}>姓名</Text>
    //                 <TextInput underlineColorAndroid="transparent" placeholder="请输入联系人姓名"
    //                            placeholderTextColor="#aaa"  style={styles.input}  />
    //             </View>
    //             <View style={styles.row}>
    //                 <Text style={styles.text}>身份证</Text>
    //                 <TextInput underlineColorAndroid="transparent" placeholder="请输入身份证号"
    //                            placeholderTextColor="#aaa" style={styles.input} />
    //             </View>
    //             <View style={styles.row}>
    //                 <Text style={styles.text}>性别</Text>
    //                 <RadioGroup onSelect = {(index, value) => this.onSelect(index, value)}
    //                             style={styles.radio}>
    //                     <RadioButton value={'item1'} >
    //                         <Text>男</Text>
    //                     </RadioButton>
    //                     <RadioButton value={'item2'}>
    //                         <Text>女</Text>
    //                     </RadioButton>
    //                 </RadioGroup>
    //                 {/*<Text style={styles.text}></Text>*/}
    //             </View>
    //             <View style={styles.row}>
    //                 <Text style={styles.text}>联系电话</Text>
    //                 <TextInput underlineColorAndroid="transparent" placeholder="请输入联系电话"
    //                            placeholderTextColor="#aaaaaa" style={styles.input} />
    //             </View>
    //             <View style={styles.row}>
    //                 <Text style={styles.text}>地址</Text>
    //                 <TextInput underlineColorAndroid="transparent" placeholder="请输入地址"
    //                            placeholderTextColor="#aaaaaa" style={styles.input} />
    //             </View>
    //             <View style={styles.border}>
    //                 <Text>温馨提示</Text>
    //                 <Text>请您正确填写联系人信息，以便为您带来更优质的服务！</Text>
    //             </View>
    //             {/*// <View style={styles.but}>*/}
    //             {/*//     <Button title="保存" onPress={this._saveButtonClick.bind(this)}/>*/}
    //             {/*// </View>*/}
    //         </View>
    //     );
    // }
}

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    row: {
        flexDirection: 'row',
        alignItems:'center',
        paddingLeft: 16,
        marginTop:2,
        backgroundColor:'#ffffff'
    },
    text: {
        flex: 1,
        alignItems:'flex-start',
        fontSize: 14,
        color: '#444444'
    },
    input: {
        flex: 3,
    },
    radio:{
        flex: 3,
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    border:{
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'#dddddd',
        paddingTop: 11,
        paddingLeft: 4.5,
        paddingBottom: 11,
        marginTop: 4.5,
        marginLeft: 4.5,
        marginRight:4.5,
        marginBottom: 15
    },
    but: {
        marginLeft: 9,
        marginRight:9,
        paddingBottom: 10
    }

});