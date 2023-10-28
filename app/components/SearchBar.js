import { StyleSheet, TextInput, Image, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function SearchBar({searchValue, setSearchValue, style, placeholder}) {


    const searchInput = useRef()

    const handleOnChange = (text) => {
        setSearchValue(text)
    }

    const handleClickX = () =>{
        setSearchValue("")
    }
    console.log("searchValue: ", searchValue)

    return (
        <View style={{...styles.container, ...style}}>
            <Image style={styles.searchIcon} source={require("../assets/imgs/search-icon.png")}/>
            <TextInput 
                ref={searchInput}
                value={searchValue}
                style={styles.searchBar}
                placeholder={placeholder}
                onChangeText={handleOnChange}
                />
            { searchValue != "" &&
                <TouchableOpacity activeOpacity={0.8} onPress={handleClickX} style={{borderRadius: 10, width: 20, height: 20, backgroundColor: "#c7c7c7", display: 'flex', justifyContent: 'center', alignItems: "center"}}>
                    <FontAwesomeIcon icon={faX} color="white" size={12}  />
                </TouchableOpacity>
            }
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
        paddingVertical: 16,
        position: "relative",
        zIndex: 1
    },
    searchIcon: {
        width: 18,
        height: 18,
        marginHorizontal: 12
    },
    searchBar: {
        borderColor: "transparent",
        height: 20,
        width: "80%",
    }
})