import React, { Component, useState, useEffect, useMemo, useReducer } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import MainTabScreen from "./MainTabScreen";
import DrawerContent from './DrawerContent';
import SettingsScreen from "../screens/SettingsScreen";
import ProductInfoScreen from "../screens/ProductInfoScreen";
import RootStackScreen from "./RootStackScreen";



import Avatar from "react-native-paper/src/components/Avatar/AvatarIcon";
import { ActivityIndicator } from "react-native-paper"

import AsyncStorage from '@react-native-community/async-storage';
import { LoginManager } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';

import { headerCss } from '../styles/styles';
import { AuthContext, DataContext } from '../components/context';

// import { UserInfo } from "../components/object";
// import {getData} from "../components/test";

const Drawer = createDrawerNavigator();


const Login =() =>{
    // const [isLoading,setIsLoading]=useState(true);
    // const [userToken,setUserToken]=useState(null);
    const [userData,setUserData]=useState(null);

    const initialLoginState = {
        isLoading: true,
        userName: null,
        userToken: null,
    };

    const loginReducer = (prevState, action) => {
        switch( action.type ) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGIN':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                };
            case 'REGISTER':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
        }
    };

    const [loginState, dispatch]=useReducer(loginReducer,initialLoginState);
    // const [userInfo, setUserInfo]=useState(null);
    // let testa;

    const authContext=useMemo(()=>({
        // signIn:()=>{

       // signIn:async(userName, password) => {
        signIn:async(foundUser) => {
            // setUserToken('abc');
            // setIsLoading(false);

            const userToken=foundUser.userEmail;
            const userName=foundUser.userId;
            const userLoginType=foundUser.loginType;
            // alert('signIn userToken=>'+userToken);
            setUserData(foundUser);
            // alert('userData=>'+JSON.stringify(userData));
             // let testa=foundUser;
            // alert('testa=>'+JSON.stringify(userData));
            // alert('userLoginType=>'+userLoginType);
            // setUserInfo(foundUser);

            try {
                await AsyncStorage.setItem('userToken', userToken);
                await AsyncStorage.setItem('userLoginType',userLoginType);
            }catch (e) {
                alert('signIn AsyncStorage setItem err=>'+e);
            }


            // let userToken;
            // if ( userName=='user' && password =='pass'){
            //     try {
            //         userToken='aass';
            //         await AsyncStorage.setItem('userToken', userToken);
            //     }catch (e) {
            //         alert('signIn AsyncStorage setItem err=>'+e);
            //     }
            // }
            // alert("signIn userToken=>"+userToken);
            dispatch({ type:'LOGIN', id:userName, token:userToken });

        },

        signOut:async ()=>{
            // setUserToken(null);
            // setIsLoading(false);
            // alert('userInfo=>'+JSON.stringify(userInfo));
            // alert(' userInfo.loginType=>'+ userInfo.loginType);
            // alert('testa=>'+JSON.stringify(testa));

            await AsyncStorage.getItem('userLoginType').then((getLoginType)=>{
                // alert('getLoginType=>'+Number(getLoginType));
                if ( Number(getLoginType)==1){
                    // alert('getInfo.loginType==1');
                    LoginManager.logOut();
                }else if (Number(getLoginType)==2){
                     GoogleSignin.revokeAccess();
                     GoogleSignin.signOut();
                    // alert('getInfo.loginType==2');
                }else {
                    alert('getInfo.loginType!=1 or 2');
                }
            });

            try {
                // alert('AsyncStorage.removeItem....');
                await AsyncStorage.removeItem('userToken');
                await AsyncStorage.removeItem('userLoginType');
            }catch (e) {
                alert('signOut AsyncStorage remove err=>'+e);
            }
            dispatch({ type:'LOGOUT'});
        },

    }));


    useEffect(()=>{
        setTimeout(async()=>{
            // setIsLoading(false);
            let userToken=null;
            try {
                userToken=await AsyncStorage.getItem('userToken');
            }catch (e) {
                alert('useEffect AsyncStorage getItem err=>'+e);
            }
            // alert("useEffect userToken=>"+userToken);
            dispatch({ type:'REGISTER', token:userToken });
        },1000);
    },[]);

    // if (isLoading){
    if (loginState.isLoading){
        return(
            <View  style={headerCss} >
                <ActivityIndicator size={"large"} />
            </View>
        );
    }

    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                { loginState.userToken!=null ? (
                // { userToken!=null ? (
                    <DataContext.Provider value={userData}>
                        <Drawer.Navigator drawerContent={props=><DrawerContent {...props}/>}>
                            <Drawer.Screen name="Home" component={MainTabScreen} />
                            <Drawer.Screen name="Settings" component={SettingsScreen} />
                            <Drawer.Screen name="Products" component={ProductInfoScreen} />
                        </Drawer.Navigator>
                    </DataContext.Provider>
                ):
                    <RootStackScreen/>
                }

            </NavigationContainer>
        </AuthContext.Provider>
    );
}

export default Login
