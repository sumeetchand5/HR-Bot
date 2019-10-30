import React from 'react';
import {View, Settings,ToastAndroid,AsyncStorage} from 'react-native';
import {createAppContainer} from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import {Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './Component/Home'
import Chat_bot from './Component/chatbot'
import Manager from './Component/Manager';
import Setting from './Component/Setting' ; 
import ChatTest from './ChatTest'; 
import LoginScreen from './Component/LoginScreen'; 
import ManagerCurrentpending from './Component/ManagerCurrent'; 


 // return <Home navigation = {this.props.navigation}/>


class HomeScreen extends React.Component {
    render() {
        Text.defaultProps = Text.defaultProps || {};
        Text.defaultProps.allowFontScaling = false;
        return <Home   navigation = {this.props.navigation}/>
    }
}

class ChatbotScreen extends React.Component {
    render() {
        return <ChatTest  navigation = {this.props.navigation}/>
    }
}


class ManagerScreen extends React.Component {
    render() {
        return <Manager navigation = {this.props.navigation} />
    }
}

class SettingScreen extends React.Component {
       render() {
        return <Setting  navigation = {this.props.navigation}/>
    }
}

export default createAppContainer(createMaterialBottomTabNavigator({
        Home: { screen: HomeScreen,
            navigationOptions:{
                tabBarLabel:'Home',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-home'}/>
                    </View>),
                barStyle: { backgroundColor: '#f63631' },

            }
        },
        Manage: { screen: ManagerScreen,
            navigationOptions:{
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-person'}/>
                    </View>),
                activeColor: '#f60c0d',
                inactiveColor: '#f65a22',
                tabBarOnPress : (({navigation,defaultHandler})=> {
                    AsyncStorage.getItem('userinfo').then(userinfo => {
                        const userContext = JSON.parse(userinfo); 
                        if(userContext[0].position== 'Employee')
                        ToastAndroid.show("Not Accessible",ToastAndroid.SHORT) 
                         else defaultHandler(); 
                    }).catch(err=>err);
                   
 
                }),
                 barStyle: { backgroundColor: '#03a9f4' },
            }
        },
        Chatbot: { screen: ChatbotScreen,
            navigationOptions:{
                tabBarLabel:'Chatbot',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-chatboxes'}/>
                    </View>),
                activeColor: '#ffffff',
                inactiveColor: '#ffffff',
                barStyle: { backgroundColor: '#1976d2' },
            }
        },
        Setting: {
            screen: SettingScreen,
            navigationOptions:{
                tabBarLabel:'Setting',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-settings'}/>
                    </View>),
            }
        },
    },
    {
        initialRouteName: "Home",
        activeColor: '#f0edf6',
        inactiveColor: '#226557',
        barStyle: { backgroundColor: '#e0e0e0' },
    },
));


 