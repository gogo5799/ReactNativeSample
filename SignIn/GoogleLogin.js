import React, {Component, useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, Button, Image, Platform, StatusBar, TouchableOpacity} from 'react-native';

import { AuthContext } from '../components/context';

import { UserInfo } from '../components/object';
import AsyncStorage from "@react-native-community/async-storage";

import { GoogleSignin, GoogleSigninButton, statusCodes, isSignedIn } from '@react-native-community/google-signin';
import * as Animatable from "react-native-animatable";
import Toast from "react-native-simple-toast";


const GoogleLogin = ({navigation}) =>{

    const { signIn } =useContext(AuthContext);
    const getUserInfo=new UserInfo();

    GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        webClientId: "",
        offlineAccess: true,
        forceCodeForRefreshToken: true,
    });


    const loginHandle = async() => {

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            getUserInfo.userId=userInfo.user.id;
            getUserInfo.userEmail=userInfo.user.email;
            getUserInfo.userName=userInfo.user.name;
            getUserInfo.userPhoto=userInfo.user.photo;
        } catch (error) {
            alert("error"+error);
        }

        let userId=null;
        let userEmail=null;

        userId=getUserInfo.userId;
        userEmail=getUserInfo.userEmail;

        if (userId!=null &&  userEmail!=null){
            getUserInfo.loginType=String(2);//google
            Toast.showWithGravity('登入成功!!', Toast.LONG, Toast.CENTER);
            signIn(getUserInfo);
        }else {
            alert('google login failed!')
        }


    }

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor="#009387" barStyle='light-content'/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Google</Text>
            </View>

            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <TouchableOpacity
                    onPress={()=>{loginHandle()}}
                    style={[styles.signIn,{
                        borderColor:'#009387',
                        borderWidth:1,
                        marginTop:15}]}
                >
                    <Text style={styles.textSign}>Google登入</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>取消登入</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>

    );
}

export default GoogleLogin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#008888'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        // marginTop: Platform.OS === 'android' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});
