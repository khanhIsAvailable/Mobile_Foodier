import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GroceryItem from './GroceryItem'
// import RecommendItem from './RecommendItem'

export default function Grid({type, data}) {
    // var tag = (type=='grocery') ? GroceryItem : RecommendItem
    var Tag = GroceryItem
    

    return (
        <View style={styles.container}>
            {
                data.map((item,index)=>{
                    return (
                        <Tag data={item} key={index} />
                    )
                })
            }
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