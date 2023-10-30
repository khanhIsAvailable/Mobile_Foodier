import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import CustomButton from './CustomButton'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import productImages from "../assets/products"
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from '../api'

export default function CartItem({data}) {

    const navigation = useNavigation();
    
    const handleClick = () =>{ 
        AsyncStorage.getItem("Token").then(token=>{
            fetch(`${api.getProduct}?productID=${data.productId}`,
                {
                  method: "GET",
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                })
                .then(response => response.json())
                .then(res =>{
                    console.log(res[0])
                    navigation.navigate("ProductDetails", {data: res[0]});
                })
                .catch(error=>{
                    console.log(error)
                })
        })
        // navigation.navigate("ProductDetails", {data});
    }

    console.log("CARTITEM: ", data)

    return (
        <TouchableOpacity onPress={handleClick} style={styles.container}>
            <View style={styles.thumbContainer}>  
                <Image style={styles.thumb} source={productImages[data.thumbnail]} />
            </View>
            <View style={styles.descriptionContainer}>
                <View>
                    <Text>{data.productName}</Text>
                    <Text>{data.unit}, Price</Text>
                </View>
                <View >
                    <View style={styles.addbuttons}>
                        {/* <CustomButton type="addbutton" text="-" onPressHandler = {()=>{}} /> */}
                        
                        <View style={{paddingLeft: 5, paddingRight: 5, borderBottomWidth: 1, borderColor: 'black', height: 35, display: 'flex', justifyContent: 'center'}}>
                            <Text style={{fontSize: 16, }}>Qtty: {data.quantity}</Text>
                        </View>
                        
                        {/* <CustomButton type="addbutton" text="+" onPressHandler = {()=>{}} /> */}
                    </View>
                    <View style={styles.price}>
                        <Text style={{fontWeight: 'bold', fontSize: 13, letterSpacing: 1, paddingRight: 10}}>${data.price}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.closebtn}>
                    <FontAwesomeIcon icon= {faX} size={14} color= '#e7e7e7' />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    closebtn: {
        position: "absolute",
        top: 10,
        right: 10
    },
    price: {
        position: "absolute",
        right: 0,
        bottom: 0,
        top: 0
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        position: 'relative',
        marginVertical: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderColor: "#e7e7e7",
        backgroundColor: "white",
    },
    descriptionContainer: {
        flex: 0.75,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    thumbContainer: {
        flex: 0.25,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
    },
    thumb: {
        maxWidth: "100%",
        objectFit: "contain",
        height: "100%",
    },
    addbuttons: {
        paddingVertical: 6,
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        width: 100,
        justifyContent: 'space-between'
    },
})