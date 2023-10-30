import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { GestureHandlerRootView, ScrollView, TextInput } from 'react-native-gesture-handler'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import FooterButton from '../components/FooterButton'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import SelectDropdown from 'react-native-select-dropdown'
import api from "../api"
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Register() {

    const [showPass, setShowPass] = useState(false)
    const [account, setAccount] = useState({username: "", password: "", fullname: "", location: "", gender: ""})
    const [noti, setNoti] = useState(false)

    const navigation = useNavigation();

    const registerHandler = ()  => {

        if(account.fullname.replaceAll(" ", "") == "" || account.gender.toString() == "" || account.location.replaceAll(" ", "") == "" || account.password.replaceAll(" ", "") == "" || account.username.replaceAll(" ", "") == ""){
            setNoti("You should fill all of the blanks")
        } else {
            var params = new URLSearchParams();
            params.append("username", account.username)
            params.append("password", account.password)
            params.append("fullname", account.fullname)
            params.append("location", account.location)
            params.append("gender", parseInt(account.gender))
            params.append("number", account.username)
            
            fetch(api.register + `?username=${account.username}&password=${account.password}&fullname=${account.fullname}&location=${account.location}&number=${account.username}&gender=${account.gender}`, {
                method: "POST",
            })
            .then(response => response.json())
            .then(res => {
                
                if(res.returnCode == 0){
                    Toast.show({type: "AddToCartSuccess", text1: "Login Now!", text2: "Your account was added"})
                    setTimeout(function(){
                        navigation.navigate("Login")
                    }, 800)
                } else if(res.returnCode == -1){
                    setNoti("Your account already exist")
                    
                } else {
                    setNoti("An Error Happened")
                }
            })
            .catch(error=>{
                Toast.show({
                    type: "error",
                    text1: "Error happened",
                    text2: "An Error happened, Sorry for this matter !"
                })
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
                <KeyboardAwareScrollView style= {{flex: .55}}>
                    <View style={styles.login}>
                        <View style={{paddingBottom: 40, width: "100%"}}>
                            <Text style={{fontWeight: 500, fontSize: 40, letterSpacing: 1}}>Register</Text>
                            <Text style={{fontSize: 13, color: "#7C7C7C"}}>Enter your credentials to continue</Text>
                        </View>
                        <View  style={{width: "100%"}}>
                            <View style={{paddingBottom: 20}}>
                                <Text style={styles.label}>Fullname</Text>
                                <TextInput 
                                    style={styles.input} 
                                    placeholder='Enter your fullname...' 
                                    value={account.fullname}
                                    onChangeText={text=>{
                                        setAccount({...account, fullname: text})
                                        setNoti("")
                                    }}
                                />
                            </View>

                            <View style={{paddingBottom: 20}}>
                                <Text style={styles.label}>Gender</Text>
                                <SelectDropdown
                                    data={[{value: "-1", text: "Incognito"}, {value: "0", text: "Female"}, {value: "1", text: "Male"},    ]}
                                    rowTextForSelection={(item, index) => {
                                        return item.text
                                    }}
                                    onSelect={(selectedItem, index)=>{
                                        setAccount({...account, gender: parseInt(selectedItem.value)})
                                    }}
                                    defaultIndex={account.gender}
                                    buttonTextAfterSelection={(selectedItem, index) => {
                                        return selectedItem.text
                                    }}
                                />
                            </View>

                            <View style={{paddingBottom: 20}}>
                                <Text style={styles.label}>Location</Text>
                                <TextInput 
                                    style={styles.input} 
                                    placeholder='Enter your location...' 
                                    value={account.location}
                                    onChangeText={text=>{
                                        setAccount({...account, location: text})
                                        setNoti("")
                                    }}
                                />
                            </View>

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
                                <FooterButton onPressHandler = {registerHandler} text = "Register"/>
                                <View style={{paddingTop: 16}}>
                                    <Text>Already have an account? <Text onPress={()=>{navigation.navigate("Login")}} style={{color: "#53B175"}} >Login Now</Text></Text>
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