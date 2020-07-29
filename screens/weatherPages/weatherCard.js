import {Button, StyleSheet, Text, View, Image} from "react-native";
import React, { Component } from "react";

const WeatherCard = (props) =>{
        return(
            <View style={{alignItems:'center',backgroundColor:props.bgcolor ,marginTop: 10,borderRadius:20}}>
                <View style={{...styles.bgcard,...styles.pattrenTopAngle,justifyContent:'flex-start',backgroundColor:props.color1, ...props.style  }}>
                    <Text style={styles.text}>{props.timer}</Text>
                    <Image source={props.img} style={styles.img}/>
                </View>
                <View style={{...styles.bgcard,...styles.pattrenBottomAngle,zIndex:-1,justifyContent:'flex-end',backgroundColor:props.color2, ...props.style}}>
                    <Text style={styles.text}>{props.temp}</Text>
                </View>
            </View>
        );
}

export default WeatherCard

const styles=StyleSheet.create({
    bgcard:{
        width: 100,
        height:100,
        alignItems:'center',
    },
    img:{
        width:50,
        // height:'100%',
        height:50,
        alignSelf:'center',
        marginTop:30,
        zIndex:99,
    },
    text:{
        color:'#FFF',
        fontSize:18,
        textAlign:'center',
        marginVertical:2,
        fontWeight:'900',
    },
    pattrenTopAngle:{
        borderTopLeftRadius:20,
        borderTopRightRadius:20
    },
    pattrenBottomAngle:{
        borderBottomRightRadius:20,
        borderBottomLeftRadius:20
    }
});
