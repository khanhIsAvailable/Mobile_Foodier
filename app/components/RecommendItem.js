import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import  CustomButton from './CustomButton'
import { useNavigation  } from '@react-navigation/native'

const RecommendItem = ({data, type }) => {

    const navigation = useNavigation();

    let bg = data.bg ?? "#FDE598"
    let isProduct = type == 'product'

    let customSize = isProduct ? {height: 250, width: 175} : {height: 105, width: 250}

    
    const handleClick = () =>{ 
        navigation.navigate("ProductDetails", {data});
        console.log("click card")
    }
    
    const CustomTag = !isProduct ? View : TouchableOpacity

    
    return (
        <CustomTag  onPress= {isProduct && handleClick} style={isProduct? {...styles.productContainer,...customSize}: {...styles.container,...customSize, backgroundColor: bg}}>
            <View style={isProduct ? styles.imgProductContainer: styles.imgContainer}>
                <Image style= {styles.image} source={data.src} />
            </View>
            <View style={ isProduct?styles.productContent:styles.content}>
                <Text style={isProduct ? styles.name : {fontWeight: "bold", fontSize: 21, color: "#3E423F"}}>{data.name}</Text>
                {isProduct &&<Text style={styles.unit}>{data.unit}</Text>}
            </View>
            {isProduct && 
                <View style={styles.footer}>
                    <Text style={styles.price}>${data.price}</Text>
                    <CustomButton type="square" text="+" onPressHandler = {()=>{console.log("click custom button")}} />
                </View>
            }
        </CustomTag>
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
        marginRight: 20,

    },
    container: {
        borderRadius: 18,
        paddingTop: 8,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        marginRight: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "flex-start",
        alignItems: "center"
        
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
    },
    content: {
        width: '55%'
    },
    productContent: {
        flex: 0.2
    },
    name: {
        fontWeight: "bold",
        fontSize: 12
    },
    unit: {
        fontSize: 10,
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
        fontWeight: "bold"
    }
})