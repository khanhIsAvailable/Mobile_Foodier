import { StyleSheet, TextInput, Image, View } from 'react-native'
import React from 'react'

export default function SearchBar(props) {
  return (
    <View style={styles.container}>
        <Image style={styles.searchIcon} source={require("../assets/imgs/search-icon.png")}/>
        <TextInput style={styles.searchBar} placeholder={props.placeholder} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F2F3F2",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: "center",
        marginVertical: 12,
        borderRadius: 12,
    },
    searchIcon: {
        width: 18,
        height: 18,
        marginHorizontal: 12
    },
    searchBar: {
        backgroundColor: "#F2F3F2",
        borderColor: "transparent",
        paddingVertical: 15,
        width: "80%",
    }
})