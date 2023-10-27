import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Grid from '../components/Grid'
import { FlatList } from 'react-native-gesture-handler'

export default function Explore() {

    var data = [
        {
          id: 1,
          name: "Pulse",
          bg: "#F8A44C",
          src: require("../assets/groceries/pulse.png")
        },
        {
          id: 2,
          name: "Rice",
          bg: "#53B175",
          src: require("../assets/groceries/rice.png")
        },
        {
            id: 3,
            name: "Pulse",
            bg: "#F8A44C",
            src: require("../assets/groceries/pulse.png")
          },
      ]

    return (
        <View style={{backgroundColor: "white", flex: 1, display: "flex", flexDirection: 'column'}} contentContainerStyle={{flexGrow: 1}}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Find Products</Text>
            </View>

            <View>
                <Grid type="grocery" />
            </View>
        
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 60,
        paddingBottom: 20,
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