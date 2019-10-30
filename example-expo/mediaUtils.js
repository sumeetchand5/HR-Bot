import { Linking } from 'expo'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import axios from 'axios';

import { Alert,ToastAndroid } from 'react-native'

export default async function getPermissionAsync(permission) {
  const { status } = await Permissions.askAsync(permission)
  if (status !== 'granted') {
    const permissionName = permission.toLowerCase().replace('_', ' ')
    Alert.alert(
      'Cannot be done ',
      `If you would like to use this feature, you'll need to enable the ${permissionName} permission in your phone settings.`,
      [
        {
          text: "starting",
          onPress: () => Linking.openURL('app-settings:'),
        },
        { text: 'Nevermind', onPress: () => {}, style: 'cancel' },
      ],
      { cancelable: true },
    )

    return false
  }
  return true
}

export async function getLocationAsync(onSend) {
  if (await getPermissionAsync(Permissions.LOCATION)) {
    const location = await Location.getCurrentPositionAsync({})
    if (location) {
      onSend([{ location: location.coords }])
    }
  }
}

export async function pickImageAsync(onSend,man_id,emp_id,view_level,token,session_id,setData) {
  if (await getPermissionAsync(Permissions.CAMERA_ROLL)) {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    })

    responseData = ' '; 
    if (!result.cancelled) {
      ToastAndroid.show("File is being uploaded",ToastAndroid.LONG)


      var form = new FormData();
      form.append("emp_id", emp_id.toString());
      form.append("man_id", "0");
      form.append("session_id", session_id.toString());
      form.append("token", token.toString());
      form.append("view_level", view_level.toString());
      form.append("image", {type: "image/*", name: "image", uri:result.uri});

      try {
      let response = await fetch('http://192.168.43.273:3000/api/dfc', {
        method: 'post',
        headers:{
          'Accept': 'application/json',
          'content-type': 'multipart/form-data'
        },
        body: form
      })

      let data = await response.json()
      onSend([{ image: result.uri }]);
      setData(data); 

      return data;

    }catch(err) {
      ToastAndroid.show("Something went wrong, please try again later",ToastAndroid.LONG)

    }




    }
  }
}

export async function takePictureAsync(onSend) {
  if (await getPermissionAsync(Permissions.CAMERA)) {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
    })

    if (!result.cancelled) {
      let apiUrl = 'https://kind-impala-69.localtunnel.me/dfc';

      // Note:
      // Uncomment this if you want to experiment with local server
      //
      // if (Constants.isDevice) {
      //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
      // } else {
      //   apiUrl = `http://localhost:3000/upload`
      // }
      let uri = result.uri; 
      let uriParts = uri.split('.');
      let fileType = uriParts[uriParts.length - 1];
    
      let formData = new FormData();
      formData.append('image', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    
      let options = {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryIn312MOjBWdkffIM',
        },
        
      };
    
      try {
      let response  = await fetch(apiUrl, options);
       }catch(ex) {
        alert(ex); 
      }









/* 
      let uriParts = (result.uri).split(',');
      let fileType = uriParts[uriParts.length - 1];
      alert(JSON.stringify(result))
    
      let formData = new FormData();

      formData.append('image', {
        uri : result.uri,
        filename: `photo.${fileType}`,
        type: "image",
      });
 
      let res = await fetch('https:///wise-monkey-45.localtunnel.me/dfc'
      , {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Accept': 'application/json',
          'Content-Type':  `multipart/form-data; boundary=${formData._boundary}`,
        }  
      })
    */ 
    // let res = await fetch('https://tricky-penguin-11.localtunnel.me/dfc',options)

    //ToastAndroid.show("File is being uploaded",ToastAndroid.LONG)
    ToastAndroid.show("File is being uploaded",ToastAndroid.LONG)

    onSend([{ image: result.uri }])

      return 'test'; 
    }
  }
}
