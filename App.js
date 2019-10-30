import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Dashboard from "./Home";
import LoginScreen from './Component/LoginScreen'; 
 import current from './Component/ManagerHistory';

import chat from './ChatTest'; 
import home from './Home'


// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.

const AppStack = createStackNavigator ({
    Home: {
        screen: LoginScreen, 
        navigationOptions: {
            header: null,
        },
    },
})

const AuthStack = createStackNavigator ({
    Login: {
        screen: LoginScreen, 
        navigationOptions: {
            header: null,
        },
    },
})


export default createAppContainer(
    createSwitchNavigator(
      {
         Auth: AuthStack,
         Home: {
            screen: home, 
            navigationOptions: {
                header: null,
            },
        },
        Chat: {
            screen: chat, 
            navigationOptions: {
                header: null,
            },
        },
      },
      {
        initialRouteName: 'Auth',
      }
    )
  );



/* import React from "react";
import Dash from "./Login";
import LoginScreen from './Component/LoginScreen'; 


export default class App extends React.Component {
    
  render() {
    if(1) {
    return <Dash />;
    }
    return <LoginScreen/>; 
  }
}*/ 




















/* import React from 'react';
import {View} from 'react-native';
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
 // return <Home navigation = {this.props.navigation}/>


class HomeScreen extends React.Component {
    render() {
        Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
        return <Manager   navigation = {this.props.navigation}/>
    }
}

class ChatbotScreen extends React.Component {
    render() {
        return <ChatTest/>
    }
}


class ManagerScreen extends React.Component {
    render() {
        return <Manager navigation = {this.props.navigation} />
    }
}

class SettingScreen extends React.Component {
       render() {
        return <LoginScreen/>
    }
}

const TabNavigator = createMaterialBottomTabNavigator({
        Login: { screen: HomeScreen,
            navigationOptions:{
                tabBarLabel:'Login',
                tabBarIcon: ({ tintColor }) => (
                    <View>
                        <Icon style={[{color: tintColor}]} size={25} name={'ios-home'}/>
                    </View>),
                barStyle: { backgroundColor: '#f63631' },

            }
        },
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
);


export default createAppContainer(TabNavigator);
*/ 