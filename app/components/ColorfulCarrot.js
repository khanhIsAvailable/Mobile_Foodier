import { StyleSheet, Image } from 'react-native'
import React from 'react'

export default function ColorfulCarrot() {
  return (
    <Image
        style={styles.colorfulcarrot}
        source={require("../assets/imgs/colorfulcarrot.png")}
    ></Image>
  )
}

const styles = StyleSheet.create({
    colorfulcarrot: {
        width: 32,
        height: 38,
    }
})