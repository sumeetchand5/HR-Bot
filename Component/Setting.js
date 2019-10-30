
import React from 'react'; 
import {View,ActivityIndicator} from 'react-native'; 
import { Button } from 'native-base';

const Setting = () => { 
    return    <View style={{flex: 1,backgroundColor:'white',alignItems: 'center', justifyContent: 'center'}}>
    <ActivityIndicator
    style={{position:'absolute'}} size="large" color="red"/>
    </View>
}

export default Setting; 