import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ColorfulCarrot from '../components/ColorfulCarrot'
import Location from  '../components/Location.js'
import SearchBar from '../components/SearchBar'
import Banner from '../components/Banner.js'
import RecommendSlider from '../components/RecommendSlider'
import api from '../api'
import { useNavigation } from '@react-navigation/native'
import ActionSheet from 'react-native-actions-sheet'
import { Dimensions } from 'react-native'
import CustomButton from '../components/CustomButton'
import FooterButton from '../components/FooterButton'

export default function Shop({navigation}) {
  var location = "Ha Noi, Viet Nam"
  const actionSheetRef = useRef(null);
  var images = 
    [
        {id: 1, src: require( "../assets/banners/banner-1.png")}, 
        {id: 2, src: require("../assets/banners/banner-2.png")},
        {id: 3, src: require("../assets/banners/banner-3.png")},
    ];

  const {width} = Dimensions.get("screen")
  const [groceries, setGrocery] = useState([])
  const [exclusiveOffer, setExclusiveOffer] = useState([])
  const [bestSelling, setBestSelling] = useState([])

  const [product, setProduct] = useState({})

  // const navigation = useNavigation();

  const submitHandler = (e) => {
      navigation.navigate("ListProducts", {name: e.nativeEvent.text})
  }


  useEffect(function(){
    fetch(api.getGrocery)
            .then(response => response.json())
            .then(responseJSON =>{
                setGrocery(responseJSON);
            })
            .catch(error => {
                console.log(error)
            })

    fetch(api.getExclusiveOffer)
            .then(response => response.json())
            .then(responseJSON =>{
                setExclusiveOffer(responseJSON);
            })
            .catch(error => {
                console.log(error)
            })
    fetch(api.getBestSelling)
            .then(response => response.json())
            .then(responseJSON =>{
                setBestSelling(responseJSON);
            })
            .catch(error => {
                console.log(error)
            })

  }, [])

  if(!!product.productID)
    actionSheetRef.current?.show();
  else
    actionSheetRef.current?.hide();
  console.log('rerender', product)
  return (
    <SafeAreaView>
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
                  <CustomButton type="addbutton" text="-" onPressHandler = {()=>{}} />
                  
                  <View style={{paddingLeft: 5, paddingRight: 5, borderBottomWidth: 1, borderColor: 'black', height: 35, display: 'flex', justifyContent: 'center'}}>
                      <Text style={{fontSize: 16, }}>1</Text>
                  </View>
                  
                  <CustomButton type="addbutton" text="+" onPressHandler = {()=>{}} />
              </View>
            </View>

          </View>

          <View style= {{width, height: 100, marginTop: 20, display: 'flex', alignItems: 'center'}}>
            <FooterButton onPressHandler={()=>{console.log("add")}} text="Add To Cart" />
          </View>


        </View>
      </ActionSheet>
      
      
      
      <ScrollView>
        <View style={styles.container}>

          <View style={styles.header}>
              <ColorfulCarrot />
              <Location location = {location}/>
          </View>

          <SearchBar submitHandler = {submitHandler} placeholder = 'Search store, product,...'/>

          <Banner images = {  images } />

          <View style={styles.productIntro}>  
            <RecommendSlider setProduct= {setProduct} data = {exclusiveOffer} title = "Exclusive Offer" />
            <RecommendSlider setProduct = {setProduct} data = {bestSelling} title = "Best Selling" />
            <RecommendSlider setProduct = {setProduct} data = {groceries} type='grocery' title = "Groceries" />
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 60,
        width: "100%",
        backgroundColor: "white"
    },
    header: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%"
    },
    productIntro: {
      paddingVertical: 20
    },
    addbuttons: {
      display: 'flex',
      flexDirection: "row",
      alignItems: 'center',
      width:  100,
      justifyContent: 'space-between',
      marginLeft: 20
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
    }
})