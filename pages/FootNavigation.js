/**
 * Created by LiuQiang on 2017/4/25.
 */
import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    Button,
    Image
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import ArLife from './ArLife';
import PersonalNew from './PersonalNew';
import MyService from './MyService';
export default class FootNavigation extends React.Component {
    static navigationOptions = {
        title: '爱尔生活',
    };
    constructor(props) {
        super(props);
        this.state = {selectedTab:'首页'};
    }
    render() {
        // const {params} = this.props.navigation.state;//params.token
        return (
            <View  style={{flex:1}}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab ==='首页'}
                        title="首页"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require("../images/ic_nor_home.png")} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require("../images/ic_press_home.png")} />}
                        onPress={() => this.setState({ selectedTab:'首页' })}>
                        {/*<ArLife token={params.token} {...this.props}/>*/}
                        <ArLife {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab ==='我的服务'}
                        title="我的服务"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require("../images/ic_nor_service.png")} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require("../images/ic_press_service.png")} />}
                        onPress={() => this.setState({ selectedTab:'我的服务' })}>
                        <MyService {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab ==='个人中心'}
                        title="个人中心"
                        titleStyle={styles.tabText}
                        selectedTitleStyle={styles.selectedTabText}
                        renderIcon={() => <Image style={styles.icon} source={require("../images/ic_nor_me.png")} />}
                        renderSelectedIcon={() => <Image style={styles.icon} source={require("../images/ic_press_me.png")} />}
                        onPress={() => this.setState({ selectedTab:'个人中心' })}
                    >
                        <PersonalNew {...this.props}/>
                    </TabNavigator.Item>

                </TabNavigator>
            </View >
        )
    }
};

const styles = StyleSheet.create({
    tabText: {
        color: "#000000",
        fontSize: 10
    },
    selectedTabText: {
        color: "#999999",
        fontSize: 10
    },
    icon: {
        width: 30,
        height: 30
    }
})