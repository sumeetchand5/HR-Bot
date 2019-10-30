
import FAB from 'react-native-fab';
import React from 'react';
import 'babel-polyfill'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



const ChatbotFAB = ({navigation,colorFAB}) => <FAB buttonColor={colorFAB} iconTextColor="white" onClickAction={() => {
    navigation.navigate('Chatbot')
}} visible={true} iconTextComponent={<Icon name="robot"/>}/>

export default ChatbotFAB;