import {Button, StyleSheet, Text, View, SafeAreaView, ActivityIndicator, TouchableOpacity, Image} from "react-native";
import React, {Component ,useState ,useEffect} from "react";
import Toast from "react-native-simple-toast";
import AsyncStorage from "@react-native-community/async-storage";
import getProductSunnData from '../data/productSunny';
import getProductRainData from '../data/productRain';

const productConfig=()=>{
    // const [weatherStatus,setWeatherStatus]=useState(null);
    const [getStorageWeatherStatus,setStorageWeatherStatus]=useState(null);
    const getP=()=>{
        AsyncStorage.getItem('weatherStatus').then((v)=>{
            // alert('getItem Ok=>'+v);
            setStorageWeatherStatus(Number(v));
        }).catch(()=>{alert('getItem err')});
        // alert('weatherStatus=>err');
    }
    getP();
    if (getStorageWeatherStatus!=null){
        // alert('getWeatherStatus!=null')
        if (getStorageWeatherStatus==42){
            //下雪
            return getProductRainData;
        }
        else if(getStorageWeatherStatus<=4 && getStorageWeatherStatus>0){
            //晴天
            return getProductSunnData;
        }
        else if(getStorageWeatherStatus<=7 && getStorageWeatherStatus>4){
            //陰天
            return getProductRainData;
        }
        else if(getStorageWeatherStatus<=22 && getStorageWeatherStatus>7){
            //雨天
            return getProductRainData;
        }
        else if(getStorageWeatherStatus==23){
            //陰有雨或雪
            return getProductRainData;
        }
        else if(getStorageWeatherStatus<=32 && getStorageWeatherStatus>23){
            //有霧
            return getProductRainData;
        }
        else if(getStorageWeatherStatus<=41 && getStorageWeatherStatus>32){
            //短暫陣雨或雷雨有霧
            return getProductRainData;
        }
        else {
            Toast.showWithGravity('產品取的錯誤!!', Toast.LONG, Toast.CENTER);
            return getProductSunnData;
        }
    }
}




export default productConfig
