import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import CartItem from '../components/CartItem'
import FooterButton from '../components/FooterButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';
import { RefreshControl } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';




export default function Cart() {

    const navigation = useNavigation();
    const [data, setData] = useState([])
    const [refreshing, setRefreshing] = useState(true)

    const onRefresh = () => {
        //Clear old data of the list
        setData([]);
        //Call the Service to get the latest data
        AsyncStorage.getItem("Token").then(token=>{

            AsyncStorage.getItem("UserId").then(userId=>{

                fetch(api.getCartItem + `?userId=${userId}&deliverred=false`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`
                      }
            })
                .then(response=>response.json())
                .then(responseJson=>{
                    setData(responseJson)
                    setRefreshing(false)
                })
                .catch(error=>{
                    console.log(error)
                })

            })

        })
        
      };

    useEffect(()=>{

        AsyncStorage.getItem("Token").then(token=>{

            AsyncStorage.getItem("UserId").then(userId=>{

                fetch(api.getCartItem + `?userId=${userId}`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`
                      }
            })
                .then(response=>response.json())
                .then(responseJson=>{
                    setData(responseJson)
                    setRefreshing(false)
                })
                .catch(error=>{
                    console.log(error)
                })

            })

        })

    }, [])


    const checkOutHandler = () =>{
        navigation.navigate("CheckOut", {data})
        onRefresh()
    }


    return (
    <View style={{backgroundColor: "white", flex: 1, display: "flex", flexDirection: 'column'}} contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}>
        <View style={styles.header}>
            <Text style={styles.headerText}>My Cart</Text>
        </View>

        <View style={{paddingBottom: 200}}>
            {refreshing && <ActivityIndicator />}
            <FlatList
                data = {data.cartItems} 
                style = {{paddingHorizontal: 25,minHeight: 100}}
                renderItem={({item, id}) => 
                    (
                        <CartItem data= {item} key={id}  />
                    )
                }
                snapToAlignment = "start"
                refreshControl={
                    <RefreshControl
                        //refresh control used for the Pull to Refresh
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                  }
            />
        </View>

        <View style={styles.footer}>
            <View style={{display: "flex", flexDirection: 'row', width: "100%", justifyContent: 'flex-end', paddingVertical: 6, paddingHorizontal: 45}}>
                <Text style={{fontWeight: "bold", paddingRight: 20, fontSize: 10}}>TOTAL: </Text>
                <Text style={{fontWeight: 'bold', fontSize: 12, letterSpacing: 1, color: '#53B175'}}>${data.total}</Text>
            </View>
            <FooterButton onPressHandler = {checkOutHandler} text="Check Out" />
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: "#e7e7e7",
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center',
        letterSpacing: 1
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