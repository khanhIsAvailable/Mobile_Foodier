import { StyleSheet, Text, View, Image, FlatList, Animated, TouchableOpacity, Dimensions } from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Pagination from './Pagination'
import CustomButton from './CustomButton'
import FooterButton from './FooterButton'
import api from '../api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'

const ProductDetails = (props) => {
    const {data} = {...props.route.params}
    const [buyQuantity, setBuyQuantity] = useState(1)
    var [productImage, setProductImage] = useState([])

    // const [index, setIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;


    const handleOnScroll = event => {
        Animated.event(
        [
            {
            nativeEvent: {
                contentOffset: 
                    {
                        x: scrollX,
                    },
                },
            },
        ],
        {
            useNativeDriver: false,
        },
        )(event);
    };

    const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
        // setIndex(viewableItems[0].index);
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;


    useEffect(function(){
        AsyncStorage.getItem("Token").then(token=>{
            fetch(api.getProductImage + "?productid="+data.productID, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(responseJSON =>{
                    setProductImage(responseJSON);
                })
                .catch(error => {
                    console.log(error)
                })
        })
    },[])

    const {width} = Dimensions.get("screen")


    const minusHandler = () => {
        if(buyQuantity <= 1 ){
            
        }else {
            setBuyQuantity(buyQuantity-1)
        }
    }
    const plusHandler = () => {
        if(data.productQuantity <= buyQuantity){
            
        }else {
            setBuyQuantity(buyQuantity+1)
        }
    }

    const addtoblk = () =>{
        AsyncStorage.getItem("Token").then(token=>{
            AsyncStorage.getItem("UserId").then(userId=>{
              fetch(`${api.addToCart}?userid=${userId}&productid=${data.productID}&quantity=${buyQuantity}&note=`,
                {
                  method: "POST",
                  headers: {
                    'Authorization': `Bearer ${token}`
                  }
                })
                  .then(response => response.json())
                  .then(res =>{
                      if(res.returnCode == 0){
                        Toast.show({
                          type: 'AddToCartSuccess',
                          text1: 'Thank you',
                          text2: `${data.productName}(${buyQuantity} x ${data.unit}) Added To Basket`
                        });
                        
                      } else {
                        Toast.show({
                          type: 'error',
                          text1: 'Error',
                          text2: `An error occurs`
                        });
                      }
                  })
                  .catch(error => {
                      console.log(error)
                  })
                 
            })
          })
    }


    return (
        <View style={{backgroundColor: "white", flex: 1, flexDirection: 'column'}} contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}>
            <ScrollView >
                <View>
                    <FlatList
                        style = {{backgroundColor: "#F2F3F2"}}
                        data = {productImage} 
                        renderItem={({item, id})=> (<Image source = {{uri: item.url}}  style={{width, height: 350, resizeMode: 'contain'}} />)}
                        horizontal
                        pagingEnabled
                        snapToAlignment="center"
                        showsHorizontalScrollIndicator={false}
                        onScroll={handleOnScroll}
                        onViewableItemsChanged={handleOnViewableItemsChanged}
                        viewabilityConfig={viewabilityConfig}
                        />
                    <Pagination data={productImage} scrollX={scrollX}  />
                </View>

                <View style={styles.contentContainer}>
                    <View style = {styles.description}>
                        <Text style = {{fontSize: 25, fontWeight: 'bold'}}>{data.productName}</Text>
                        <Text style =  {{color:  "#7C7C7C"}}>{data.unit}, Price</Text>
                        <Text style =  {{color:  "#7C7C7C"}}>Sale quantity: {data.productQuantity}</Text>
                    </View>

                    <View style={styles.buttoncontainer}>
                        <View style={styles.addbuttons}>
                            <CustomButton type="addbutton" text="-" onPressHandler = {minusHandler} />
                            
                            <View style={{paddingLeft: 5, paddingRight: 5, borderBottomWidth: 1, borderColor: 'black', height: 35, display: 'flex', justifyContent: 'center'}}>
                                <Text style={{fontSize: 16, }}>{buyQuantity}</Text>
                            </View>
                            
                            <CustomButton type="addbutton" text="+" onPressHandler = {plusHandler} />
                        </View>
                        <View>
                            {data.productQuantity <= buyQuantity && <Text style={{color: "red", paddingTop: 10}}>Not to be exceed quantity for sale</Text>}
                        </View>
                        <View style={styles.price}>                    
                            <Text style={{fontWeight: 'bold', fontSize: 20}}>${data.productPrice}</Text>
                        </View>
                    </View>
                    <View style={styles.productdetailsContainer}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', paddingBottom: 10, paddingTop: 5}} >Origin: </Text>                
                        <View style={styles.productDetails}>
                            <Text style={{color: "#7C7C7C"}}>{data.productOrigin}</Text>
                        </View>
                    </View>
                    <View style={styles.productdetailsContainer}>
                        <Text style={{fontSize: 16, fontWeight: 'bold', paddingBottom: 10, paddingTop: 5}} >Description: </Text>                
                        <View style={styles.productDetails}>
                            <Text style={{color: "#7C7C7C"}}>{data.productDescription}</Text>
                        </View>
                    </View>
                </View>

            </ScrollView>
            <View style={styles.footer}>
                <FooterButton onPressHandler = {addtoblk} text="Add To Basket" />
            </View>
        </View>
    )
}

export default ProductDetails

const styles = StyleSheet.create({
    productDetails: {
        // paddingLeft: 10, paddingRight: 10,
    },
    productdetailsContainer: {
        paddingTop: 10,
        paddingBottom: 20,
        borderTopWidth: 1,
        borderColor: "#E2E2E2"
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
    contentContainer: {
        paddingTop: 20,
        paddingBottom: 100,
        paddingHorizontal: 32,
        flex: 1,
    },
    description: {
    },

    buttoncontainer: {
        position: 'relative',
        paddingBottom: 25
    },
    addbuttons: {
        paddingTop: 20,
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        width:  100,
        justifyContent: 'space-between'
    },
    price: {
        position: 'absolute',
        top: "25%",
        right: 20
    }
})