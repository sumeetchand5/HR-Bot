import {View,Text} from "react-native";
import {Accordion, Content} from "native-base";
import React from "react";

 

const  Approved = ({approvedData}) => {
 return       <View style={{flex: 1, backgroundColor: '#f0f0f0'}}>
        <Text style={
      {
          textAlign: 'center',
          color: '#1b1b1b',
          fontWeight: 'bold',
          fontSize: 18, marginBottom: 10, marginTop: 15
      }
  }>Leave Status</Text>
      <Content style={{backgroundColor: '#ffffff', margin: 20, borderRadius: 15}}>
          <Accordion headerStyle={{height: 60, marginLeft: 20, marginRight: 20}}
                     iconStyle={{color: 'red'}} dataArray={approvedData}
                     contentStyle={{
                         flex: 1,
                         marginLeft: 30,
                         marginRight: 30,
                         backgroundColor: '#f8f8f8',
                         color: '#1b1b1b'
                     }} icon="add" expandedIcon="remove"/>
      </Content>
  </View>
 
}
  
export default Approved;