import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Grid from '../components/Grid'
import { FlatList } from 'react-native-gesture-handler'
import SearchBar from '../components/SearchBar'

export default function Explore() {

    const {width} = Dimensions.get("screen")


    return (
        <View style={{backgroundColor: "white", flex: 1, display: "flex", flexDirection: 'column'}} contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Find Products</Text>
                <View style={{ width, paddingHorizontal: 20, paddingTop: 20 }}>
                    <SearchBar style={{backgroundColor: "#e5e5e5"}} placeholder = "Type Product Name..."/>
                </View>
            </View>

           

            <ScrollView contentContainerStyle={{paddingTop: 20, paddingBottom: 10}}>
                <Grid type="grocery" />
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