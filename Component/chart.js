import {Dimensions, ScrollView, Text, View} from "react-native";
import {ProgressChart} from "react-native-chart-kit";
import {progressChartDat2, progressChartData} from "../Config/data";
import expo from 'expo'
import React from "react";
import {chartConfigs} from '../Config/env';

export const chart = () => {



    return <View>
        <View style = {{flexDirection:'row' ,justifyContent: 'space-around'}}>
            <View style={{alignItems:'center'}}>
                <Text style={labelStyle}>Annual Leave</Text>
                <ProgressChart
                    data={progressChartData}
                    width={ Dimensions.get('window').width/2.3}
                    height={height}
                    chartConfig={chartConfig}
                    style={graphStyle}
                />


            </View>
            <View style={{alignItems:'center'}}>
                <Text style={labelStyle}>Sick Leave</Text>
                <ProgressChart
                    data={progressChartDat2}
                    width={ Dimensions.get('window').width/2.3}
                    height={height}
                    chartConfig={chartConfig}
                    style={graphStyle}
                />
            </View>
        </View>

        <View style = {{flexDirection:'row' ,justifyContent: 'space-around'}}>
            <View style={{alignItems:'center'}}>
                <Text style={labelStyle}>Annual Leave</Text>
                <ProgressChart
                    data={progressChartData}
                    width={ Dimensions.get('window').width/2.3}
                    height={height}
                    chartConfig={chartConfig}
                    style={graphStyle}
                />


            </View>
            <View style={{alignItems:'center'}}>
                <Text style={labelStyle}>Sick Leave</Text>
                <ProgressChart
                    data={progressChartDat2}
                    width={ Dimensions.get('window').width/2.3}
                    height={height}
                    chartConfig={chartConfig}
                    style={graphStyle}
                />
            </View>
        </View>
        <View style = {{flexDirection:'row' ,justifyContent: 'space-around'}}>
            <View style={{alignItems:'center'}}>
                <Text style={labelStyle}>Annual Leave</Text>
                <ProgressChart
                    data={progressChartData}
                    width={ Dimensions.get('window').width/2.3}
                    height={height}
                    chartConfig={chartConfig}
                    style={graphStyle}
                />


            </View>
            <View style={{alignItems:'center'}}>
                <Text style={labelStyle}>Sick Leave</Text>
                <ProgressChart
                    data={progressChartDat2}
                    width={ Dimensions.get('window').width/2.3}
                    height={height}
                    chartConfig={chartConfig}
                    style={graphStyle}
                />
            </View>
        </View>

        <View style = {{flexDirection:'row' ,justifyContent: 'space-around'}}>
            <View style={{alignItems:'center'}}>
                <Text style={labelStyle}>Family Care Leave</Text>
                <ProgressChart
                    data={progressChartData}
                    width={ Dimensions.get('window').width/2.3}
                    height={height}
                    chartConfig={chartConfig}
                    style={graphStyle}
                />
            </View>
            <View style={{alignItems:'center'}}>
                <Text style={labelStyle}>Maternity/Paternity Leave</Text>
                <ProgressChart
                    data={progressChartDat2}
                    width={ Dimensions.get('window').width/2.3}
                    height={height}
                    chartConfig={chartConfig}
                    style={graphStyle}
                />
            </View>
        </View>

        <View style = {{flexDirection:'row' ,justifyContent: 'space-around'}}>
            <View style={{alignItems:'center'}}>
                <Text style={labelStyle}>Annual Leave</Text>
                <ProgressChart
                    data={progressChartData}
                    width={ Dimensions.get('window').width/2.3}
                    height={height}
                    chartConfig={chartConfig}
                    style={graphStyle}
                />
            </View>
        </View>

    </View>
}