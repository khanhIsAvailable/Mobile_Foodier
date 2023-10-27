import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import CustomButton from './CustomButton'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function CartItem() {

    const navigation = useNavigation();
    
    const handleClick = () =>{ 
        navigation.navigate("ProductDetails", {data: {"id": 1, "name": "Organic Bananas", "price": 4.99, "src": 7, "unit": "7pcs"}});
    }


    return (
        <TouchableOpacity onPress={handleClick} style={styles.container}>
            <View style={styles.thumbContainer}>  
                <Image style={styles.thumb} source={{uri: "https://dtgxwmigmg3gc.cloudfront.net/imagery/assets/derivations/icon/512/512/true/eyJpZCI6ImI3MGVhMjE5OTVhMjM4NDI3NGQyMDZjNzdlMWE2ZDUwLmpwZyIsInN0b3JhZ2UiOiJwdWJsaWNfc3RvcmUifQ?signature=d29694b57bc143901690b2e0c2da4867c47bf4cb2fb73eefd4f749d09ca1e8fc"}} />
            </View>
            <View style={styles.descriptionContainer}>
                <View>
                    <Text>Bell Peper Red</Text>
                    <Text>1kg, Price</Text>
                </View>
                <View >
                    <View style={styles.addbuttons}>
                        <CustomButton type="addbutton" text="-" onPressHandler = {()=>{}} />
                        
                        <View style={{paddingLeft: 5, paddingRight: 5, borderBottomWidth: 1, borderColor: 'black', height: 35, display: 'flex', justifyContent: 'center'}}>
                            <Text style={{fontSize: 16, }}>1</Text>
                        </View>
                        
                        <CustomButton type="addbutton" text="+" onPressHandler = {()=>{}} />
                    </View>
                    <View style={styles.price}>
                        <Text style={{fontWeight: 'bold', fontSize: 13, letterSpacing: 1, paddingRight: 10}}>$4.99</Text>
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
        backgroundColor: "white"
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
        width: 68,
        height: 68,
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