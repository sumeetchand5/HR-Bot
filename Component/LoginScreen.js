import React from "react";
import { ImageBackground,ScrollView, StyleSheet, Image, View, TextInput,ActivityIndicator, KeyboardAvoidingView,Text, TouchableOpacity,AsyncStorage,ToastAndroid } from "react-native";
import axios from 'axios'
import uuid from 'uuid'; 
import KeyboardSpacer from 'react-native-keyboard-spacer';


class LoginScreen extends React.Component {

  state = {
    username : '',
    password : '', 
    authenticating : false
  }

  _onPressButton1() {
    alert('Please check your email from Manager regarding your login information')
  }
  _onPressButton() {
    this.props.navigation.navigate('App');} 

    _signInAsync = async (res,userToken) => {
       res[0]['token'] = userToken; 
       res[0]['session_id'] = uuid.v4();
 
       await AsyncStorage.setItem('userinfo', JSON.stringify(res).toString());
       this.setState({authenticating:false}); 

       this.props.navigation.navigate('Chat');
    };
    

    renderLoginButton() {
      if (this.state.authenticating) return <ActivityIndicator
       size="large" color="white"/> 
      
      return <Text style={s.logintxt}>Login</Text>
      
    }

  render() {
    return (
      <ImageBackground source={require('../assets/background.png')} style={s.backgroundImage} >
      <View>
        <Image
            source={require('../assets/logo.png')}
            style={s.logo}
            resizeMode="contain"
          />
        <Text style={s.slogan}>The future is exciting. Ready?</Text>
   

       < KeyboardAvoidingView keyboardVerticalOffset={-500} behavior="padding"> 
           <TextInput placeholder="Employee id" placeholderColor="#c4c3cb" style={s.loginFormTextInput} 
         onChangeText={(text) => this.setState({username:text})}
          value={this.state.username} />
        <TextInput  onChangeText={(text) => this.setState({password:text})}
          value={this.state.password}   placeholder="Password" placeholderColor="#c4c3cb" style={s.loginFormTextInput} secureTextEntry={true}/>
  
</KeyboardAvoidingView>
<Text style={s.slogan}>   </Text>
  
        <TouchableOpacity style={s.login}onPress={() =>{
          if(!this.state.username || !this.state.password) {
            ToastAndroid.show("Please provide both username and password",ToastAndroid.LONG)
            return ;
          }  
          
          this.setState({authenticating:true}); 

          empid = this.state.username.toString(),
          password = this.state.password.toString()
          
          if(empid==1  && password==1 ) {
            empid = '240', 
            password = 'RBfq5r'
          }

          if(empid==2  && password==2 ) {
            empid = '456', 
            password = 'Oz2fwp'
          }
          

          //axios.post('https://vodafoneleaveapi.herokuapp.com/api/login',{
            axios.post('http://192.168.43.73:3000/api/login',{
            "emp_id" : empid, 
            "password" : password
          }).then( (res) => {
            token = res.data; 
              axios.post('http://192.168.43.73:3000/api/me',{
                "token" : token ,
                "man_id" : "0",
                "emp_id" : empid
              }).then(resp => {
                this._signInAsync(resp.data,token).then(res=> 1).catch(err=>err)
              }).catch(err => {
                this.setState({authenticating:false}); 
                ToastAndroid.show("Something went wrong while getting user data",ToastAndroid.LONG)
              })
        }).catch(error => {
            if(error == 401) {
            ToastAndroid.show("Provided credentials are invalid",ToastAndroid.LONG); 
            this.setState({username:'',password:'',authenticating:false})
            return ;
           }
       

          ToastAndroid.show("Something went wrong while authenticating",ToastAndroid.LONG)
          this.setState({authenticating:false}); 

        })
        }}>
       

        {this.renderLoginButton()}

        </TouchableOpacity>

      </View>

      </ImageBackground>
    );
  }
}

const s = StyleSheet.create({
backgroundImage: {
  flex: 1,
  width: '100%',
  height: '100%',
},
logo: {
    width: 250,
     height: 250,
     marginLeft: '16%',
     marginTop: '0%',
     justifyContent: 'center'
},
slogan: {
  fontSize: 23, 
  color: 'white', 
  height: 40, 
  marginLeft: '7%', 
  marginTop: '-8%', 
  width: '100%', 
  justifyContent: "space-between",
  padding: 1

},
loginFormTextInput: {
  height: 45,
  fontSize: 17,
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#eaeaea',
  backgroundColor: 'white',
  paddingLeft: 10,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 10,
  marginBottom: 5
},
login: {
  marginTop: 25,
  marginLeft: '36%',
  height: 35,
  width: 110,
  borderRadius: 10,
  justifyContent: 'center',
  backgroundColor: '#0457fb',
},
fpw: {
  marginTop: 25,
  marginLeft: '29%',
  height: 35,
  width: 200,
  borderRadius: 10
},
logintxt: {
  fontStyle: 'normal',
  fontSize: 19,
  color: 'white',
  paddingLeft: 15,
  marginLeft: 17,
  marginRight: 15,
  marginTop: 10,
  marginBottom: 10
},
fpwtxt: {
  fontStyle: 'normal',
  fontSize: 15,
  color: 'white',
  paddingLeft: 10,
  marginLeft: 15,
  marginRight: 15,
  marginTop: 8,
  marginBottom: 5
}
});

export default LoginScreen;
