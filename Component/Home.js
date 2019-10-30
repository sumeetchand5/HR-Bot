import React,{Component} from 'react'; 
import {ScrollView, Dimensions, View,StatusBar, Text, ActivityIndicator,Image,AsyncStorage,ToastAndroid} from 'react-native'; 
import ScrollableTabView from 'react-native-scrollable-tab-view'; 
import {chartConfigs} from '../Config/env'; 
import HeaderIconExample from "./Header"; 
import {ProgressChart} from "react-native-chart-kit";
import axios from 'axios'; 
import History from './History';
import Approved from './Approved'; 
import ChatbotFAB from './ChatbotFAB'; 

export default  class Home extends Component {
    state = {
        chartResponse : 0, 
        historyResponse : 0, 
        approvedResponse : 0, 
        pendingResponse : 0, 
        loadingCompleted : 0, 
        chartData: null,
        dataArray: [],
        pendingData : '', 
        approvedData : {title : 'Approved', 
        content : ''}, 
    };

    async componentDidMount() {
        const userinfo = await AsyncStorage.getItem('userinfo');
        const userContext = JSON.parse(userinfo); 
 
        axios.all([axios.post(
            'https://vodafoneleaveapi.herokuapp.com/api/view/remaining',
            {
                "man_id": userContext[0].man_id.toString(),
                "emp_id": userContext[0].emp_id.toString(),
                "leave_code": "ALL",
                "view_level": userContext[0].view_level.toString(),
                "token" : userContext[0].token.toString()
             }), axios.post(
            'https://vodafoneleaveapi.herokuapp.com/api/view/history',
            {
                "man_id": userContext[0].man_id.toString(),
                "emp_id": userContext[0].emp_id.toString(),
                "leave_code": "ALL",
                "view_level": userContext[0].view_level.toString(),
                "token" : userContext[0].token.toString()
            
            }),  axios.post(
                'https://vodafoneleaveapi.herokuapp.com/api/view/pending',
                {
                    "man_id": userContext[0].man_id.toString(),
                    "emp_id": userContext[0].emp_id.toString(),
                    "leave_code": "ALL",
                    "view_level": userContext[0].view_level.toString(),
                    "token" : userContext[0].token.toString()
                }),  axios.post(
                    'https://vodafoneleaveapi.herokuapp.com/api/view/current',
                    {
                        "man_id": userContext[0].man_id.toString(),
                        "emp_id": userContext[0].emp_id.toString(),
                        "leave_code": "ALL",
                        "view_level": userContext[0].view_level.toString(),
                        "token" : userContext[0].token.toString()

                    })])
            .then(axios.spread((chartRes, historyRes,pendingRes,approvedRes) => {

                if(chartRes.data) {
                    this.setState({
                        chartData: chartRes.data[0],chartResponse : 1,
                    });    
                }
              
                let keymap = {
                    'AL' : "Annual Leave",
                    'BL' : "Bereavement Leave",
                    'SK' : "Sick Leave",
                    'SD'   : "Study Leave",
                    'FCL' : "Family Care Leave",
                    'PL' : "Paternity Leave",
                    'ML' : "Maternity Leave",
                };

                let  obejct =  {
                    "Annual Leave" : '',
                    "Sick Leave" : '',
                    "Bereavement Leave" : '',
                    "Study Leave" : '',
                    "Family Care Leave" : '',
                    "Paternity Leave" : '',
                    "Maternity Leave" : '',
                }

                if(historyRes.data) {
                    historyRes.data.forEach(val => {
                        obejct[keymap[val.leave_code] ? keymap[val.leave_code] : val.leave_code] = obejct[keymap[val.leave_code] ? keymap[val.leave_code] : val.leave_code] +
                            `${val.date_from.split('T')[0]} - ${val.date_to.split('T')[0]}\n\n`;
                    });
    
                    let keys = Object.keys(obejct);
                    let values = Object.values(obejct);
    
                    this.setState({dataArray : keys.map((val,i)=> {
                        return {
                            title : val,
                            content : values[i]
                        }
                    }),historyResponse:1}); 
                }

           

                pendingData = {
                    title : 'Pending', 
                    content : ''
                }
                if(pendingRes.data) {
                   
                    pendingRes.data.forEach(val => {
                        pendingData.content += ` ${keymap[val.leave_code] ? keymap[val.leave_code] : val.leave_code}: ${val.date_from.split('T')[0]} - ${val.date_to.split('T')[0]}\n\n`
                    });
    
                    this.setState({pendingData :[pendingData],pendingResponse:1}); 
                }
                

                approvedData = {
                    title : 'Approved', 
                    content : ''
                }
                       
               if(approvedRes.data) {
                approvedRes.data.forEach(val => {
                    approvedData.content += ` ${keymap[val.leave_code] ? keymap[val.leave_code] : val.leave_code}: ${val.date_from.split('T')[0]} - ${val.date_to.split('T')[0]}\n\n`
                });

                temp = []; 
                 console.log(pendingData); 
                if(approvedData.content) temp.push(approvedData); 
                if(pendingData.content) temp.push(pendingData); 

                this.setState({approvedData : temp,approvedResponse:1})
               }
                 
              
               this.setState({loadingCompleted :1}); 

            }))
            .catch(error => {
                ToastAndroid.show("Something went wrong retrieving data",ToastAndroid.SHORT)
                this.setState({loadingCompleted :1}); 
             });
    }


