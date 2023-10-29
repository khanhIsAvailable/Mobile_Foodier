import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import GroceryItem from './GroceryItem'
import RecommendItem from './RecommendItem'
import { ScrollView } from 'react-native-gesture-handler'
import VerticalRetangleGrocery from './VerticalRetangleGrocery'
import { Dimensions } from 'react-native'

import api from '../api'

  

export default function Grid({type, products = []}) {
    var [data, setData] = useState([]);
    
    var Tag = type == 'product' ? RecommendItem : VerticalRetangleGrocery
    
    useEffect(function(){
        if(type != 'product')
            fetch(api.getGrocery)
                .then(response => response.json())
                .then(responseJSON =>{
                    setData(responseJSON);
                })
                .catch(error => {
                    console.log(error)
                })
        else {
            setData(products)
        }
    }, [])


    const {width} = Dimensions.get('screen');

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow: 1, display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
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
        
        display: "flex",
        flexDirection:"row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    }
})