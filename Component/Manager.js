 import React, { Component } from 'react';
import HeaderIconExample from './Header'
import ChatbotFAB from '../Component/ChatbotFAB'; 
import {Tabs,Tab} from 'native-base' 
import ManagerPendingTab from './ManagerPending'
import ManagerRemainingTab from './ManagerRemaining'; 
import ManagerCurrentTab from './ManagerCurrent'; 
import ManagerHistoryTab from './ManagerHistory'; 
 
import {
  View,
} from 'react-native';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
 
  render() {

    return (
      <View style={{flex:1}}> 
        <HeaderIconExample navigation = {this.props.navigation} color='#03a9f4' title ={'Employee Data'} /> 

        <Tabs tabBarUnderlineStyle={{borderBottomWidth:0}}>
          <Tab tabStyle={{backgroundColor : 'white',}} textStyle={{color:'#616161',fontWeight:'bold'}}  activeTextStyle={{color: '#1976d2', fontWeight: 'bold'}}  activeTabStyle={{backgroundColor: '#eeeeee', color: 'black',fontWeight:'bold'}} heading="History">
              <ManagerHistoryTab/> 
          </Tab>
          <Tab tabStyle={{backgroundColor : 'white',color:'black'}}  textStyle={{color:'#616161', fontWeight:'bold'}}  activeTextStyle={{color: '#1976d2', fontWeight: 'bold'}}  activeTabStyle={{backgroundColor: '#eeeeee', color: 'black',fontWeight:'bold'}}  heading="Pending">
              <ManagerPendingTab/> 
           </Tab> 
          <Tab tabStyle={{backgroundColor : 'white',color:'black'}} textStyle={{color:'#616161',fontWeight:'bold'}}   activeTextStyle={{color: '#1976d2', fontWeight: 'bold'}}  activeTabStyle={{backgroundColor: '#eeeeee', color: 'black',fontWeight:'bold'}} heading = 'Approved'>
              <ManagerCurrentTab/> 
          </Tab>
           <Tab tabStyle={{backgroundColor : 'white',color:'black'}} textStyle={{color:'#616161',fontWeight:'bold'}}  activeTextStyle={{color: '#1976d2', fontWeight: 'bold'}}  activeTabStyle={{backgroundColor: '#eeeeee', color: 'black',fontWeight:'bold'}} heading="Remaining">
              <ManagerRemainingTab/> 
           </Tab>
        </Tabs>
         
      <ChatbotFAB colorFAB='#03a9f4' navigation = {this.props.navigation} />
       
      </View> 
      ) 
  }
}




 