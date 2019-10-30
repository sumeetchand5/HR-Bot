import React, { Component } from 'react';
import { View} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Dialogflow_V2 } from 'react-native-dialogflow';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {dialogflowConfig} from '../Config/env';
import HeaderIconExample from '../Component/Header';

class Bot extends Component {
    
    state = {
       messages : [
        {
            _id: 1,
            text: 'My message',
            "quickReplies":[
                {
                  "contentType":"text",
                  "title":"Yes",
                  "imageUrl":"http://example.com/img/yes.png"
                },
                {
                  "contentType":"text",
                  "title":"No",
                  "imageUrl":"http://example.com/img/no.png"
                }
              ],
              session : 'SESSION TEST'
          }],  
    }


    onQuickReply(quickReply) {
        if(quickReply.contentType === "text") {
              // send text message
              this.sendBotResponse(quickReply);
         } else if (quickReply.contentType === "location") {
             // send location
         } else if (quickReply.contentType === "camera") {
             // open camera then send video / image
         }
         // infinite possibilities
     }

    componentDidMount() {
        Dialogflow_V2.setConfiguration(
            dialogflowConfig.client_email,
            dialogflowConfig.private_key,
            Dialogflow_V2.LANG_ENGLISH_US,
            dialogflowConfig.project_id
        );
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }));

        let message = messages[0].text;
        Dialogflow_V2.requestQuery(
            message,
            result => this.handleGoogleResponse(result),
            error => console.log(error)
        );
    }

    handleGoogleResponse(result) {
       if ( result.queryResult.fulfillmentMessages[0].text.text.length > 1) {
        console.log("\n\n\n" , result)

        result.queryResult.fulfillmentMessages.text.text.forEach(val => {
            this.sendBotResponse(val); 
        }); 
    }
        else   {
            console.log("\n\n\n" , result)
        let text = result.queryResult.fulfillmentMessages[0].text.text[0];
        this.sendBotResponse(text);
        }
    }

    sendBotResponse(text) {
        let msg = {
            _id: this.state.messages.length + 1,
            text,
            createdAt: new Date(),
            user: 'TestIEP'
        };
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, [msg])
        }));
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <HeaderIconExample color ='#1976d2' title ={"Digital Assistant"} />
                <GiftedChat
                    loadEarlier 
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    onQuickReply={quickReply => this.onQuickReply(quickReply)}
                    user={{
                        _id: 1
                    }}
                />
                <KeyboardSpacer />
            </View>
         );
    }
}

export default Bot;