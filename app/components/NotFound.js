import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function NotFound() {
  return (
    <View styles={styles.container}>
      <Text style = {{textAlign: "center",  fontWeight: "bold", fontSize: 18, paddingHorizontal: 40}}>Oops, Not Found Any Products Like That...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        justifyContent: 'center',
        alignItems: "center",
    }
})