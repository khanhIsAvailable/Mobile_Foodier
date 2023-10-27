import { StyleSheet, View, FlatList, Animated } from "react-native";
import React, {useRef, useState} from "react";
import SlideItem from "./SlideItem.js"
import Pagination from "./Pagination.js"

export default function Banner({images}){

    // const [index, setIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;


    

    const handleOnScroll = event => {
        Animated.event(
        [
            {
            nativeEvent: {
                contentOffset: 
                    {
                        x: scrollX,
                    },
                },
            },
        ],
        {
            useNativeDriver: false,
        },
        )(event);
    };

    const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
        // setIndex(viewableItems[0].index);
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 50,
    }).current;



    return (
        <View>
            <FlatList 
                data = {images} 
                renderItem={({item})=> (<SlideItem dataImage={item}/>)}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={handleOnScroll}
                onViewableItemsChanged={handleOnViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                
            />
            <Pagination data={images} scrollX={scrollX}  />
        </View>
    )
}

const styles = StyleSheet.create({
   
})