import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function Location(props) {
  return (
    <View style= {styles.container}>
      <Image 
        style={styles.locationLogo} 
        source={require("../assets/imgs/location.png")}></Image>
      <Text style={styles.locationText}>{props.location}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        paddingVertical: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    locationLogo: {
        width: 16,
        height: 19,
        marginHorizontal: 5
    },
    locationText: {
        color: "#4C4F4D"
    }
})