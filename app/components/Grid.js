import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GroceryItem from './GroceryItem'
import RecommendItem from './RecommendItem'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import VerticalRetangleGrocery from './VerticalRetangleGrocery'
import { Dimensions } from 'react-native'

import api from '../api'
import NotFound from './NotFound'

  

export default function Grid({type, products = [], groceries = []}) {
    var data = [...products, ...groceries]
    var Tag = type == 'product' ? RecommendItem : VerticalRetangleGrocery


    const {width} = Dimensions.get('screen');

   

    return (
        <View style={styles.container}  >
           <ScrollView 
                scrollIndicatorInsets={{ right: 1 }}
                showsVerticalScrollIndicator = {false}
                contentContainerStyle={{flex: 1,display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
            {
                data.map((item,index)=>{
                    return (
                        <Tag width={width} data={item} type = {type} key={index} />
                    )
                })
            }
            </ScrollView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection:"row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        
    }
})