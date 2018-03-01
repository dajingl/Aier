import React from 'react';
import {
    AppRegistry,
    View,
    Text,
    TouchableHighlight,
    Navigator
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import LoginPage from './pages/LoginPage';
import Reset from './pages/Reset';
import Register from './pages/Register';
import ArLife from './pages/ArLife';
import ArClinic from './pages/ArClinic';
import Clinic from './pages/Clinic';
import PersonalNew from './pages/PersonalNew';
import PersonalInformation from './pages/PersonalInformation';
import MyAppointment from './pages/MyAppointment';
import MyService from './pages/MyService';
import AddContactPage from './pages/AddContactPage';
import FamilyContactPage from './pages/FamilyContactPage';
import ModifyContactPage from './pages/ModifyContactPage';
import ZhenShi from './pages/ZhenShi';
import DocuterInfo from './pages/DocuterInfo';
import DiseaseDescription from './pages/DiseaseDescription';
import PaymentPage from './pages/PaymentPage';
import FootNavigation from './pages/FootNavigation';
import BaiduMap from './pages/Map';
const AiEr = StackNavigator({
        LoginPage: {screen: LoginPage},
        FootNavigation: {screen: FootNavigation},
        Reset: {screen: Reset},
        Register: {screen: Register},
        ArLife: {screen: ArLife},
        ArClinic: {screen: ArClinic},
        Clinic: {screen: Clinic},
        PersonalNew: {screen: PersonalNew},
        MyAppointment: {screen: MyAppointment},
        PersonalInformation: {screen: PersonalInformation},
        MyService: {screen: MyService},
        FamilyContactPage:{screen:FamilyContactPage},
        AddContactPage:{screen:AddContactPage},
        ModifyContactPage:{screen:ModifyContactPage},

        ZhenShi: {screen: ZhenShi},
        DocuterInfo: {screen: DocuterInfo},
        DiseaseDescription: {screen: DiseaseDescription},
        BaiduMap:{screen: BaiduMap},
        PaymentPage:{screen:PaymentPage},

    },
    // {
    //     headerMode: 'none',
    // }
);
AppRegistry.registerComponent('AiEr', () => AiEr);