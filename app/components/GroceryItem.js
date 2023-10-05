import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GroceryItem = ({data}) => {
  
  const {width} = Dimensions.get('screen');

  var rWidth = width/2 - 20 - 8
  return (
    <View 
        style={{
          ...styles.container,
            backgroundColor: `rgba(${data.r},${data.g},${data.b},${data.a})`, 
            borderColor: `rgba(${data.r},${data.g},${data.b},0.7)`,
            width: rWidth,
        }} 
    >
        <Image style={styles.img} source={data.src} />
        <View style={styles.content}>
          <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 16}}>{data.title}</Text>
        </View>
    </View>
  )
}

export default GroceryItem

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "thistle",
    borderRadius: 18,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 20,
    paddingRight: 20,
    marginVertical: 8,
    height: 260,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    flex: .6,
    objectFit: "contain"
  },
  content: {
    paddingHorizontal: 20,
    
  }
})