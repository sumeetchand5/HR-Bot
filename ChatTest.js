import { AppLoading, Linking } from 'expo'
import React, { Component } from 'react'
import { StyleSheet, View, Text, Platform,ToastAndroid,AsyncStorage } from 'react-native'
import { Bubble, GiftedChat, SystemMessage } from 'react-native-gifted-chat'
import {Radio,Right,CheckBox} from 'native-base'
import CustomActions from './example-expo/CustomActions'
import CustomView from './example-expo/CustomView'
import NavBar from './example-expo/NavBar'
import messagesData from './example-expo/data/messages'
import HeaderIconExample from './Component/Header'
 import KeyboardSpacer from 'react-native-keyboard-spacer';
import  axios  from 'axios';
import registerForPushNotificationsAsync  from './Component/PushNotification'; 
import {Buffer} from 'buffer'; 

 

const styles = StyleSheet.create({
  container: { flex: 1 },
})

 

const filterBotMessages = message =>
  !message.system && message.user && message.user._id && message.user._id === 2
const findStep = step => message => message._id === step

const user = {
  _id: 1,
  name: 'Developer',
  avatar: 'https://facebook.github.io/react/img/logo_og.png',

}

const otherUser = {
  _id: 2,
  name: 'React Native',
  avatar: 'https://facebook.github.io/react/img/logo_og.png',
}

export default class App extends Component {
  state = {
    inverted: false,
    step: 0,
    text: '',
    messages: [],
    loadEarlier: true,
    typingText: null,
    isLoadingEarlier: false,
    checkboxState : true, 
    userContext : [{view_level : 0}], 
    emp_id : '', 
    man_id : '', 
    user : null, 
  }

  _isMounted = false

  async loadContext() {
    const userinfo = await AsyncStorage.getItem('userinfo');
    const userContext = JSON.parse(userinfo); 
    //alert(userContext[0].session_id);

    this.setState({userContext}); 
  }

   componentDidMount() {
    registerForPushNotificationsAsync();

    this.loadContext(); 

     this._isMounted = true
    // init with only system messages
    this.setState({
      messages: messagesData, // messagesData.filter(message => message.system),
      appIsReady: true,
    });


  }

  UNSAFE_componentWillUnmount() {
    this._isMounted = false
  }

  onLoadEarlier = () => {
    this.setState(previousState => {
      return {
        isLoadingEarlier: true,
      }
    })
  }
    
  onSend = (messages = []) => {
    this.setState({ typingText: "Typing..." });
    const step = this.state.step + 1
    this.setState(previousState => {
      const sentMessages = [{ ...messages[0], sent: true, received: true }]
      return {
        messages: GiftedChat.append(
          previousState.messages,
          sentMessages,
          Platform.OS !== 'web',
        ),
        step,
      }
    })
    // for demo purpose
    // setTimeout(() => this.botSend(step), Math.round(Math.random() * 1000))

    if(messages[0].image) {
      
    }; 


    if(this.state.userContext[0].view_level > 1) {
    if(this.state.checkboxState) {
      emp_id = this.state.userContext[0].emp_id.toString();
      man_id = "0"; 
    }
    else {
      emp_id = "0", 
      man_id = this.state.userContext[0].emp_id.toString()
    } 
  }
  else {
    emp_id = this.state.userContext[0].emp_id.toString();
    man_id = "0";
  }
if(!messages[0].text) {
  this.setState({ text : "File uploaded" })
  this.botSend(this.state.step,[]);
  return ;
}

 
    let message = messages[0].text;
      //axios.post("https://vodafonedialogflowclient.herokuapp.com/api/dfc",
      axios.post("http://192.168.43.73:3000/api/dfc",
      {
	
        "session_id": this.state.userContext[0].session_id,
        "token": this.state.userContext[0].token.toString(),
        "text": message,
        "emp_id" :  emp_id,
        "man_id" :  man_id, 
        "view_level" : this.state.userContext[0].view_level.toString()
      }
      ).then(res => {
        this.setState({ typingText: null });
        this.handleGoogleResponse(res);
        
      }).catch(err => {
        ToastAndroid.show("Something went wrong, please try again later",ToastAndroid.SHORT)


      })

  
      //setTimeout(() =>console.log('timing out'),5000)

    }
  

