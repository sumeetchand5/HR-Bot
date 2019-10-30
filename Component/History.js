import {Text, View} from "react-native";
import {Accordion, Content} from "native-base";
import React from "react";


export default class History extends React.Component {
    _renderContent(item) {
        return (
                   <Text
                       style={{
                           backgroundColor: "rgba(255,137,148,0.65)",
                           padding: 20,
                           paddingLeft :40,
                         }}
                   >
                       {item.content}
                   </Text>
        );
    }; 

    render () { 
        return <View style={{flex: 1, backgroundColor: '#f0f0f0'}}>
        <Text style={
            {
                textAlign: 'center',
                 fontWeight: 'bold',
                fontSize: 18, marginBottom: 10, marginTop: 15
            }
        }>Leave History</Text>
        <Content style={{backgroundColor: '#ffffff', margin: 20, borderRadius: 15}}>
            <Accordion headerStyle={{height: 60, marginLeft: 20, marginRight: 20}}
                       iconStyle={{color: 'red'}} renderContent={this._renderContent} dataArray={this.props.dataArray}
                       contentStyle={{
                           flex: 1,
                           marginLeft: 30,
                           marginRight: 30,
                           backgroundColor: '#ffff',
                           color: 'black'
                       }} icon="add" expandedIcon="remove"/>
        </Content>
    </View>
    }
}


 /*
    backgroundColor: '#f8f8f8',
                           color: '#1b1b1b'
 */ 