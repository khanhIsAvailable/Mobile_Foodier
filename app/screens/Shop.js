import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import ColorfulCarrot from '../components/ColorfulCarrot'
import Location from  '../components/Location.js'
import SearchBar from '../components/SearchBar'
import Banner from '../components/Banner.js'
import RecommendSlider from '../components/RecommendSlider'
import api from '../api'

export default function Shop() {
  var location = "Ha Noi, Viet Nam"

  var images = 
    [
        {id: 1, src: require( "../assets/banners/banner-1.png")}, 
        {id: 2, src: require("../assets/banners/banner-2.png")},
        {id: 3, src: require("../assets/banners/banner-3.png")},
    ];


  var productSlideData = [
    {
      id: 1,
      name: "Organic Bananas",
      unit: "7pcs",
      price: 4.99,
      src: require("../assets/products/banana.png")
    },
    {
      id: 2,
      name: "Red Apples",
      unit: "1kg",
      price: 4.99,
      src: require("../assets/products/apple.png")
    },
    {
      id: 3,
      name: "Peppers",
      unit: "0.5kg",
      price: 8.89,
      src: require("../assets/products/pepper.png")
    },

  ]


  const [searchValue, setSearchValue] = useState("")
  
  const [groceries, setGrocery] = useState([])


  useEffect(function(){
    fetch(api.getGrocery)
            .then(response => response.json())
            .then(responseJSON =>{
                setGrocery(responseJSON);
            })
            .catch(error => {
                console.log(error)
            })
  }, [])



  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>

          <View style={styles.header}>
              <ColorfulCarrot />
              <Location location = {location}/>
          </View>

          <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} placeholder = 'Search store, product,...'/>

          <Banner images = {  images } />

          <View style={styles.productIntro}>  
            <RecommendSlider data = {productSlideData} title = "Exclusive Offer" />
            <RecommendSlider data = {productSlideData} title = "Best Selling" />
            <RecommendSlider data = {groceries} type='grocery' title = "Groceries" />
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
    
})