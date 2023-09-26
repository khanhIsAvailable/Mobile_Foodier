import { StyleSheet, Text, TouchableOpacity  } from 'react-native'
import React from 'react'

const CustomButton = ({text, onPressHandler, type}) => {

    return (
        <TouchableOpacity style={(type == 'square') ? {... styles.button, ...squareStyle} : styles.button} onPress= {onPressHandler}>
            <Text style={styles.text}>{text}</Text>
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