  handleGoogleResponse(res) {
 //for(i=0;i<10;i++) console.log(res.data); 
    if(!res.data.text) {
      let text = res.data
      this.setState({ text : text })
      this.botSend(this.state.step,[]);
    }
    else if (res.data.text.length > 1) {
      let textTransform = ' '
      res.data.text.forEach(val => {
        textTransform += val + '\n'; 
      });
      this.setState({ text : textTransform })
      this.botSend(this.state.step,res.data.quickReplies,res.data.image);
    }
    else {
      let text = res.data.text[0]
      this.setState({ text : text })
      this.botSend(this.state.step,res.data.quickReplies,res.data.image);
     }
  }

  botSend = (step = 0, quickReply=[],image=[]) => {
     let msg = 'Something Went Wrong'
    if(!quickReply.length) {
       msg = {
        _id: this.state.messages.length + 1,
        text: this.state.text,
        createdAt: new Date(),
       };
   }
   else if (image.length >=1 && this.state.userContext.length>=1){
    axios({method:'post',url:"http://192.168.43.73:3000/api/image",  responseType: 'arraybuffer',data : {
      "man_id": this.state.userContext[0].man_id.toString(),
      "emp_id": "0",
      "token" : this.state.userContext[0].token.toString(),
      "url" : image.toString(), 
   }  }
    )
     .then(resp => {
        for(let u=0;u<3;u++) console.log('Testing')
       // for(let u=0;u<1;u++) console.log(resp.data)
       //console.log(resp)
       imageT =  new Buffer(resp.data, 'binary').toString('base64'); 
       //console.log(imageT); 
       //this.onSendFromUser([{ image: imageT }]);

     let  imageMsg = {
        _id: this.state.messages.length + 1,
        text: this.state.text,
         createdAt: new Date(),
        user: 'TestIEP',
        image: 'data:image/png;base64,' + imageT ,
        quickReplies: {
          type: 'radio', // or 'checkbox',
          keepIt: true,
          values:  quickReply.map(val =>  obj = {title : val, value : val} )
        }
      };

       this.setState(previousState => ({
        messages: GiftedChat.append(
          previousState.messages,
          [imageMsg],
          Platform.OS !== 'web',
        ),
      }))
  
     }).catch(err=> {
       console.log(err);
       ToastAndroid.show("Something went wrong when fetching attachments",ToastAndroid.LONG)
     })
   }
   else {
    msg = {
      _id: this.state.messages.length + 1,
      text: this.state.text,
      createdAt: new Date(),
      user: 'TestIEP',
      quickReplies: {
        type: 'radio', // or 'checkbox',
        keepIt: true,
        values:  quickReply.map(val =>  obj = {title : val, value : val} )
      }
    };
   }

   /* 
  if(image.length >=1 && this.state.userContext.length>=1){
    for(let i=0;i <30;i++) console.log('herer'); 
    axios({method:'post',url:"http://192.168.43.73:3000/api/image",  responseType: 'arraybuffer',data : {
      "man_id": this.state.userContext[0].man_id.toString(),
      "emp_id": "0",
      "token" : this.state.userContext[0].token.toString(),
      "url" : image.toString(), 
   }  }
    )
     .then(resp => {
        for(let u=0;u<3;u++) console.log('Testing')
       // for(let u=0;u<1;u++) console.log(resp.data)
       //console.log(resp)
       imageT =  new Buffer(resp.data, 'binary').toString('base64'); 
       //console.log(imageT); 
       //this.onSendFromUser([{ image: imageT }]);
       this.setState(previousState => ({
        messages: GiftedChat.append(
          previousState.messages,
          [{ image: 'data:image/png;base64,' + imageT ,id_}],
          Platform.OS !== 'web',
        ),
      }))
  
     }).catch(err=> {
       ToastAndroid.show("Something went wrong when fetching attachments",ToastAndroid.LONG)
     })
  }
  */
  if (!image.length >=1){
  this.setState(previousState => ({
      messages: GiftedChat.append(
        previousState.messages,
        [msg],
        Platform.OS !== 'web',
      ),
    }))
  }

    

  //   console.log(this.state.messages); 
 

  }


