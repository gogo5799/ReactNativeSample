import {Button, StyleSheet, Text, View, SafeAreaView, ActivityIndicator, TouchableOpacity, Image} from "react-native";
import React, {Component ,useState ,useEffect} from "react";

import {AuthContext, DataContext} from '../components/context';

import axios from 'axios';

import { headerCss }  from '../styles/styles';

import { APP_COnf } from '../components/appConfig';

import WeatherHeader from '../screens/weatherPages/weatherHeader';
import WeatherContent from '../screens/weatherPages/weatherContent';
import WeatherFooter from '../screens/weatherPages/weatherFooter';
import construct from "@babel/runtime/helpers/esm/construct";

import AsyncStorage from "@react-native-community/async-storage";
import Toast from 'react-native-simple-toast';

const HomeScreen=({ navigation })=> {

    const [weatherList,setWeatherList]=useState(null);

    const httpAxios=()=>{
        let weatherUrl=APP_COnf.APP_WEATHER_URL+APP_COnf.PRIVATE_ID;
        // alert('weatherUrl=>'+weatherUrl);
        axios.get(weatherUrl)
            .then((res)=>{
                let listData=res.data.records.locations[0].location[0];//.location[0] 新興區 .location[1] 梓官區 .....
                setWeatherList(listData);
                Toast.showWithGravity('天氣資料已更新完畢!!', Toast.LONG, Toast.CENTER);
        }).catch((err)=>{
            alert('get weather err=>'+JSON.stringify(err));
        })

    }

    useEffect(()=>{
        setTimeout(async()=>{
            // setIsLoading(false);
            httpAxios();
        },1000);

    },[])

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.container}>
                { weatherList!=null ? (
                    // { userToken!=null ? (
                    <DataContext.Provider value={weatherList}>
                        <WeatherHeader/>
                        <WeatherContent/>
                        <WeatherFooter/>
                        <TouchableOpacity
                            onPress={httpAxios}
                        >
                            <Image source={require('../assets/refresh.png')} style={styles.img} />
                        </TouchableOpacity>
                    </DataContext.Provider>
                ):
                    <ActivityIndicator size="large" color="#00ff00" />
                }


            </View>
        </SafeAreaView>
    );
}

export default HomeScreen


const styles=StyleSheet.create({
    container:{
        flex:1,
        marginHorizontal:20,
        justifyContent: "center",
    },
    img:{
        width:40,
        height:40,
        alignSelf:'center',
        // marginVertical:10
    },
});
