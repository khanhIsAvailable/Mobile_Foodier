import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

const ProductDetails = (props) => {
    const {data} = {...props.route.params}
    console.log(data)
    return (
        <ScrollView>
            <View>
                <Image source = {data.src} />
            </View>

            <View>
                <View>
                    <Text>{data.name}</Text>
                    <Text>{data.unit}</Text>
                </View>

                <View>
                    <Text>{data.price}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default ProductDetails

const styles = StyleSheet.create({})