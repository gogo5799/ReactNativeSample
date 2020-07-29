import {Button, StyleSheet, Text, View} from "react-native";
import React, { Component, useContext } from "react";
import { DataContext } from '../../components/context';

const WeatherFooter =()=>{
    const getData=useContext(DataContext);
    //第一項目其他因素 Addtonal Info
    let getWind=getData.weatherElement[8].time[0].elementValue[0].value;//風速
    // alert('getWind=>'+JSON.stringify(getWind));

    let getHumidity=getData.weatherElement[4].time[0].elementValue[0].value;//濕度
    // alert('getHumidity=>'+JSON.stringify(getHumidity));

    let getWindDirection=getData.weatherElement[9].time[0].elementValue[0].value;//風速
    // alert('getWindDirection=>'+JSON.stringify(getWindDirection));

    let getComfort=getData.weatherElement[5].time[0].elementValue[1].value;//舒適度
    // alert('getComfort=>'+JSON.stringify(getComfort));

    return(
        <View>
            {/*Addtonal Info*/}
            <Text style={styles.heading}>其他資訊</Text>
            <View style={styles.container}>
                {/*Wind:*/}
                <Text style={styles.maininfo}>風速:             <Text style={styles.ainfo}>{getWind} m/s</Text></Text>
                {/*Humidity*/}
                <Text style={styles.maininfo}>風向:          <Text style={styles.ainfo}>{getWindDirection}</Text></Text>
            </View>
            <View style={styles.container}>

                <Text style={styles.maininfo}>相對濕度:     <Text style={styles.ainfo}>{getHumidity}%</Text></Text>
                <Text style={styles.maininfo}>舒適度:          <Text style={styles.ainfo}>{getComfort}</Text></Text>
            </View>
        </View>
    );

}

export default WeatherFooter

const styles=StyleSheet.create({
    container:{
        flexDirection:'row',
        marginVertical:10,
        justifyContent:'space-between',
        marginRight:50
    },
    heading:{
        fontSize:22,
        fontFamily:'Arial',
        textAlign:'left',
        marginTop:15,
        fontWeight:'900',
    },
    ainfo:{
        fontWeight: '400',
        color:'#666666',
    },
    maininfo:{
        fontWeight:'900',
        color:'#0000CC',
    },
});
