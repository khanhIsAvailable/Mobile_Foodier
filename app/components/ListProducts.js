import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SearchBar from './SearchBar'

export default function ListProducts({groceryid}) {
    const {width} = Dimensions.get("screen")
    
    const [searchValue, setSearchValue] = useState("");


    console.log(groceryid)
    return (
        <View style={{display: "flex", flex: 1, flexDirection: 'column', position: 'relative', }}>
            <View style={{height: 100, position: "absolute", top: 100, left: 0, width, paddingHorizontal: 20 }}>
                <SearchBar searchValue={searchValue} setSearchValue = {setSearchValue} style={{backgroundColor: "#e5e5e5"}} placeholder = "Type Product Name..."/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})