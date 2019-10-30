import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import {ToastAndroid,AsyncStorage} from 'react-native'
import axios from 'axios'; 

const PUSH_ENDPOINT = 'https://vodafoneleaveapi.herokuapp.com/api/setexpoid';

export default async function registerForPushNotificationsAsync() {
  const userinfo = await AsyncStorage.getItem('userinfo');
    const userContext = JSON.parse(userinfo); 
  try {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;


  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();
 
  axios.post(PUSH_ENDPOINT,
    {"token" : userContext[0].token.toString(),
     "man_id" : "0", 
     "emp_id" : userContext[0].emp_id.toString(),
     "expo_id" : token.toString()
  
  }).then(res=>console.log("Okay Expo Id")).catch(err=>console.log('Not Okay Expo Id'));

 


 }catch(err) {
  ToastAndroid.show("Something went wrong while checking permissions",ToastAndroid.SHORT)
}
}