import React  from "react";
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    Dimensions,
    Platform,
    TextInput,
    StyleSheet,
    StatusBar,
    Alert
} from 'react-native';

import  LinearGradient  from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

const SignInScreen = ({navigation}) =>{

    return(
        <View style={styles.container}>
            <StatusBar backgroundColor="#008888" barStyle='light-content'/>
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome</Text>
            </View>

            <Animatable.View
                animation="fadeInUpBig"
                style={styles.footer}
            >
                <TouchableOpacity
                    onPress={()=>{navigation.navigate("FBLoginScreen")}}
                    style={[styles.signIn,{
                        borderColor:'#009387',
                        borderWidth:1,
                        marginTop:15}]}
                >
                    <Text style={styles.textSign}>Facebook登入</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate("GoogleLoginScreen")}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 1,
                        marginTop: 15
                    }]}
                >
                   <Text style={[styles.textSign, {
                     color: '#009387'
                    }]}>Google登入</Text>
                </TouchableOpacity>
            </Animatable.View>
        </View>
    );
}

export default SignInScreen

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
