import React, { useState, useEffect, useContext} from 'react';
import {StyleSheet, Text, View, Button, Image, StatusBar, TouchableOpacity, Platform} from 'react-native';

import { AuthContext } from '../components/context';

import { UserInfo } from '../components/object';
import AsyncStorage from "@react-native-community/async-storage";

import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
import * as Animatable from "react-native-animatable";
import Toast from "react-native-simple-toast";

const FBLogin = ({navigation}) =>{

    const { signIn } =useContext(AuthContext);

    const loginHandle = async() => {

        //fb
        LoginManager.logInWithPermissions(["public_profile"]).then((result)=>{
            if (result.error){
                    alert('Error:',result.error);
            }else {
                if (result.isCancelled){
                    alert('Login is cancelled');
                }else {
                    // alert('Login is success');//OK=>get access token
                    AccessToken.getCurrentAccessToken().then((getFBData)=>{
                        const {accessToken}=getFBData;
                        //create new graph Request
                        let graphRequest=new GraphRequest('/me',{
                            accessToken,
                            parameters:{
                                fields:{
                                    string:'name,email,picture',//get avatar image and name
                                }
                            }
                        },(error,result)=>{
                            if (error){
                                alert("Get user Info Error!",error);
                            }else {
                                // alert("get User Info"+JSON.stringify(result));

                                let userId=null;
                                let userEmail=null;
                                let userName=null;
                                let userPhoto=null;

                                userId=result.id;
                                userEmail=result.email;
                                userName=result.name;
                                userPhoto=result.picture.data.url;

                                if (userId!=null &&  userEmail!=null){
                                    const getUserInfo=new UserInfo();
                                    getUserInfo.loginType=String(1);//fb
                                    getUserInfo.userId=userId;
                                    getUserInfo.userEmail=userEmail;
                                    getUserInfo.userName=userName;
                                    getUserInfo.userPhoto=userPhoto;

                                    Toast.showWithGravity('登入成功!!', Toast.LONG, Toast.CENTER);
                                    signIn(getUserInfo);
                                }else {
                                    alert('FB login failed!')
                                }
                            }
                        });
                        let graphRequestManager=new GraphRequestManager();
                        graphRequestManager.addRequest(graphRequest).start();
                    })
                }
            }
        })
    }

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor="#008888" barStyle='light-content'/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Facebook</Text>
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
                    <Text style={styles.textSign}>Facebook登入</Text>
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

export default FBLogin

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
