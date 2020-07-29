import React, {useContext, useEffect, useState,useMemo} from "react";
import { View, StyleSheet } from 'react-native';

import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from  'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { AuthContext, DataContext } from '../components/context';
import {UserInfo} from "../components/object";

import { APP_COnf } from '../components/appConfig';
import AsyncStorage from "@react-native-community/async-storage";

// import { DataInfo  } from '../components/test';

const DrawerContent =  (props)=>{
    const [isDarkTheme, setIsDarkTheme] =useState(false);
    const [getData, setDta] =useState(null);

    const { signOut }= useContext(AuthContext);
    const getUserData=useContext(DataContext);

    const toggleTheme=()=>{
        setIsDarkTheme(!isDarkTheme);
    }

    let userName=APP_COnf.APP_USER_NAME;
    let userEmail=APP_COnf.APP_USER_EMAIL;
    let userPhoto=APP_COnf.APP_USER_PHOTO;
    userName=getUserData.userName;
    userEmail=getUserData.userEmail;
    userPhoto=getUserData.userPhoto;
    // alert('getUserData=>'+JSON.stringify(getUserData));
    // alert('userName=>'+userName);

    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>

                    <View style={styles.userInfoSection}>
                        {/*<View style={{flexDirection:'row',marginTop:15}}>*/}
                        <View style={{marginTop:30,alignItems:'center'}}>
                            <Avatar.Image
                                source={{
                                    uri: userPhoto
                                }}
                                size={80}
                            />
                            {/*<View style={{marginLeft:15, flexDirection:'column'}}>*/}
                            {/*    /!*<Title style={styles.title}>User Email</Title>*!/*/}
                            {/*    <Title style={styles.title}></Title>*/}
                            {/*    /!*<Caption style={styles.caption}>@adssda</Caption>*!/*/}
                            {/*    <Caption style={styles.caption}>{userEmail}</Caption>*/}
                            {/*</View>*/}
                        </View>

                        {/*<View style={styles.row}>*/}
                        {/*    <View style={styles.section}>*/}
                        {/*        <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>*/}
                        {/*        <Caption style={styles.caption}>{userName}</Caption>*/}
                        {/*    </View>*/}
                        {/*    <View style={styles.section}>*/}
                        {/*        <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>*/}
                        {/*        <Caption style={styles.caption}>Following</Caption>*/}
                        {/*    </View>*/}
                        {/*</View>*/}
                    </View>
                    <Drawer.Section>
                    </Drawer.Section>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={({color, size})=>(
                                <Icon
                                    name="account-outline"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label={userName}
                            // label="Profile"
                            // onPress={()=>{props.navigation.navigate('Profile')}}
                        />

                        {/*<DrawerItem*/}
                        {/*    icon={({color, size})=>(*/}
                        {/*        <Icon*/}
                        {/*            name="settings-outline"*/}
                        {/*            color={color}*/}
                        {/*            size={size}*/}
                        {/*        />*/}
                        {/*    )}*/}
                        {/*    label="Settings"*/}
                        {/*    onPress={()=>{props.navigation.navigate("Settings")}}*/}
                        {/*/>*/}
                        <DrawerItem
                            icon={({color, size})=>(
                                <Icon
                                    name="email"
                                    color={color}
                                    size={size}
                                />
                            )}
                            label={userEmail}
                            // onPress={()=>{}}
                        />
                        {/*<DrawerItem*/}
                        {/*    icon={({color, size})=>(*/}
                        {/*        <Icon*/}
                        {/*            name="account-check-outline"*/}
                        {/*            color={color}*/}
                        {/*    )}*/}
                        {/*    label="Support"*/}
                        {/*    onPress={()=>{props.navigation.navigate('SupportScreen')}}*/}
                        {/*/>*/}
                    </Drawer.Section>

                    {/*資後有可編
                        {/*            size={size}*/}
                    {/*輯個人資料頁後開啟*/}
                    {/*<Drawer.Section>*/}
                    {/*    <DrawerItem*/}
                    {/*        icon={({color, size})=>(*/}
                    {/*            <Icon*/}
                    {/*                // name="account-outline"*/}
                    {/*                name="folder-edit"*/}
                    {/*                color={color}*/}
                    {/*                size={size}*/}
                    {/*            />*/}
                    {/*        )}*/}
                    {/*        label="編輯資料"*/}
                    {/*        onPress={()=>{}}*/}
                    {/*        // onPress={()=>{props.navigation.navigate('Profile')}}*/}
                    {/*    />*/}
                    {/*</Drawer.Section>*/}

                    {/*<Drawer.Section title="Performance">*/}
                    {/*    <TouchableRipple onPress={()=>{toggleTheme()}}>*/}
                    {/*        <View style={styles.preference}>*/}
                    {/*            <Text>Dark Theme</Text>*/}
                    {/*            <View pointerEvents="none">*/}
                    {/*                <Switch val ue={isDarkTheme} />*/}
                    {/*            </View>*/}
                    {/*        </View>*/}
                    {/*    </TouchableRipple>*/}
                    {/*</Drawer.Section>*/}
                </View>
                {/*<Text>Main Content</Text>*/}
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size})=>(
                        <Icon
                            name="exit-to-app"
                            color={color}
                            size={size}
                        />
                    )}
                    // label="Sign Out"
                    label="登出"
                    onPress={()=>{ signOut() }}
                />
            </Drawer.Section>
        </View>
    )
}




export default DrawerContent

const styles=StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        // paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
});
