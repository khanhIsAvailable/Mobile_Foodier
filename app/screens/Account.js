import { StyleSheet, Text, View, Image, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import FooterButton from '../components/FooterButton'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight, faBagShopping, faAddressCard, faLocationDot, faCreditCard, faTicket, faBell, faCircleQuestion, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'



function AccountOptionItem({item}){
    return(
        <TouchableOpacity style={{display: "flex",  flexDirection: 'row', paddingVertical: 20, paddingHorizontal: 30, borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#e7e7e7"}}>
            <View style={{ flex: 0.2 }}>
                <FontAwesomeIcon icon={item.icon}   size={20} />
            </View>
            <View style={{ flex: 0.7}}>
                <Text style={{fontSize: 16, fontWeight: 500}}>{item.text}</Text>
            </View>
            <View style={{ flex: 0.1}}>
                <FontAwesomeIcon icon={faChevronRight} />
            </View>
        </TouchableOpacity>
    )
}

export default function Account({route, navigation}) {

    const {setIsSignIn} = route.params
    const portraitWidth = 100
    const [username, setUsername] = useState("")

    var options = [
        {icon: faBagShopping, text: "Orders"},
        {icon: faAddressCard, text: "My Details"},
        {icon: faLocationDot, text: "Delivery Address"},
        {icon: faCreditCard, text: "Payment Method"},
        {icon: faTicket, text: "Promo"},
        {icon: faBell, text: "Notifications"},
        {icon: faCircleQuestion, text: "Helps"},
        {icon: faCircleInfo, text: "About"},
    ]

    useEffect(()=>{
        AsyncStorage.getItem("Username").then((e)=>{
            setUsername(e)
        })
    }, [])


    function LogoutHandler()
    {
        console.log(setIsSignIn)

        AsyncStorage.getAllKeys().then((asyncStorageKeys)=>{
            setIsSignIn(false)
            if (asyncStorageKeys.length > 0) {
                if (Platform.OS === 'android') {
                    AsyncStorage.clear().then(()=>{
                        navigation.navigate("Login")
                    });
                }
                else if (Platform.OS === 'ios') {
                    AsyncStorage.multiRemove(asyncStorageKeys).then(()=>{
                        
                        navigation.navigate("Login")
                    });
                }
            }
        })
            

    }

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}>
                <View style={{display: "flex", flexDirection: 'row', marginHorizontal: 30, marginBottom: 25}}>
                    <View style={{backgroundColor: "#53B175", width: portraitWidth, height: portraitWidth, display: "flex", justifyContent: 'center', alignItems: "center", borderRadius: portraitWidth/2, overflow: 'hidden', borderWidth: 1, borderColor: "#53B175"}}>
                        <Image style={{width: (portraitWidth-4) , height: (portraitWidth-4), borderRadius: (portraitWidth-4)/2}} source={{uri: "https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/512/Person-Red-Hair-3d-Default-icon.png"}} />
                    </View>
                    <View style={{paddingHorizontal: 20, alignSelf: 'center'}}>
                        <Text style={{fontSize: 18}}>{username}</Text>
                        {/* <Text style={{fontSize: 12, color: "#7C7C7C"}}>EmailEmail@gmail.com</Text> */}
                    </View>
                </View>

                {options.map((item, idx)=>(<AccountOptionItem key = {idx}  item = {{...item}} />))}

            </ScrollView>

            <View style={styles.footer}>
                <FooterButton onPressHandler={LogoutHandler} text="Log Out" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        position: 'relative',
        display: "flex",
        flexDirection: 'column',
        flex: 1,
        backgroundColor: "white"
    },
    footer: {
        height: 100, 
        backgroundColor: 'white', 
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: "#E7E7E7"
    },

})