    renderTabBar() {
        return  <StatusBar/>  
    }

    renderChartRes(chartConfig,labelStyle,graphStyle,height) {
        if(!this.state.chartResponse) {
            return <Text style={{justifyContent:'center'}}>Remaining Leave Data Not Available</Text>
        }
        return <View>
                                    <Text style={
                                        {
                                            textAlign: 'center',
                                            color: 'white',
                                            fontWeight: 'bold',
                                            fontSize: 18, marginBottom: 30,
                                            padding : 18,
                                            color : 'black', 
                                            backgroundColor :'#f0f0f0'
                                        }
                                    }>Leave Remaining</Text>

                                    <View style={{flexDirection: 'row', justifyContent: 'space-around',borderRadius : 26}}>
                                        <View style={{alignItems: 'center'}}>
                                            <Text style={labelStyle}>Annual Leave</Text>
                                            <ProgressChart
                                                data={[this.state.chartData['AL'] / 21]}
                                                width={Dimensions.get('window').width / 2.3}
                                                height={height}
                                                chartConfig={chartConfig}
                                                style={graphStyle}
                                            />
                                        </View>

                                        <View style={{alignItems: 'center'}}>
                                            <Text style={labelStyle}>Sick Leave</Text>
                                            <ProgressChart
                                                data={[this.state.chartData['SK'] / 21]}
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
                                                data={[this.state.chartData['FCL']/5]}
                                                width={Dimensions.get('window').width / 2.3}
                                                height={height}
                                                chartConfig={chartConfig}
                                                style={graphStyle}
                                            />
                                        </View>

                                        <View style={{alignItems: 'center'}}>
                                            <Text style={labelStyle}>Study Leave</Text>
                                            <ProgressChart
                                                data={[this.state.chartData['SD'] /100]}
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
                                                data={[98/98]}
                                                width={Dimensions.get('window').width / 2.3}
                                                height={height}
                                                chartConfig={chartConfig}
                                                style={graphStyle}/>
                                        </View>

                                        <View style={{alignItems: 'center'}}>
                                            <Text style={labelStyle}>Bereavement Leave</Text>
                                            <ProgressChart
                                                data={[this.state.chartData['BL'] /5]}
                                                width={Dimensions.get('window').width / 2.3}
                                                height={height}
                                                chartConfig={chartConfig}
                                                style={graphStyle}
                                            />
                                        </View>
                                    </View>
                                    </View>

                                 

     }

    renderHistory() {
        if(!this.state.historyResponse) {
            return <Text style={{marginLeft:80,marginTop:20,fontWeight:'bold'}}>Leave History Data Not Available</Text>
        }
        return <History dataArray={this.state.dataArray}/>

    }

    renderApproved() {
        if(!this.state.approvedResponse) {
            return  <Text style={{marginLeft:80,marginTop:20,fontWeight:'bold'}}>No Current Leave Data Available</Text>
        }
        return <Approved approvedData={this.state.approvedData}/> 
    }


    render() {
        console.disableYellowBox = true; 
        const height = 110;
        if ((!this.state.chartData || !this.state.dataArray || !this.state.pendingData) && !this.state.loadingCompleted) 
        return <View style={{flex: 1,backgroundColor:'white',alignItems: 'center', justifyContent: 'center'}}>
             <Image style = {{}}source={require('../assets/vodafone.png')} />
            <ActivityIndicator
            style={{position:'absolute'}} size="large" color="red"/>
            </View>
        return (
            <View style={{flex: 1}}>
                <HeaderIconExample navigation={this.props.navigation} color = '#f63631' title ={"Dashboard"} />

                <ScrollableTabView renderTabBar={this.renderTabBar}>
                    {chartConfigs.map(chartConfig => {
                        const labelStyle = {
                            color: chartConfig.color(),
                            fontSize: 11
                        }
                        const graphStyle = {
                            margin: 10,
                            ...chartConfig.style
                        }
                        return (
                            <View>
                                <ScrollView
                                    key={Math.random()}
                                    style={{
                                        backgroundColor: chartConfig.backgroundColor
                                    }}
                                >
                                {this.renderChartRes(chartConfig,labelStyle,graphStyle,height)} 

                                {this.renderApproved()}
                                {this.renderHistory()}   

                                </ScrollView>

                              <ChatbotFAB colorFAB= '#212121' navigation = {this.props.navigation} />

                            </View>
                        )
                    })}
                </ScrollableTabView>
            </View>
        )
    }
}

 ;

//<FooterTabsIconTextExample/>

