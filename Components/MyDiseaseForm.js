/**
 * Created by zhangjie on 17-4-25.
 */

import React,{Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    Picker,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
class Title extends Component{
    render() {
        return (
            <View style={styles.title}>
                <Text style={{color:'#000000'}}>{this.props.title}</Text>
            </View>
        )
    }
}
export default class MyDiseaseForm extends Component {
    constructor(){
        super()
        this.state={
            avatarSource:null
        }
        this.state = {
            language:null
        };
    }
    _options = {
        title: '请选择',
        cancelButtonTitle:'取消',
        takePhotoButtonTitle:'拍照',
        chooseFromLibraryButtonTitle:'选择相册',
        quality:0.75,
        allowsEditing:true,
        noData:false,
        storageOptions: {
            skipBackup: true,
            path: 'images'
        }
    };
    _getImage(options){
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };
                this.setState({
                    avatarSource: source
                });
            }
        });
    }
    _getPerson(value,position){
        alert(value+'---'+position)
        this.setState({language:value})
    }
    render(){
        return(
            <View  style={styles.page}>
                <View  style={styles.content}>
                    <Text style={{padding:7}}>{this.props.name}</Text>
                    <Title title="病情描述"/>
                    <TextInput
                        multiline={true}
                        style={{height:70,}}
                        placeholder=' 请描述病请'
                        underlineColorAndroid="transparent"
                    />
                    <Title title="病情图片"/>
                    <TouchableOpacity  style={[styles.imgButton,{paddingHorizontal:7,paddingVertical:15}]} onPress={()=>this._getImage(this._options)}>
                        <Text>请选择图片</Text>
                        <Image source={require('../images/icon_common_rightarrow.png')} style={{width:18,height:18}}/>
                    </TouchableOpacity>
                    <View >
                        {this.state.avatarSource=null?null:<Image source={this.state.avatarSource} style={{width:100,height:100}}/>}
                    </View>
                    <Title title="就诊人"/>
                    <View>
                        <Picker
                            selectedValue={this.state.language}
                            onValueChange={(value,position)=>this._getPerson(value,position)}
                            mode="dialog"
                            style={{color:'#707070'}}
                        >
                            <Picker.Item label="Java" value="Java"/>
                            <Picker.Item label="JavaScript" value="js"/>
                            <Picker.Item label="C语音" value="c"/>
                            <Picker.Item label="PHP开发" value="php"/>
                        </Picker>
                    </View>

                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    page: {
        marginVertical:1,
        backgroundColor:'#ffffff',
    },
    content:{
        borderWidth:1,
        margin:20,
        borderColor:'#dddddd',
    },
    imgButton:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    center:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
    },
    title:{
        borderBottomWidth:1,
        borderTopWidth:1,
        borderColor:'#dddddd',
        padding:5,
    }});