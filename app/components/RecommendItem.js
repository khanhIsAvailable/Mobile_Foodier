import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import  CustomButton from './CustomButton'
import { useNavigation  } from '@react-navigation/native'
import groceries from '../assets/groceries'
import products from "../assets/products"
import { Dimensions } from 'react-native'

const RecommendItem = ({data, type, style, setProduct }) => {

    const navigation = useNavigation();

    const {width} = Dimensions.get("screen");

    let isProduct = type == 'product'

    let customSize = isProduct ? {height: 250, width: width/2-30} : {height: 105, width: width-80}

    
    const handleClick = () =>{ 
        console.log("item: ", data)
        if(isProduct){
            navigation.navigate("ProductDetails", {data});
        } else {
            navigation.navigate("ListProducts", {groceryid: data.id});
        }
    }

    const onPressHandler = () => {
        console.log(data)
        setProduct({...data, buyQuantity: 1});
    }
    
    
    return (
        <TouchableOpacity onPress= {handleClick} style={isProduct? {...styles.productContainer,...customSize,...style}: {...styles.container,...customSize, backgroundColor: data.backgroundColor.replaceAll(" ", ""), borderColor: data.borderColor.replaceAll(" ", ""), borderWidth: 1 , ...style}}>
            <View style={isProduct ? styles.imgProductContainer: styles.imgContainer}>
                <Image  style= {styles.image} source={type == "grocery" ? groceries[data.image] : products[data.thumbnail]} />
            </View>
            <View style={ isProduct?styles.productContent:styles.content}>
                <Text style={isProduct ? styles.name : {fontWeight: "bold", fontSize: 21, color: "#3E423F"}}>{data.productName || data.name}</Text>
                {isProduct && <><Text style={styles.unit}>{data.unit}, Price</Text><Text style={styles.unit}>Sale qtty: {data.productQuantity}</Text></>}
            </View>
            {isProduct && 
                <View style={styles.footer}>
                    <Text style={styles.price}>${data.productPrice}</Text>
                    <CustomButton type="square" text="+" onPressHandler = {onPressHandler} />
                </View>
            }
        </TouchableOpacity>
    )
}

export default RecommendItem

const styles = StyleSheet.create({
    productContainer: {
        borderRadius: 18,
        borderWidth: 1,
        borderColor: "#E2E2E2",
        paddingTop: 8,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        marginBottom: 20

    },
    container: {
        borderRadius: 18,
        paddingTop: 8,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        marginRight: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row"
    },
    imgProductContainer: {
        flex: 0.7,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgContainer: {
        flex: 1
    },
    image: {
        maxHeight: 100,
        maxWidth: 100,
    },
    content: {
        width: '55%'
    },
    productContent: {
        flex: 0.2
    },
    name: {
        fontWeight: "bold",
        fontSize: 14
    },
    unit: {
        fontSize: 9,
        color: "#7C7C7C"
    },
    footer: {
        flex: 0.2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'center'
    },
    price: {
        fontWeight: "bold",
    }
})