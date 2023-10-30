import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import FooterButton from '../components/FooterButton'
import api from '../api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'

function ListItem({item}){
    return(
        <View style={{display: "flex", justifyContent: 'flex-start', flexDirection: "row", flex: 1}}>
            <Text style={{flex: 0.4, fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}>{item.productName}</Text>
            <Text style={{flex: 0.2, textAlign: 'center'}}>{item.price}</Text>
            <Text style={{flex: 0.2, textAlign: 'center'}}>{item.quantity}</Text>
            <Text style={{flex: 0.2, textAlign: 'right'}}>${Math.round(item.price * item.quantity*100)/100}</Text>
        </View>
    )
}

export default function CheckOut({route, navigation}) {

    
   const {data} = route.params



   const payhandler = () =>{
        AsyncStorage.getItem("Token").then(token =>{
            fetch(`${api.checkOut}?orderid=${data.id}`,
                {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res=>res.json())
                .then(resp=>{
                    if(resp.returnCode == 0){
                        Toast.show({
                            type: 'AddToCartSuccess',
                            text1: 'Thank you',
                            text2: `Payment successfully`
                          });
                    } else {
                        Toast.show({
                            type: 'error',
                            text1: 'Error',
                            text2: `Payment failed`
                          });
                    }
                    setTimeout(() => {
                        navigation.navigate("Shop")
                    }, 800);
                })
        })
    }
  return (
    <View style={{display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: 'center', flex: 1}}>
        <View style={styles.logo}>
            <Image style={{height: 64, width: 56, marginLeft: 10}} source = {require("../assets/imgs/colorfulcarrot.png")} />
            <Text style={{paddingTop: 10,fontSize: 24, textAlign: "center", color: "#53B175", letterSpacing: 10, fontWeight: 'bold'}}>FOODIER</Text>
        </View>
        <View style={{paddingBottom: 40, width: "100%", flex: 0.6}}>
            <Text style={{fontWeight: 'bold', fontSize: 30, textAlign: "center", paddingVertical: 18}} >CHECKOUT</Text>
            
            <View>
                <View style={{display: "flex", justifyContent: 'flex-start', flexDirection: "row", paddingBottom: 10}}>
                    <Text style={{flex: 0.4, fontSize: 15, fontWeight: 'bold', textAlign: 'center'}}>Product</Text>
                    <Text style={{flex: 0.2, fontSize: 15,textAlign: 'center'}}>Price</Text>
                    <Text style={{flex: 0.2, fontSize: 15,textAlign: 'center'}}>Qtty</Text>
                    <Text style={{flex: 0.2, fontSize: 15,textAlign: 'center'}}>Total</Text>
                </View>
                <FlatList
                    data = {data.cartItems} 
                    style = {{paddingHorizontal: 25, }}
                    renderItem={({item, i}) => (<ListItem item={item} key = {i} />)}
                    snapToAlignment = "start"
                />
                <View style={{display: "flex", justifyContent: 'flex-start', flexDirection: "row", paddingTop: 20}}>
                    <Text style={{flex: 0.4, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>Total</Text>
                    <Text style={{flex: 0.2, fontSize: 15,textAlign: 'center'}}></Text>
                    <Text style={{flex: 0.2, fontSize: 15,textAlign: 'center'}}></Text>
                    <Text style={{flex: 0.2, fontSize: 20, fontWeight: "bold", color: "#53B175",textAlign: 'right', paddingRight: 24}}>${data.total}</Text>
                </View>
            </View>
        </View>

        <View style={styles.footer}>
            <View style={{display: "flex", flexDirection: 'row', width: "100%", justifyContent: 'flex-end', paddingVertical: 6, paddingHorizontal: 45}}>
                <Text style={{fontWeight: "bold", paddingRight: 20, fontSize: 10}}>TOTAL: </Text>
                <Text style={{fontWeight: 'bold', fontSize: 12, letterSpacing: 1, color: '#53B175'}}>${data.total}</Text>
            </View>
            <FooterButton onPressHandler = {payhandler} text="PAY" />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    logo:{
        display: "flex",
        justifyContent: 'center',
        alignItems: "center",
        flex: 0.2
    },
    footer: {
        height: 160, 
        paddingBottom: 40,
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