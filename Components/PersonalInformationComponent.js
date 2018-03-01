/**
 * Created by liuyang on 17-4-24.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    Button,
    TouchableWithoutFeedback
} from 'react-native';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
export default class PersonalInformationComponent extends React.Component {

    render() {
        return (
            <View>
                <RadioGroup
                    highlightColor='#ccc8b9'
                    onSelect = {this.props.onSelect}
                    style={styles.btn}
                >
                    <RadioButton value={'item1'} >
                        <Text>男</Text>
                    </RadioButton>

                    <RadioButton value={'item2'}>
                        <Text>女</Text>
                    </RadioButton>
                </RadioGroup>
            </View>

        );
    }
}
const styles = StyleSheet.create({
btn:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    alignItems: 'center',
    padding:5,
},

});
