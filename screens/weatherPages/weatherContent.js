import {Button, StyleSheet, Text, View} from "react-native";
import React, {Component, useContext} from "react";
import WeatherCard from '../weatherPages/weatherCard';

import { DataContext } from '../../components/context';
import weatherImgConfig from "../../components/weatherImgConfig";

const WeatherContent = ()=>{
    const getData=useContext(DataContext);
    // alert('getData=>'+JSON.stringify(getData));

    // //第2項目
    let getTimer1=getData.weatherElement[1].time[1].startTime;//時間
    let getStatus1=getData.weatherElement[1].time[1].elementValue[1].value;//天氣狀態
    // alert('getStatus1=>'+JSON.stringify(getStatus1));
    let getWeatherImg1= weatherImgConfig(getStatus1);//正式使用
    // alert('getStatus1=>'+JSON.stringify(getWeatherImg1));
    let getTemp1=getData.weatherElement[3].time[1].elementValue[0].value;//溫度
    //
    // //第3項目
    let getTimer2=getData.weatherElement[1].time[2].startTime;//時間
    let getStatus2=getData.weatherElement[1].time[2].elementValue[1].value;//天氣狀態
    // // alert('getStatus2=>'+JSON.stringify(getStatus2));
    let getWeatherImg2= weatherImgConfig(getStatus2);//正式使用
    let getTemp2=getData.weatherElement[3].time[2].elementValue[0].value;//溫度
    //
    // //第4項目
    let getTimer3=getData.weatherElement[1].time[3].startTime;//時間
    let getStatus3=getData.weatherElement[1].time[3].elementValue[1].value;//天氣狀態
    let getWeatherImg3= weatherImgConfig(getStatus3);//正式使用
    // // alert('getStatus3=>'+JSON.stringify(getStatus3));
    let getTemp3=getData.weatherElement[3].time[3].elementValue[0].value;//溫度

    return(
        <View style={styles.container}>
            <WeatherCard img={{ uri: getWeatherImg1 }} bgcolor={"orange"} color1="orange" color2={"pink"}  style={{borderTopLeftRadius:70}}  timer={getTimer1} temp={getTemp1}  />
            <WeatherCard img={{ uri: getWeatherImg2 }} color1="hotpink" color2="purple"  timer={getTimer2} temp={getTemp2}/>
            <WeatherCard img={{ uri: getWeatherImg3 }} bgcolor={"lightgreen"} color1={"lightblue"} color2={"lightgreen"}  style={{borderBottomRightRadius:70}} timer={getTimer3} temp={getTemp3} />
        </View>
    );

}

export default WeatherContent

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-around',
    }
});
