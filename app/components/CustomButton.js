import { StyleSheet, Text, TouchableOpacity  } from 'react-native'
import React from 'react'

const CustomButton = ({text, onPressHandler, type}) => {

    var stl = {};
    if(type == 'addbutton'){
        stl.text = {
            color: text == '-'? "#B3B3B3":  "white",
        },
        stl.container = {
            backgroundColor: text == '-'? "transparent":  "#53B175",
            borderWidth: 1, 
            borderColor: '#B3B3B3',
            width: 30,
            height: 30
        }
    }

    return (
        <TouchableOpacity style={(type == 'square') ? {... styles.button, ...squareStyle} : (type == 'addbutton')? {...styles.button, ...squareStyle, ...stl.container} : styles.button} onPress= {onPressHandler}>
            <Text style={ type == 'addbutton'?  {...styles.text, ...stl.text} : styles.text}>{text}</Text>
        </TouchableOpacity >
    )
}

export default CustomButton

const squareStyle = {
    width: 35,
    height: 35
}

const styles = StyleSheet.create({
    button: {
        display: "flex",
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#53B175",
        borderRadius: 10,
        position: "relative"
        
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        position: "absolute",
    }

})


