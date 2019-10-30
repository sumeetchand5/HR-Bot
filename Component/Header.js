import React, {Component} from 'react';
import { Header, Left, Right, Button, Title, Text,Body} from 'native-base';
import {Root} from "native-base";
import { AppLoading} from "expo";
import * as Font from 'expo-font';


export default class HeaderIconExample extends Component {
    state = {loading: true};

    async componentWillMount() {
        await Font.loadAsync({
            Roboto: require("C:/Developer/testd/vodafone_leave_bot/node_modules/native-base/Fonts/Roboto.ttf"),
            Roboto_medium: require("C:/Developer/testd/vodafone_leave_bot/node_modules/native-base/Fonts/Roboto_medium.ttf")
        });
        this.setState({loading: false});
    }

    render() {
        if (this.state.loading) {
            return (
                <Root>
                    <AppLoading/>
                </Root>
            );
        }  

       let bcolor = this.props.color ? this.props.color : '#f63631'; 
       return (
        
          <Header style={{backgroundColor:bcolor,marginTop:23,}}>
            <Left style={{marginLeft:-55}}/>
              <Body>
                 <Title>{this.props.title}</Title>
              </Body>
            <Right>
                <Button transparent onPress={()=>this.props.navigation.navigate('Auth')}>
                  <Text>Sign Out</Text>
                </Button>
          </Right>
          </Header>
      );
    }




    
}