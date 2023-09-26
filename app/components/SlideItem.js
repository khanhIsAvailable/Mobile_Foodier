import { StyleSheet, View, Image, Dimensions, Easing, Animated } from "react-native";
import React from "react";

const {width} = Dimensions.get("screen")


export default function SlideItem({dataImage}){
    console.log(width)
    const translateXImage = new Animated.Value(40);
    Animated.timing(translateXImage, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
        easing: Easing.bounce,
    }).start();
    return (
        <View style = {styles.container}>
            <Animated.Image 
                source = {dataImage.src}
                resizeMode="cover"
                style={[
                    styles.image,
                    {
                        transform: [
                            {
                                translateX: translateXImage,
                            },
                        ],
                    },
                ]}
                />
        </View>
        
     )
}
const styles = StyleSheet.create({
   container: {
        width: width-40,
   },
   image: {
        width: width-40,
        borderRadius: 10,
    }

})