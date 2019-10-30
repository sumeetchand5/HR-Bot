import React, { Component } from 'react';
import {Text} from 'react-native';
import {Footer, FooterTab, Button, Icon } from 'native-base';

export default class FooterTabsIconTextExample extends Component {
    render() {
        return (
                 <Footer>
                    <FooterTab style={{backgroundColor:"#ffff"}}>
                        <Button  vertical>
                            <Icon style={{color : 'red'}}  name="apps" />
                            <Text style={{color : 'black'}}>Home</Text>
                        </Button>
                        <Button  vertical>
                            <Icon style={{color : 'red'}} name="person" />
                            <Text style={{color : 'black'}}>Manage</Text>
                        </Button>
                        <Button vertical>
                            <Icon style={{color : 'red'}}  active name="navigate" />
                            <Text style={{color : 'black'}} >ChatBot</Text>
                        </Button>
                        <Button vertical>
                            <Icon style={{color : 'red'}}  name="person" />
                            <Text style={{color : 'black'}}>Setting</Text>
                        </Button>
                    </FooterTab>
                </Footer>
         );
    }
}