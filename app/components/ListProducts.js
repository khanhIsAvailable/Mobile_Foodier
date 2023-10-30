import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import SearchBar from './SearchBar'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import Grid from './Grid'
import api from '../api'
import RecommendItem from './RecommendItem'
import NotFound from './NotFound'
import ActionSheet from 'react-native-actions-sheet'
import CustomButton from './CustomButton'
import FooterButton from './FooterButton'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'

export default function ListProducts({route, navigation}) {
    const {width} = Dimensions.get("screen")
    const {groceryid = "", name="", specialId = ""} = route.params
    const [searchValue, setSearchValue] = useState(name);
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState([]);
    const actionSheetRef = useRef(null);

    useEffect(()=>{
        var url = (!!searchValue) ? `${api.getProduct}?productName=${searchValue}` : !!groceryid ? `${api.getProduct}?groceryId=${groceryid}` : `${api.getProduct}?specialId=${specialId}`
            
        AsyncStorage.getItem("Token").then(token=>{
            fetch(url, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`
                      }
            })
                .then(response=>response.json())
                .then(responseJson=>{
                    setProducts(responseJson)
                })
                .catch(error=>{
                    console.log(error)
                })
        })
    }, [])


    const submitHandler = (e) => {
        var url = `${api.getProduct}?productName=${e.nativeEvent.text}&groceryId=${!!groceryid?groceryid : ""}`

        AsyncStorage.getItem("Token").then(token=>{
            console.log(url)
            fetch(url, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response=>response.json())
                .then(responseJson=>{
                    // console.log("apiapiapi: ", responseJson)
                    setProducts(responseJson)
                })
                .catch(error=>{
                    console.log(error)
                })
        })
    }

    if(!!product.productID)
        actionSheetRef.current?.show();
    else
        actionSheetRef.current?.hide();
    

    const addToCartHandler = () =>{
        AsyncStorage.getItem("Token").then(token=>{
            AsyncStorage.getItem("UserId").then(userId=>{
              fetch(`${api.addToCart}?userid=${userId}&productid=${product.productID}&quantity=${product.buyQuantity}&note=`,
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
                          text2: `${product.productName}(${product.buyQuantity} x ${product.unit}) Added To Basket`
                        });
                        
                      } else {
                        Toast.show({
                          type: 'error',
                          text1: 'Error',
                          text2: `An error occurs`
                        });
                      }
                      setTimeout(()=>{actionSheetRef.current?.hide();},600)
                  })
                  .catch(error => {
                      console.log(error)
                  })
                 
            })
          })
    }

    const minusPressHandler = () => {
        if(product.buyQuantity <= 1)
            actionSheetRef.current?.hide();
        else 
        setProduct({...product, buyQuantity: product.buyQuantity - 1})
    }
    const plusPressHandler = () => {
        if(product.buyQuantity >= product.productQuantity)
            {}
        else 
            setProduct({...product, buyQuantity: product.buyQuantity + 1})
    }


    return (
        <View style={{display: "flex", flex: 1, flexDirection: 'column', position: 'relative', backgroundColor: "white" }}>
            <ActionSheet ref={actionSheetRef}>
                <View style={{position: 'relative'}}>
                <View style={{position: "absolute", top: 0, left: 0, borderBottomWidth: 1, borderColor: "#e7e7e7"}}>
                    <Text style={{letterSpacing: 2, fontSize: 24, width, fontWeight: 'bold', color: "#53B175", paddingHorizontal: 20, paddingVertical: 15}}>Item Validation</Text>
                </View>

                <View style={{paddingTop: 70, paddingHorizontal: 20}}>
                    <View style={{height: 40}}>
                    <Text style={styles.text}>Product: {product.productName}</Text>
                    </View>
                    <View style={{height: 40}}><Text style={styles.text}>Shop: {product.shopName}</Text></View>
                    
                    <View style={{height: 40}}><Text style={styles.text}>Origin: {product.productOrigin}</Text></View>

                    <View style ={{display: "flex", flexDirection: "row", alignItems: 'center'}}>
                    <View><Text style={styles.text}>Quantity: </Text></View>
                    <View style={styles.addbuttons}>
                        <CustomButton type="addbutton" text="-" onPressHandler = {minusPressHandler} />
                        
                        <View style={{paddingLeft: 5, paddingRight: 5, borderBottomWidth: 1, borderColor: 'black', height: 35, display: 'flex', justifyContent: 'center'}}>
                            <Text style={{fontSize: 16, }}>{product.buyQuantity}</Text>
                        </View>
                        
                        <CustomButton type="addbutton" text="+" onPressHandler = {plusPressHandler} />
                    </View>
                    {
                        product.buyQuantity >= product.productQuantity &&
                        <View style={{ width : 150, paddingHorizontal: 10}}>
                            <Text style={{color: "red"}}>Not to be exceed quantity for sale</Text>
                        </View>

                    }
                    </View>

                </View>

                <View style= {{width, height: 100, marginTop: 20, display: 'flex', alignItems: 'center'}}>
                    <FooterButton onPressHandler={addToCartHandler} text="Add To Cart" />
                </View>


                </View>
            </ActionSheet>
            
            <View style={{height: 80, position: "absolute", top: 100, left: 0, width, paddingHorizontal: 20, borderBottomWidth: 1, borderColor: "#e5e5e5" }}>
                <SearchBar searchValue={searchValue} setSearchValue = {setSearchValue} submitHandler = {submitHandler} style={{backgroundColor: "#e5e5e5"}} placeholder = "Type Product Name..."/>
            </View>

            
            <View style={{marginTop: 190}} >
                <ScrollView>
                    {products.length != 0 && <Grid setProduct = {setProduct} type="product" products = {products} />  || <NotFound/>}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    addbuttons: {
        display: 'flex',
        flexDirection: "row",
        alignItems: 'center',
        width:  100,
        justifyContent: 'space-between',
        marginLeft: 20
      },
})