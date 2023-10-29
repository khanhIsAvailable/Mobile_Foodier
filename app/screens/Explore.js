import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Grid from '../components/Grid'
import { FlatList } from 'react-native-gesture-handler'
import SearchBar from '../components/SearchBar'
import api from '../api'

export default function Explore({navigation, route}) {

    const {width} = Dimensions.get("screen")

    const [groceries, setGroceries] = useState([])

    const submitHandler = (e) =>{
        navigation.navigate("ListProducts", {name: e.nativeEvent.text})
    }

    useEffect(function(){
        fetch(api.getGrocery)
            .then(response=>response.json())
            .then(responseJson => { setGroceries(responseJson) })
            .catch(error=>{
                console.log(error)
            })
    }, [])

    return (
        <View style={{backgroundColor: "white", flex: 1, display: "flex", flexDirection: 'column'}} contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Find Products</Text>
                <View style={{ width, paddingHorizontal: 20, paddingTop: 20 }}>
                    <SearchBar submitHandler = {submitHandler} style={{backgroundColor: "#e5e5e5"}} placeholder = "Type Product Name..."/>
                </View>
            </View>

            <ScrollView contentContainerStyle={{paddingTop: 20, paddingBottom: 10,}}>
                {groceries.length != 0 && <Grid type="grocery" groceries = {groceries} />}
            </ScrollView>
        
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 60,
        // paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: "#e7e7e7",
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center',
        letterSpacing: 1
    },
})