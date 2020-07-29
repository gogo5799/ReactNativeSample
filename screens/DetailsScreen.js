import {Button, StyleSheet, Text, View, FlatList,SafeAreaView, StatusBar, TouchableOpacity} from "react-native";
import React,{useState, useEffect} from "react";
import { headerCss }  from '../styles/styles';
import getData from '../data/productSunny';
import { DataRow, Separator } from '../components/dataRow';
import ProductInfoScreen from '../screens/ProductInfoScreen';
import productConfig from '../components/productConfig';
import AsyncStorage from "@react-native-community/async-storage";

const DetailsScreen=({navigation})=>{
    let getStatus=productConfig();

    return (
        <SafeAreaView>
            <FlatList
                data={getStatus}
                keyExtractor={item => {
                    return `${item.id}`;
                }}
                renderItem={({ item }) => {
                    const name = `${item.name} \nNT$${item.price}`;

                    return (
                        <DataRow
                            image={{ uri: item.picture.thumbnail }}
                            title={name}
                            subtitle={item.title}
                            // onPress={() =>  alert('item=>'+JSON.stringify(item) )}
                            onPress={() =>  navigation.navigate("Products",{
                                productData:item
                            })}
                        />
                    );
                }}
                ItemSeparatorComponent={Separator}
                ListHeaderComponent={() => <Separator />}
                ListFooterComponent={() => <Separator />}
                contentContainerStyle={{ paddingVertical: 20 }}
            />
        </SafeAreaView>

    );

}

export default DetailsScreen

const styles=StyleSheet.create({
    headerCss,
});
