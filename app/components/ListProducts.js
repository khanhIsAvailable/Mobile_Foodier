import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import { ScrollView } from 'react-native-gesture-handler'
import Grid from './Grid'
import api from '../api'

export default function ListProducts({route, navigation}) {
    const {width} = Dimensions.get("screen")
    const {groceryid, name} = route.params
    const [searchValue, setSearchValue] = useState(name);
    const [products, setProducts] = useState([]);
    console.log("searchValuesearchValuesearchValue: ", !!searchValue, groceryid)
    useEffect(()=>{
        var url = (!!searchValue) ? api.getProduct + "?productName=" + searchValue : api.getProduct + "?groceryId=" + groceryid
        fetch(url)
        .then(response=>response.json())
        .then(responseJson=>{
            setProducts(responseJson)
        })
        .catch(error=>{
            console.log(error)
        })
    }, [])


    const submitHandler = (e) => {
        
    }

    return (
        <View style={{display: "flex", flex: 1, flexDirection: 'column', position: 'relative', }}>
            <View style={{height: 100, position: "absolute", top: 100, left: 0, width, paddingHorizontal: 20 }}>
                <SearchBar searchValue={searchValue} setSearchValue = {setSearchValue} submitHandler = {submitHandler} style={{backgroundColor: "#e5e5e5"}} placeholder = "Type Product Name..."/>
            </View>
            <ScrollView>
                <Grid type="product" products = {products} />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({})