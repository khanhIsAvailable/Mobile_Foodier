import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { Dimensions } from 'react-native'
import groceryImage from '../assets/groceries/'
import { useNavigation } from '@react-navigation/native'

export default function VerticalRetangleGrocery({data, width}) {
    
    console.log(data)
    const navigation = useNavigation();

    const handleClick = () =>{ 
        navigation.navigate("ListProducts", {groceryid: data.id});
    }




    return (
        <TouchableOpacity onPress={handleClick} style={{backgroundColor: data.backgroundColor.replaceAll(" ",""), width: (width-60)/2, marginVertical: 5, borderRadius: 18, borderWidth: 2, borderColor: data.borderColor.replaceAll(" ","") } }>
            <View style={{display: "flex", height: 200,  flex: 1, flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                <Image source={groceryImage[data.image]} />
                <View>
                    <Text>
                        {data.description}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({})