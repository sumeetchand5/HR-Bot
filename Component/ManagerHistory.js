import React, { Component } from 'react';
import ChatbotFAB from '../Component/ChatbotFAB'; 
import {Dropdown} from 'react-native-material-dropdown'; 
import {Icon,Tabs,Tab,Button,List,ListItem} from 'native-base'
import Autocomplete from 'react-native-autocomplete-input'; 
import axios from 'axios'
 
import {
  Text,
   View,
  StyleSheet,TouchableOpacity,ActivityIndicator,Modal,TouchableHighlight,ToastAndroid,AsyncStorage
} from 'react-native';
import {Agenda} from 'react-native-calendars';

export default class AgendaScreen extends Component {
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
      markedDates : {} ,
      selectedDate : '2019-05-23',
      user : null, 
      masterHide : false, 
    };
  }

  loadingFlag = false; 

  async componentDidMount() {
    const userinfo = await AsyncStorage.getItem('userinfo');
    const userContext = JSON.parse(userinfo); 
    this.setState({user:userContext}); 

    axios.post(
      'https://vodafoneleaveapi.herokuapp.com/api/view/history',
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

    }).catch(err =>{               
       ToastAndroid.show("No Data Available",ToastAndroid.SHORT)
       this.setState({searchLoading:false,masterHide:true})
       console.log(err)})
  }

  
  shouldInclude(data) {
    const dropDownSelection = this.state.dropdownSelectionPending; 
   let level = null; 
    let roles = ["Employee",'Dep Manager','Executive','COO','HR Admin','CEO']; 
     roles.forEach((val,index) => {
     if(val==dropDownSelection) {
        level = index+1; 
     }
   }); 


  id = parseInt(data.trim().substr(-3)); 
 
  
  flag = false ; 
  this.state.listData.forEach(val=>{
     if(parseInt(val.emp_id) == id && val.view_level-1 == level) flag = true 
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
      return data.filter(data => data.search(regex) >= 0 && this.shouldInclude(data) );
    }
   }

   onChangeText(text) {
    this.setState({dropdownSelectionPending : text});
  }

  renderSearch(data2) {
  if( this.state.searchLoading ===false ) {return  <View style={{marginLeft:40,marginRight:40,marginTop:data2.length*15}}>
          <Button onPress={() => {
              if(!this.state.employeeSelectionPending || !this.state.dropdownSelectionPending) 
              alert("Please provide all information"); 
              else if  (!loadingFlag){
                ToastAndroid.show("Enter employee does not exist",ToastAndroid.SHORT)
              }
              else {
                  this.setState({renderListFlag:true})
                  this.forceUpdate(); 
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

  render() {
    try {
    
         //  ToastAndroid.show(,ToastAndroid.SHORT)
          let roles = [{value:"Employee"},{value:"Employee"},{value:'Dep Manager'},{value:'Executive'},{value:'COO'},{value:'HR Admin'},{value:'CEO'}]; 
         data = roles ;
         
 
      const { employeeSelectionPending } = this.state;
      const data2 =  this.findData(employeeSelectionPending); 
      const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();

      if(data2.length>=1) loadingFlag = true; 
      else loadingFlag =false ;
   // console.log(this.state.listData);

   if(this.state.masterHide ) 
   return <View><Text style={{fontWeight:'bold',margin:150}}>
     No Data Available</Text></View>
    
    return (      
    
    <View style={{flex:1}}> 

      <Dropdown 
      label='Hierachical'
      overlayStyle={{flex:1,dropdownOffset:{top:100},dropdownMargins:{ min: 15, max: 20 },padding:10,borderRadius:55,alignItems:'center',justifyContent:'center'}}
      containerStyle = {{marginLeft:30,marginRight:30, marginBottom : 60}}
      onChangeText = {this.onChangeText.bind(this)}
      data={data} />


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
             paddingLeft:15,paddingRight:15,paddingTop:3,paddingBottom:3}}> 
           <Autocomplete
        data={data2.length === 1 && comp(employeeSelectionPending, data2[0]) ? [] : data2}
        defaultValue={employeeSelectionPending}
        onChangeText={text => this.setState({ employeeSelectionPending: text })}
        placeholder="Search"
        renderItem={({ item, i }) => (
          <TouchableOpacity  onPress={() => this.setState({ employeeSelectionPending: item })}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      />
      </View> 

    {this.renderSearch(data2)}


      <Agenda style={{marginTop : 8}}
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={this.state.selectedDate}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        // markingType={'period'}
        markedDates={this.state.markedDates}
        markingType={'period'}
        // monthFormat={'yyyy'}
         theme={{agendaKnobColor: '#ef9a9a'}}
        //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
      />
      </View> 

    );

        }catch(err) {
          ToastAndroid.show("Something went wrong while rendering History tab",ToastAndroid.SHORT)
        }
  }

  loadItems(day) {
       this.setState({items :[],markedDates:{}}); 
       this.forceUpdate(); 
      let  markedDates  = {}
      let selectedDate = ''

       setTimeout(() => {
        if(this.state.listData) {
          this.state.listData.filter(val => {
            if(!this.state.employeeSelectionPending) return true ;
            return  (val.emp_fname + " " + val.emp_lname + " " + val.emp_id).trim() == this.state.employeeSelectionPending.trim(); 
          }).forEach(val => {
              this.state.items[val.from.substr(0,10)] = []
              this.state.items[val.from.substr(0,10)].push({name:val.emp_fname + " " + val.emp_lname + ' : '+ val.from.substr(0,10) + ' to ' + val.to.substr(0,10)}); 
              markedDates[val.from.substr(0,10)] = {startingDay: true, color: '#03a9f4'}
              selectedDate = val.from.substr(0,10);
             }); 
        }
        
  
         //console.log(this.state.items);
        const newItems = {} ;
         Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});

        this.setState({
          items: newItems,
          markedDates,
          selectedDate
        });
        this.forceUpdate(); 
       },1000)
       
     // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
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
  }
});