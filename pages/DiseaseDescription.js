/**
 * Created by zhangjie on 17-4-25.
 */
import React,{Component} from 'react';
import {
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity,
    Picker,
    View,
    Text,
    ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import MyDiseaseProcess from '../Components/MyDiseaseProcess';
// import MyDiseaseForm from '../Components/MyDiseaseForm';
import MyButtonInput from '../Components/ButtonInput';
import {rootURL} from '../Components/RootURL';
class Title extends Component{
    render() {
        return (
            <View style={styles.title}>
                <Text style={{color:'#000000'}}>{this.props.title}</Text>
            </View>
        )
    }
}
export default class DiseaseDescription extends Component {
    static navigationOptions = {
        title: '病情描述',
    };
    constructor(){
        super()
        this.state={
            avatarSource:null,
            getPerson:null,
            patient_id:'',
            data:[],
            patient_condition:'',
            imageUri:''
        }
    }
    componentDidMount() {
        this._refreshData(token,userId);
    }
    _refreshData(token,normal_user_id) {
        let URL="/api/patient/normal_user.json"
        fetch(rootURL+URL+'?token='+token+'&normal_user_id='+normal_user_id, {
            method: 'GET'
        }).then((response) => {
            return response.json()
        }).then((responseJson) => {
            console.log(responseJson.result);
            this.setState({
                data: responseJson.result.slice(1),
                getPerson:responseJson.result[1].id
            });
        }).catch((error) => {
            console.error(error);
        });
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
                console.log(response.uri)
                this.setState({
                    avatarSource: source,
                    imageUri:response.uri
                });
            }
        });
    }
    _getPerson(value){
        alert(value+'---')
        this.setState({getPerson:value})
    }
    _submit(){
        if (this.state.imageUri) {
            let formData = new FormData();
            let file = {uri: this.state.imageUri, type: 'multipart/form-data', name: 'a.jpg'};
            formData.append("patient_condition_image", file);
            // console.log(formData)
            const {params} = this.props.navigation.state;
            // console.log('token'+token+'normal_user_id--'+userId+'doctor_id--'
            //     +doctor_id+"doctor_work_address_id--"+address_id+'appointment_time-'+appointment_time)
            // console.log('time_type--'+params.time_type)
            // console.log('patient_id--'+this.state.getPerson)
            let URL = "/api/appointment_order/create.json"
            fetch(rootURL + URL + '?token=' + token
                + '&normal_user_id=' + userId
                + '&doctor_id=' + doctor_id
                + '&time_type=' + params.time_type
                + '&patient_id=' + this.state.getPerson
                + '&doctor_work_address_id=' + address_id
                + '&appointment_time=' + appointment_time
                + '&patient_condition=' + this.state.patient_condition
                , {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    body: formData
                }).then((response) => {
                return response.json()
            }).then((responseJson) => {
                console.log(responseJson)
                if (responseJson.success) {
                    alert('预约成功')
                    this.props.navigation.navigate('PaymentPage', {data: responseJson.result});
                } else {
                    alert(responseJson.error.message)
                }
            }).catch((error) => {
                console.error(error);
            });
        } else {
            alert('请选择相片')
        }
    }
    _onChangeText(text){
        this.setState({
            patient_condition:text
        })
    }
    render(){
        const {params} = this.props.navigation.state;
        return(
            <ScrollView>
                <MyDiseaseProcess titleOne='病情描述' sourceOne={true}
                                  titleTwo='支付' sourceTwo={false}
                                  titleThree='平台确认' sourceThree={false}
                                  titleFour='医院就诊' sourceFour={false}/>
                {/*<MyDiseaseForm name={params.name+' '+appointment_time}/>*/}
                <View  style={styles.page}>
                    <View  style={styles.content}>
                        <Text style={{padding:7}}>{params.name+' '+appointment_time}</Text>
                        <Title title="病情描述"/>
                        <TextInput
                            onChangeText={(text)=>this._onChangeText(text)}
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
                            {<Image source={this.state.avatarSource} style={{width:100,height:100}}/>}
                        </View>
                        <Title title="就诊人"/>
                        <View>
                            <Picker
                                selectedValue={this.state.getPerson}
                                onValueChange={(value)=>this._getPerson(value)}
                            >
                                {this.state.data.map((item) => {
                                    return(<Picker.Item label={item.name} value={item.id} key={item.id}/>)})
                                }
                            </Picker>
                        </View>

                    </View>
                </View>



                <View style={{backgroundColor:'#ffffff',marginVertical:1,paddingHorizontal:15,paddingVertical:7}}>
                    <MyButtonInput title='提交预约单' onPress={this._submit.bind(this)}/>
                </View>
                <View style={styles.tips}>
                    <View style={styles.tipsContent}>
                    <Text style={styles.tipsTitle}>温馨提示 {'\n'} 温馨提示温馨提示温馨提示温馨提
                        示温馨提示温馨提示温馨提示温馨提示温馨提示温馨提示温馨提示温馨提示温馨提示温
                        馨提示温馨提示{'\n'}温馨提示温馨提示温馨提示温馨提示温馨提示温馨提示温馨提示
                        温馨提示温馨提示温馨提示温馨提示温馨提示温馨提示温馨提示温馨提示温馨提示温馨
                        提示</Text>

                    </View>
                </View>
            </ScrollView>
        )
}}
const styles = StyleSheet.create({
    tips: {
        marginVertical:1,
        backgroundColor:'#ffffff',
    },
    tipsContent:{
        borderWidth:1,
        margin:20,
        borderColor:'#dddddd',
        padding:5
    },
    tipsTitle:{
        lineHeight:24,
    },
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
    }

})