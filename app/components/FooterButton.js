import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

export default function FooterButton(props) {
  return (
    <TouchableOpacity style={{...styles.addtobasket, backgroundColor: (props.text.toUpperCase() != "LOG OUT")? "#53B175" : "#F2F3F2",}}>
        {props.text.toUpperCase() == "LOG OUT" ? <FontAwesomeIcon style={{position: "absolute", left: 20}} icon={faRightFromBracket} color='#53B175' size={26} /> : ""}
        <Text style={{color: props.text.toUpperCase() != "LOG OUT" ? "white": "#53B175", fontWeight: "500", fontSize: 16, letterSpacing: 1}}>{props.text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    addtobasket: {
        width: "80%",
        height: "60%",
        borderRadius: 20,
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center',
        position: 'relative'
    },
})