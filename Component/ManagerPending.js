import React, { Component } from 'react';
import ChatbotFAB from '../Component/ChatbotFAB'; 
import {Dropdown} from 'react-native-material-dropdown'; 
import {Icon,Tabs,Tab,Button,List,ListItem} from 'native-base'
import Autocomplete from 'react-native-autocomplete-input'; 
import axios from 'axios'
 
import {
  Text,
  ScrollView, 
  View,
  StyleSheet,TouchableOpacity,ActivityIndicator,ToastAndroid,Modal,TouchableHighlight,AsyncStorage
} from 'react-native';
import { number } from 'prop-types';

export default class ManagerPendingTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {}, 
      dropdownSelectionPending : null,
      employeeSelectionPending : '', 
      renderListFlag : false,  
      listData : null,   
      shiftamount : 20, 
      listNames : null,
      searchLoading : true , 
      user : null, 
      masterHide : false ,
    };
  }
  
  loadingFlag = false ;


 async  componentDidMount() {
    const userinfo = await AsyncStorage.getItem('userinfo');
    const userContext = JSON.parse(userinfo); 
    this.setState({user:userContext}); 

    axios.post(
      'https://vodafoneleaveapi.herokuapp.com/api/view/pending',
      {
        "man_id": userContext[0].man_id.toString(),
        "emp_id": "0",
        "leave_code": "ALL",
        "view_level": "0",
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
               from : val.date_from,
               to : val.date_to ,
               emp_id:val.emp_id, 
               emp_fname : val.emp_fname,
               emp_lname : val.emp_lname,
               view_level : val.view_level
        }
      })}); 

      this.setState({listNames : Array.from(new Set(resp.data.map(val => {
        return val.emp_fname + " " + val.emp_lname + " " + val.emp_id + ""; 
      })))}); 

      this.setState({searchLoading:false})

    }).catch(err => {
      this.setState({masterHide:true})

      ToastAndroid.show("Something went wrong retrieving data",ToastAndroid.SHORT); console.log(err)})
  }

  shouldInclude(data) {
     const dropDownSelection = this.state.dropdownSelectionPending; 
    let level = null; 
   // console.log(dropDownSelection); 
    let roles = ["Employee",'Dep Manager','Executive','COO','HR Admin','CEO']; 
      roles.forEach((val,index) => {
      if(val==dropDownSelection) {
       // console.log("value " +val);
        level = index+1; 
      }
    }); 

 
   id = parseInt(data.trim().substr(-3)); 
  // console.log(id); 
  // console.log(this.state.listData[0].emp_id); 
 //  console.log( this.state.listData[0].view_level);
 //  console.log(level); 
   
   flag = false ; 
   this.state.listData.forEach(val=>{
      if(parseInt(val.emp_id) == id && val.view_level == level) flag = true 
    });

   return flag; 
  }

   findData(employeeSelectionPending) {
      {
      if (employeeSelectionPending === '') {
        return [];
      }
  
      const  data = this.state.listNames; 
      const regex = new RegExp(`${employeeSelectionPending.trim()}`, 'i');
      return data.filter(data => data.search(regex) >= 0 && this.shouldInclude(data));
    }
   }

   onChangeText(text) {
    this.setState({dropdownSelectionPending : text,renderListFlag:false});
  }

  renderSearch(data2) {
  if( this.state.searchLoading ===false ) {return  <View style={{marginLeft:40,marginRight:40,marginTop:data2.length*20}}>
          <Button onPress={() => {
              if(!this.state.employeeSelectionPending || !this.state.dropdownSelectionPending) 
              alert("Please provide all information"); 
              else if  (!loadingFlag){
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
  } 

        return  <View style={{flex: 1,backgroundColor:'white',alignItems: 'center'}}>
      <ActivityIndicator
     style={{position:'absolute'}} size='large'  color="#03a9f4"/>
     </View>
  
  }

  renderListItem() {
    return this.state.listData.filter(val => {
         return  (val.emp_fname + " " + val.emp_lname + " " + val.emp_id).trim() == this.state.employeeSelectionPending.trim(); 
    }) 
      .map(val => {
      return  <ListItem style={{flex:1,flexDirection:'row',justifyContent:'space-between',height:55}}>
       <Icon style={{color:'#03a9f4',paddingRight:10}} name='calendar'/> 
        <Text  style={{color:"#424242",fontWeight:'bold'}} >{val.leave_code} </Text>
        <View  >
            <Text style={{color:"#ef9a9a",fontWeight:'bold'}}>{val.from}</Text>
            <Text style={{color:"#81c784", }}>{val.to }</Text>
        </View>
    </ListItem>
    })
  }

  renderList() {
      return (   <List>
      {this.renderListItem()}
  </List> 
      )
  }
   
  render() {
    try {
      let data =  [{value:''}]

      if(this.state.user)  {
       //  ToastAndroid.show(,ToastAndroid.SHORT)
         let roles = [ {value:"Employee"},{value:'Dep Manager'},{value:'Executive'},{value:'COO'},{value:'HR Admin'},{value:'CEO'}]; 
        data = roles ;
        let level = parseInt(this.state.user[0].view_level,10); 
        level -=1; 
        let counter = 0; 

        } 
      
      const { employeeSelectionPending } = this.state;
      const data2 =  this.findData(employeeSelectionPending); 
      const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

      if(data2.length>=1) loadingFlag =true 
      else loadingFlag = false; 

      if(this.state.masterHide ) 
      return <View><Text style={{fontWeight:'bold',margin:150}}>
      No Data Available</Text></View>

    return (
      <View style={{flex:1}}> 
         
         <Dropdown
          label='Hierachical'
          overlayStyle={{flex:1,dropdownOffset:{top:100},dropdownMargins:{ min: 15, max: 20 },padding:10,borderRadius:55,alignItems:'center',justifyContent:'center'}}
          containerStyle = {{marginLeft:30,marginRight:30, marginBottom : 75}}
          onChangeText = {this.onChangeText.bind(this)}
          data={data} />
 

          <View style={{flex: 1,
              backgroundColor: '#f2f2f2',
              borderColor: '#f2f2f2',
              borderRadius :3 ,
              flex: 1,
                left: 0,
                position: 'absolute',
                 marginTop : 57,
                 right: 0,
                 top: 0,
                 padding: 15}}> 
               <Autocomplete
            data={data2.length === 1 && comp(employeeSelectionPending, data2[0]) ? [] : data2}
            defaultValue={employeeSelectionPending}
            onChangeText={text => this.setState({ employeeSelectionPending: text,renderListFlag:false })}
            placeholder="Search"
            renderItem={({ item, i }) => (
              <TouchableOpacity  onPress={() => this.setState({ employeeSelectionPending: item })}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
          </View> 

        {this.renderSearch(data2)}

        <ScrollView style={{marginBottom:10,marginTop:10}}>
        <View style={{marginTop:15,justifyContent:'center',backgroundColor:'#fafafa'}}> 
            {this.state.renderListFlag ? this.renderList() : <View/> } 
        </View> 
        </ScrollView>
         
      <ChatbotFAB colorFAB='#03a9f4' navigation = {this.props.navigation} />
       
      </View> 
      ) 

      }catch(err) {
        ToastAndroid.show("Something went wrong rendering Pending tab",ToastAndroid.SHORT)
      }
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
    position: 'relative',
    right: 0,
    top: 0,
    zIndex: 1
  }
});


 