  parsePatterns = linkStyle => {
    return [
      {
        pattern: /#(\w+)/,
        style: { textDecorationLine: 'underline', color: 'darkorange' },
        onPress: () => Linking.openURL('http://gifted.chat'),
      },
    ]
  }

  renderCustomView(props) {
    return <CustomView {...props} />
  }

  onReceive = text => {
    this.setState(previousState => {
      return {
        messages: GiftedChat.append(
          previousState.messages,
          {
            _id: Math.round(Math.random() * 1000000),
            text,
            createdAt: new Date(),
            user: otherUser,
          },
          Platform.OS !== 'web',
        ),
      }
    })
  }

  onSendFromUser = (messages = []) => {
    const createdAt = new Date()
    const messagesToUpload = messages.map(message => ({
      ...message,
      user,
      createdAt,
      _id: Math.round(Math.random() * 1000000),
    }))
    this.onSend(messagesToUpload)
  }

  renderAccessory = () => <AccessoryBar onSend={this.onSendFromUser} />

  renderCustomActions = props =>
    Platform.OS === 'web' ? null : (
      <CustomActions {...props} onSend={this.onSendFromUser}  setData = {data => {
        let text = data.text[0]
        this.setState({ text : text })
        this.botSend(this.state.step,data.quickReplies,data.image);
      }} />
    )

  renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          },
        }}
      />
    )
  }

  renderSystemMessage = props => {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    )
  }

  renderFooter = props => {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={{ backgroundColor: 'lightblue', color: 'white', fontSize: 15, height: 30, paddingTop: 5, paddingLeft: 10 }}>{this.state.typingText}</Text>
        </View>
      )
    }
    return null
  }

  onQuickReply = replies => {
    const createdAt = new Date()
    if (replies.length === 1) {
      this.onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies[0].title,
          user,
        },
      ])
    } else if (replies.length > 1) {
      this.onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies.map(reply => reply.title).join(', '),
          user,
        },
      ])
    } else {
      console.warn('replies param is not set correctly')
    }
  }

  renderQuickReplySend = () => <Text>{' custom send =>'}</Text>

  render() {

    
    if (!this.state.appIsReady) {
      return <AppLoading />
    }
    return (
      <View
        style={styles.container}
        accessible
        accessibilityLabel='main'
        testID='main'
      >
        <HeaderIconExample navigation={this.props.navigation} color='#1976d2' title={'Leave Bot'} />
        {this.state.userContext[0].view_level >1 ? <View style={{justifyContent:'flex-end',flexDirection:'row',marginTop:10,marginRight:25,backgroundColor:'lightBlue'}}>
              <Text style={{color:'black',fontWeight:'bold',fontSize:15,paddingRight:6,fontFamily:'Roboto'}}>Chat As Employee</Text>
              <CheckBox checked={this.state.checkboxState} color="#1976d2" onPress={() => {
                  if(this.state.checkboxState ) ToastAndroid.show("Chating as Manager now",ToastAndroid.LONG)
                  else ToastAndroid.show("Chating as Employee now",ToastAndroid.LONG)
                  this.setState({checkboxState:this.state.checkboxState ? false : true})

              }}/>
        </View> : <View/> }
               
        <GiftedChat
          messages={this.state.messages}
          onSend={this.onSend}
          loadEarlier={this.state.loadEarlier}
          onLoadEarlier={this.onLoadEarlier}
          isLoadingEarlier={this.state.isLoadingEarlier}
          parsePatterns={this.parsePatterns}
          user={user}
          scrollToBottom
          onQuickReply={this.onQuickReply}
          keyboardShouldPersistTaps='never'
          renderActions={this.renderCustomActions}
          renderBubble={this.renderBubble}
          renderFooter={this.renderFooter}
          renderSystemMessage={this.renderSystemMessage}
          renderCustomView={this.renderCustomView}
          quickReplyStyle={{ borderRadius: 15,backgroundColor:'#263238',textColor:'#ffffff',maxWidth:900,maxHeight:450 }}
          renderQuickReplySend={this.renderQuickReplySend}
          inverted={Platform.OS !== 'web'}
          timeTextStyle={{ left: { color: 'red' }, right: { color: 'yellow' } }}
        />
        <KeyboardSpacer />
      </View>
    )
  }
}
