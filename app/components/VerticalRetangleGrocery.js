import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { Dimensions } from 'react-native'

export default function VerticalRetangleGrocery({data, width}) {
    console.log(data)
    return (
        <TouchableOpacity style={{backgroundColor: data.bg, width: (width-60)/2, marginVertical: 5, borderRadius: 18, borderWidth: 2, borderColor: "red" } }>
            <View style={{display: "flex", height: 200,  flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <Image source = {data.src} />
                <View>
                    <Text>
                        {data.name}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})