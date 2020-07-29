import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SignInScreen from "../controller/SignInScreen";
import SplashScreen from "../screens/SplashScreen";
import FBLogin from "../SignIn/FBLogin";
import GoogleLogin from '../SignIn/GoogleLogin';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="FBLoginScreen" component={FBLogin}/>
        <RootStack.Screen name="GoogleLoginScreen" component={GoogleLogin}/>
    </RootStack.Navigator>
);
export default RootStackScreen
