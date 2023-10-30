import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView, ScrollView, TextInput } from 'react-native-gesture-handler'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import FooterButton from '../components/FooterButton'
import { useNavigation } from '@react-navigation/native'
import api from "../api"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Login({route, navigation}) {
    const {setIsSignIn} = route.params
    const [showPass, setShowPass] = useState(false)
    const [account, setAccount] = useState({username: "", password: ""})
    const [noti, setNoti] = useState("")

    async function login (res) {
        console.log(res)
        var returnData = JSON.parse(res.returnData)
        
        try{
            AsyncStorage.setItem("Token", returnData.Token).then(()=>{
                AsyncStorage.setItem("Username", account.username).then(()=>{
                    console.log("username")
                })
                AsyncStorage.setItem("UserId", returnData.UserId.toString()).then(()=>{
                    setIsSignIn(true)
                    navigation.navigate("MainContainer")
                })
            })
        } catch(error){
            console.log(error)
            setNoti("An error occurs, Try again!")
        }
    }

    const loginHandler = () => {
       if(account.username == "" || account.password == ""){
        setNoti("Enter your username/password")
       } else {
        fetch(api.login + `?username=${account.username}&password=${account.password}`, {
            method: "POST",
        })
        .then(response=>response.json())
        .then(res => {
            if(res.returnCode == 0){
                login(res)
                
                
            } else {
                setNoti("Invalid usename/password")
            }
        })
        .catch(error=>{
            setNoti("An error occurs")
        })
       }
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <ScrollView style={{width: "100%"}} contentContainerStyle={styles.container}>
                <View style={styles.logo}>
                    <Image style={{height: 64, width: 56, marginLeft: 10}} source = {require("../assets/imgs/colorfulcarrot.png")} />
                    <Text style={{paddingTop: 10,fontSize: 24, textAlign: "center", color: "#53B175", letterSpacing: 10, fontWeight: 'bold'}}>FOODIER</Text>
                </View>

                <KeyboardAwareScrollView style={{flex: .6}}>

                <View style={styles.login}>
                    <View style={{paddingBottom: 40, width: "100%"}}>
                        <Text style={{fontWeight: 500, fontSize: 40, letterSpacing: 1}}>Login</Text>
                        <Text style={{fontSize: 13, color: "#7C7C7C"}}>Enter your number and password</Text>
                    </View>
                    <View  style={{width: "100%"}}>
                        <View style={{paddingBottom: 20}}>
                            <Text style={styles.label}>Number</Text>
                            <TextInput 
                                keyboardType='numeric' 
                                style={styles.input} 
                                placeholder='Enter your number...' 
                                value={account.username}
                                onChangeText={text=>{
                                    setAccount({...account, username: text})
                                    setNoti("")
                                }}
                            />
                        </View>
                        <View style={{position: 'relative'}}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput 
                                secureTextEntry={showPass ? false : true} 
                                autoCorrect={false} 
                                style={styles.input}  
                                placeholder='Enter password...' 
                                value={account.password}
                                onChangeText={text=>{
                                    setAccount({...account, password: text})
                                    setNoti("")
                                }}
                            />
                            <TouchableOpacity onPress={()=>setShowPass(!showPass)} style={{position: 'absolute', right: 0,bottom: 0, paddingHorizontal: 10, paddingVertical: 10}}>
                                {account.password != "" && <FontAwesomeIcon color = "#7C7C7C"  icon={(showPass) ? faEyeSlash : faEye}/>}
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <Text style={{color: 'red', paddingVertical: 10}}>{noti}</Text>

                    <View style={{width: "100%", paddingVertical: 30,display: "flex", justifyContent: "center", flexDirection: "row"}}>
                        <View style={{width: 300, height: 100, display: "flex", alignItems: 'center'}}>
                            <FooterButton onPressHandler={loginHandler} text = "Log In"/>
                            <View style={{paddingTop: 16}}>
                                <Text>You do not have an account? <Text onPress={()=>{navigation.navigate("Register")}} style={{color: "#53B175"}} >Register Now</Text></Text>
                            </View>
                        </View>
                    </View>
                </View>

                </KeyboardAwareScrollView>
            </ScrollView>
        </GestureHandlerRootView>
        
    )
}

const styles = StyleSheet.create({
    input: {fontSize: 15, height: 40, borderBottomWidth: 1, borderColor: "#E2E2E2", paddingVertical: 10},
    label: {color: "#7C7C7C", fontSize: 16,},
    login: {
        display: "flex",
        justifyContent: 'flex-start',
        alignItems: "flex-start",
        width: "100%",
        paddingHorizontal: 30
    },
    logo: {
        flex: 0.45,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },

    container: {
        display: "flex",
        justifyContent: 'center',
        alignItems: "center",
        flex: 1,
        flexDirection:"column",
        width: "100%"
    }
})