import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import Grid from './Grid'
import api from '../api'
import RecommendItem from './RecommendItem'
import NotFound from './NotFound'

export default function ListProducts({route, navigation}) {
    const {width} = Dimensions.get("screen")
    const {groceryid, name} = route.params
    const [searchValue, setSearchValue] = useState(name);
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        var url = (!!searchValue) ? `${api.getProduct}?productName=${searchValue}` : `${api.getProduct}?groceryId=${groceryid}`
        
        fetch(url)
            .then(response=>response.json())
            .then(responseJson=>{
                setProducts(responseJson)
            })
            .catch(error=>{
                console.log(error)
            })
    }, [])
    console.log(groceryid, products)

    const submitHandler = (e) => {
        var url = `${api.getProduct}?productName=${e.nativeEvent.text}&groceryId=${!!groceryid?groceryid : ""}`
        console.log(url)
        fetch(url)
            .then(response=>response.json())
            .then(responseJson=>{
                setProducts(responseJson)
            })
            .catch(error=>{
                console.log(error)
            })
    }

    console.log('rerender')

    return (
        <View style={{display: "flex", flex: 1, flexDirection: 'column', position: 'relative', backgroundColor: "white" }}>
            <View style={{height: 80, position: "absolute", top: 100, left: 0, width, paddingHorizontal: 20, borderBottomWidth: 1, borderColor: "#e5e5e5" }}>
                <SearchBar searchValue={searchValue} setSearchValue = {setSearchValue} submitHandler = {submitHandler} style={{backgroundColor: "#e5e5e5"}} placeholder = "Type Product Name..."/>
            </View>

            
            <View style={{marginTop: 190}} >
                <ScrollView>
                    {products.length != 0 && <Grid type="product" products = {products} />  || <NotFound/>}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({})