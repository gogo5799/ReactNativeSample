import {Button, StyleSheet, Text, View, Image, Platform,TouchableOpacity} from "react-native";
import React, { Component, useContext, useState  }from "react";

import weatherImgConfig from '../../components/weatherImgConfig';

import { DataContext } from '../../components/context';
import Toast from "react-native-simple-toast";
import AsyncStorage from "@react-native-community/async-storage";

const WeatherHeader=()=>{
    const getData=useContext(DataContext);

    let getlocalName=getData.locationsName;//城市
    //第一項目
    let getTime=getData.weatherElement[1].time[0].startTime;//時間
    let getTimeStatus=getData.weatherElement[1].time[0].elementValue[1].value;//天氣狀態
    // alert('getTimeStatus=>'+JSON.stringify(getTimeStatus));
    // let getWeatherImg= weatherImgConfig(23);//測試用
    let getWeatherImg= weatherImgConfig(getTimeStatus);//正式使用
    // AsyncStorage.setItem('weatherStatus','1');//測試用
    AsyncStorage.setItem('weatherStatus',getTimeStatus);//正式使用
    let getTimeTemp=getData.weatherElement[3].time[0].elementValue[0].value;//溫度

    return(
            <View>
                <Text style={styles.text}>{getTime}</Text>
                <Image  source={{ uri: getWeatherImg }} style={styles.img} />
                <Text style={styles.temp_text}>{getTimeTemp}&deg;C</Text>
                <Text style={styles.city}>{getlocalName}</Text>
            </View>
    );
}

export default WeatherHeader

const styles=StyleSheet.create({
    text:{
        // fontSize:24,
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center',
        color:'#333'
    },
    img:{
        width:50,
        height:50,
        alignSelf:'center',
        marginVertical:10
    },
    temp_text:{
        fontSize: 32,
        // fontSize: 38,
        fontWeight: 'bold',
        textAlign:'center',
    },
    city:{
        // fontSize:24,
        fontSize:20,
        color: '#777',
        textAlign:'center',
    }
});
