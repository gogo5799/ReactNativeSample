import React from "react";
import { Button, View, Text } from 'react-native';

import {screenOptionsCss} from "../styles/styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import ExploreScreen from "../screens/ExploreScreen";

import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen=()=>(
    <Tab.Navigator
        initialRouteName="Home"
        activeColor="#A500CC" //點擊顏色
        inactiveColor="#FFF" //無點擊顏色
        barStyle={{ backgroundColor: '#77FFCC' }} //導航列顏色
    >
        <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
                tabBarLabel: '天氣',
                tabBarIcon: ({ color }) => (
                    // <MaterialCommunityIcons name="home" color={color} size={26} />
                    <MaterialCommunityIcons name="weather-rainy" color={color} size={26} />
                ),
            }}
        />
        <Tab.Screen
            name="Details"
            component={DetailsStackScreen}
            options={{
                tabBarLabel: '產品',
                tabBarIcon: ({ color }) => (
                    // <MaterialCommunityIcons name="bell" color={color} size={26} />
                    <MaterialCommunityIcons name="cart" color={color} size={26} />
                    ),
            }}
        />


        {/*底部導覽列第三項*/}
    {/*    <Tab.Screen*/}
    {/*        name="Explore"*/}
    {/*        component={ExploreStackScreen}*/}
    {/*        options={{*/}
    {/*            tabBarLabel: 'Explore',*/}
    {/*            tabBarIcon: ({ color }) => (*/}
    {/*                <MaterialCommunityIcons name="account" color={color} size={26} />*/}
    {/*            ),*/}
    {/*        }}*/}
    {/*    />*/}
    </Tab.Navigator>
)

export default MainTabScreen

const HomeStackScreen = ({navigation}) =>(
    <HomeStack.Navigator screenOptions={screenOptionsCss}>
        <HomeStack.Screen name="Home"
                          component={HomeScreen}
                          options={{
                              title:'天氣情況',
                              headerLeft:()=>(
                                  <Icon.Button
                                      // name="check-box-outline-blank"
                                      name="person"
                                      // name="apps"
                                      size={25}
                                      backgroundColor="#00AAAA"
                                      onPress={()=>navigation.openDrawer()}
                                  />
                              )
                          }}
        />
    </HomeStack.Navigator>
)

const DetailsStackScreen = ({navigation}) =>(
    <DetailsStack.Navigator screenOptions={screenOptionsCss}>
        <DetailsStack.Screen name="Details"
                             component={DetailsScreen}
                             options={{
                                 title:'相關產品',
                                 headerLeft:()=>(
                                     <Icon.Button
                                         // name="check-box-outline-blank"
                                         name="person"
                                         // name="apps"
                                         size={25}
                                         backgroundColor="#00AAAA"
                                         onPress={()=>navigation.openDrawer()}
                                     />
                                 )
                             }}
        />
    </DetailsStack.Navigator>
)

// const ExploreStackScreen = ({navigation}) =>(
//     <DetailsStack.Navigator screenOptions={screenOptionsCss}>
//         <DetailsStack.Screen name="Explore"
//                              component={ExploreScreen}
//                              options={{
//                                  title:'Explore',
//                                  headerLeft:()=>(
//                                      <Icon.Button
//                                          // name="check-box-outline-blank"
//                                          name="person"
//                                          // name="apps"
//                                          size={25}
//                                          backgroundColor="'#009387'"
//                                          onPress={()=>navigation.openDrawer()}
//                                      />
//                                  )
//                              }}
//         />
//     </DetailsStack.Navigator>
// )
