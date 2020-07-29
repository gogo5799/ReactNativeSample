import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
    FlatList,
    Button,
} from 'react-native';
import React, {useEffect} from "react";
import {DataContext} from "../components/context";
import DrawerContent from "../controller/DrawerContent";
import MainTabScreen from "../controller/MainTabScreen";
import SettingsScreen from "./SettingsScreen";
import RootStackScreen from "../controller/RootStackScreen";

const ProductInfoScreen=({navigation,route})=>{

    const { productData } = route.params;

    return(
        <View style={styles.container}>
            <ScrollView>
                <View style={{alignItems:'center', marginHorizontal:30}}>
                    <Image style={styles.productImg} source={{uri: productData.picture.thumbnail}}/>
                    <Text style={styles.name}>{productData.name}</Text>
                    <Text style={styles.price}>NT$ {productData.price}</Text>
                        { productData.features.length==0 ? (
                                <Text style={styles.description}>
                                    {productData.specification}
                                </Text>
                            ):

                            <Text style={styles.description}>
                                {productData.features}
                            </Text>
                        }

                </View>
                <View style={styles.separator}></View>
                <View style={styles.addToCarContainer}>
                    <TouchableOpacity style={styles.shareButton} onPress={()=> navigation.goBack()}>
                        <Text style={styles.shareButtonText}>返回</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );

}
//
export default ProductInfoScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:20,
    },
    productImg:{
        width:200,
        height:200,
    },
    name:{
        fontSize:28,
        color:"#696969",
        fontWeight:'bold'
    },
    price:{
        marginTop:10,
        fontSize:18,
        color:"green",
        fontWeight:'bold'
    },
    description:{
        textAlign:'center',
        marginTop:10,
        color:"#696969",
    },
    star:{
        width:40,
        height:40,
    },
    btnColor: {
        height:30,
        width:30,
        borderRadius:30,
        marginHorizontal:3
    },
    btnSize: {
        height:40,
        width:40,
        borderRadius:40,
        borderColor:'#778899',
        borderWidth:1,
        marginHorizontal:3,
        backgroundColor:'white',

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    starContainer:{
        justifyContent:'center',
        marginHorizontal:30,
        flexDirection:'row',
        marginTop:20
    },
    contentColors:{
        justifyContent:'center',
        marginHorizontal:30,
        flexDirection:'row',
        marginTop:20
    },
    contentSize:{
        justifyContent:'center',
        marginHorizontal:30,
        flexDirection:'row',
        marginTop:20
    },
    separator:{
        height:2,
        backgroundColor:"#eeeeee",
        marginTop:20,
        marginHorizontal:30
    },
    shareButton: {
        marginTop:10,
        height:45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius:30,
        backgroundColor: "#00BFFF",
    },
    shareButtonText:{
        color: "#FFFFFF",
        fontSize:20,
    },
    addToCarContainer:{
        marginHorizontal:30
    }
});
