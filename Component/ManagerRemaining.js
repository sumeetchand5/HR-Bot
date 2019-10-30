import React, { Component } from 'react';
import ChatbotFAB from '../Component/ChatbotFAB'; 
import {Dropdown} from 'react-native-material-dropdown'; 
import {Input,Icon,Tabs,Tab,Button,List,ListItem} from 'native-base'
import Autocomplete from 'react-native-autocomplete-input'; 
import axios from 'axios'; 
 import {ScrollView, Dimensions, View,StatusBar, ActivityIndicator,Image,AsyncStorage,ToastAndroid} from 'react-native'; 
import ScrollableTabView from 'react-native-scrollable-tab-view'; 
import {chartConfigs} from '../Config/env'; 
import {ProgressChart} from "react-native-chart-kit";
 

import {
  Text,
   StyleSheet,TouchableOpacity,Modal,TouchableHighlight 
} from 'react-native';
import { SceneView } from 'react-navigation';

export default class ManagerRemainingTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}, 
      dropdownSelectionPending : null,
      employeeSelectionRemaining : '', 
      renderListFlag : false,  
      listData : null,  
      listNames : null, 
      flag : false, 
      data : [{value:"Employee"},{value:'Dep Manager'},{value:'Executive'},{value:'COO'},{value:'HR Admin'},{value:'CEO'}],
       roles : ["Employee",'Dep Manager','Executive','COO','HR Admin','CEO'], 
       searchLoading : false,
       transformed_data : null 
    };
  }

  loadingflag = false ; 

  shouldInclude(data) {
    const dropDownSelection = this.state.dropdownSelectionPending; 
   let level = null; 
  // console.log(dropDownSelection); 
   let roles = ["Employee",'Dep Manager','Executive','COO','HR Admin','CEO']; 
     roles.forEach((val,index) => {
     if(val==dropDownSelection) {
       console.log("value " +val);
       level = index; 
     }
   }); 


  id = parseInt(data.trim().substr(-3)); 
 // console.log(id); 
 // console.log(this.state.listData[0].emp_id); 
//  console.log( this.state.listData[0].view_level-1);
 // console.log(level); 
  
  flag = false ; 
  this.state.listData.forEach(val=>{
     if(parseInt(val.emp_id) == id && val.view_level-1 == level) flag = true 

   });

  return flag; 
 }



   findData(employeeSelectionRemaining) {
    {
      if (employeeSelectionRemaining === '') {
        return [];
      }
  
      const  data = this.state.listNames; 
       const regex = new RegExp(`${employeeSelectionRemaining.trim()}`, 'i');
      return data.filter(data => data.search(regex) >= 0 && this.shouldInclude(data));
    }
   }

   async onChangeText(text) {
      let index = this.state.roles.indexOf(text);

     const userinfo = await AsyncStorage.getItem('userinfo');
     const userContext = JSON.parse(userinfo); 
 

     axios.post(
      'https://vodafoneleaveapi.herokuapp.com/api/view/remaining',
      {
        "man_id": userContext[0].man_id.toString(),
        "emp_id": "0",
        "leave_code": "ALL",
        "view_level":(index+1).toString(),
        "token" : userContext[0].token.toString()
     }).then(resp => {
      let keymap = {
        'AL' : "Annual Leave",
        'BL' : "Bereavement Leave",
        'SK' : "Sick Leave",
        'SD'   : "Study Leave",
        'FCL' : "Family Care Leave",
        'PL' : "Paternity Leave",
        'ML' : "Maternity Leave",
    };


      this.setState({listData : resp.data.map((val,index) => {
        return {leave_code : keymap[val.leave_code],
               emp_id:val.emp_id, 
               emp_fname : val.emp_fname,
               emp_lname : val.emp_lname,
               view_level : val.view_level,
               annual_leave: val.AL,
               bereavement_leave : val.BL,
               family_care_leave : val.FCL,
               Maternity_leave : val.MPL,
               sick_leave : val.SK,
               study_leave : val.SD,
        }
      })}); 

      this.setState({listNames : Array.from(new Set(resp.data.map(val => {
        return val.emp_fname + " " + val.emp_lname + " " + val.emp_id + ""; 
      })))}); 
      this.setState({user:userContext,renderListFlag:false}); 
      this.setState({searchLoading:false})

    }).catch(err => {ToastAndroid.show("Something went wrong retrieving data",ToastAndroid.SHORT); console.log(err)})
    this.setState({dropdownSelectionPending : text});

  }

  renderGraph(transformed_data) {
    const height = 102;
   // console.log(transformed_data);
    
     if(this.state.renderListFlag) return <ScrollView>
                     {chartConfigs.map((chartConfig,index) => {
                       if(!(index ==6)) return 
                        const labelStyle = {
                            color: "#000",
                            fontWeight:'bold',
                            fontSize: 11,
                            marginRight : 20,
                        }
                        const graphStyle = {
                            margin: 10,
                            ...chartConfig.style
                        }
                        return (
                            <View style={{padding:23,borderRadius:60}} >
                                <ScrollView
                                    key={Math.random()}
                                    style={{
                                        backgroundColor: chartConfig.backgroundColor
                                    }}
                                >
                                
                                    <View style={{flexDirection: 'row', justifyContent: 'space-around',borderRadius : 26, marginTop:15}}>
                                        <View style={{alignItems: 'center'}}>
                                            <Text style={labelStyle}>Annual Leave</Text>
                                            <ProgressChart
                                                data={[transformed_data[0].annual_leave / 21]}
                                                width={Dimensions.get('window').width / 2.3}
                                                height={height}
                                                chartConfig={chartConfig}
                                                style={graphStyle}
                                            />
                                        </View>

                                        <View style={{alignItems: 'center'}}>
                                            <Text style={labelStyle}>Sick Leave</Text>
                                            <ProgressChart
                                                data={[transformed_data[0].sick_leave / 21]}
                                                width={Dimensions.get('window').width / 2.3}
                                                height={height}
                                                chartConfig={chartConfig}
                                                style={graphStyle}
                                            />
                                        </View>
                                    </View>

                                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                    <View style={{alignItems: 'center'}}>
                                            <Text style={labelStyle}>Family Care Leave</Text>
                                            <ProgressChart
                                                data={[transformed_data[0].family_care_leave /100]}
                                                width={Dimensions.get('window').width / 2.3}
                                                height={height}
                                                chartConfig={chartConfig}
                                                style={graphStyle}
                                            />
                                        </View>

                                        <View style={{alignItems: 'center'}}>
                                            <Text style={labelStyle}>Study Leave</Text>
                                            <ProgressChart
                                                data={[transformed_data[0].study_leave /100]}
                                                width={Dimensions.get('window').width / 2.3}
                                                height={height}
                                                chartConfig={chartConfig}
                                                style={graphStyle}
                                            />
                                        </View>
                                    </View>

                                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                                        <View style={{alignItems: 'center'}}>
                                            <Text style={labelStyle}>Maternity/Parternity Leave</Text>
                                            <ProgressChart
                                                data={[transformed_data[0].Maternity_leave/98]}
                                                width={Dimensions.get('window').width / 2.3}
                                                height={height}
                                                chartConfig={chartConfig}
                                                style={graphStyle}/>
                                        </View>

                                        <View style={{alignItems: 'center'}}>
                                            <Text style={labelStyle}>Bereavement Leave</Text>
                                            <ProgressChart
                                                data={[transformed_data[0].bereavement_leave /5]}
                                                width={Dimensions.get('window').width / 2.3}
                                                height={height}
                                                chartConfig={chartConfig}
                                                style={graphStyle}
                                            />
                                        </View>
                                    </View>
                                </ScrollView>
                            </View>
                        )
                    })}
                    </ScrollView>
        return <View/> 
  }


  render() {

      const { employeeSelectionRemaining } = this.state;
      const data2 =  this.findData(employeeSelectionRemaining); 
      const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
     
      let transformed_data = null 
     // console.log(data2);
      if(this.state.user) {

      transformed_data= this.state.listData.filter((val,index) => {
          let flag = false; 
          data2.forEach(val2=> {
              if(val2==val.emp_fname + " " + val.emp_lname + " " + val.emp_id + "") flag = true 
          }); 
           return flag; 

      });   

      if(transformed_data.length>=1 && this.state.employeeSelectionRemaining.length > 7) loadingflag = true; 
      else loadingflag =false ;

    }

 


    return (
      <View style={{flex:1}}> 
         
         <Dropdown
          label='Hierachical'
          overlayStyle={{flex:1,dropdownOffset:{top:100},dropdownMargins:{ min: 15, max: 20 },padding:10,borderRadius:55,alignItems:'center',justifyContent:'center'}}
          containerStyle = {{marginLeft:30,marginRight:30, marginBottom : 75}}
          onChangeText = {this.onChangeText.bind(this)}
          data={this.state.data} />
 

          <View style={{flex: 1,
              backgroundColor: '#f2f2f2',
              borderColor: '#f2f2f2',
              borderRadius :3 ,
              flex: 1,
                left: 0,
                position: 'absolute',
                 marginTop : 70,
                 right: 0,
                 top: 0,
                 padding: 15}}> 
               <Autocomplete
            data={data2.length === 1 && comp(employeeSelectionRemaining, data2[0]) ? [] : data2}
            defaultValue={employeeSelectionRemaining}
            onChangeText={text => this.setState({ employeeSelectionRemaining: text,renderListFlag:false })}
            placeholder="Search"
            renderItem={({ item, i }) => (
              <TouchableOpacity onPress={() => this.setState({ employeeSelectionRemaining: item })}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
          </View> 

        <View style={{marginLeft:40,marginRight:40,marginTop:data2.length*20}}>
           
            <Button onPress={() => {
                if(!this.state.employeeSelectionRemaining || !this.state.dropdownSelectionPending) 
                ToastAndroid.show("Please enter all details",ToastAndroid.SHORT)
                else if  (!loadingflag){
                  ToastAndroid.show("Enter employee does not exist",ToastAndroid.SHORT)
                }
                else {
                    this.setState({renderListFlag:true})
                }
        }}  
            style={{borderRadius:5,backgroundColor:'#fafafa'}}  block >
                 <Icon style={{color:'#03a9f4'}} name='search' />
                 <Text style={{color:'#03a9f4',fontWeight:'bold'}}>Search</Text>
            </Button>
        </View>

        {this.renderGraph(transformed_data)}
 
        

         
      <ChatbotFAB colorFAB='#03a9f4' navigation = {this.props.navigation} />
       
      </View> 
      ) 
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  }
});


 