import { FlatList, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import RecommendItem from './RecommendItem'

const RecommendSlider = ({title, data, type="product"}) => {
  const seeallOnPressHandler = () =>{
    console.log('see all')
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={seeallOnPressHandler} style={styles.seeallContainer}>
          <Text style= {styles.seeall}>See all</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data = {data} 
          renderItem={({item, id})=> (<RecommendItem type= {type} data = {item} key = {id} />)}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
        />

      </View>
    </View>
  )
}

export default RecommendSlider

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    width: '100%',
  },
  header: {
    position: "relative",
    height: 45
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  seeallContainer: {
    position: "absolute",
    top: 5,
    right: 0,
  },
  seeall: {
    color: "#53B175",
    fontSize: 13,
    fontWeight: 'bold'
  },
  
})