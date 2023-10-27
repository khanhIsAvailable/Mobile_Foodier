import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import GroceryItem from './GroceryItem'
import RecommendItem from './RecommendItem'
import { ScrollView } from 'react-native-gesture-handler'
import VerticalRetangleGrocery from './VerticalRetangleGrocery'
import { Dimensions } from 'react-native'
import axios from 'axios';

export default function Grid({type}) {
    
    var Tag = type == 'product' ? RecommendItem : VerticalRetangleGrocery
    
    var data = []
    // axios({
    //     method: 'GET', 
    //     url: 'https://localhost:7299/api/Grocery/Get-grocery', 
        
    // })
    // .then((response) => {
    //     data = response
    // })
    // .catch((error) => {
    //     console.error('Error:', error);
    // });

    useEffect(function(){
        axios.get('https://localhost:7299/api/Grocery/Get-grocery')
            .then((response) => {
                console.log("response: ", response )
                if (response.data && Array.isArray(response.data)) {
                } else {
                console.log('Empty or invalid data in the API response.');
                }
            })
            .catch((error) => {
                console.error('API request error:', error);
            });
    }, [])
     

    console.log(data)
    const {width} = Dimensions.get('screen');

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow: 1, display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
            {
                data.map((item,index)=>{
                    return (
                        <Tag width={width} data={item} key={index} />
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
        paddingHorizontal: 20
    }
})