import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import CartItem from '../components/CartItem'
import FooterButton from '../components/FooterButton';

export default function Cart() {

    var data = [{id: 1}, {id: 2}, {id: 3},{id: 4},{id: 5},{id: 6},{id: 7}];

    return (
    <View style={{backgroundColor: "white", flex: 1, display: "flex", flexDirection: 'column'}} contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}>
        <View style={styles.header}>
            <Text style={styles.headerText}>My Cart</Text>
        </View>

        <View style={{paddingBottom: 200}}>
            <FlatList
                data = {data} 
                style = {{paddingHorizontal: 25, }}
                renderItem={({item, id})=> (<CartItem data= {item} key={id}  />)}
                snapToAlignment = "start"
            />
        </View>

        <View style={styles.footer}>
            <View style={{display: "flex", flexDirection: 'row', width: "100%", justifyContent: 'flex-end', paddingVertical: 6, paddingHorizontal: 45}}>
                <Text style={{fontWeight: "bold", paddingRight: 20, fontSize: 10}}>TOTAL: </Text>
                <Text style={{fontWeight: 'bold', fontSize: 12, letterSpacing: 1, color: '#53B175'}}>$100.59</Text>
            </View>
            <FooterButton text="Check Out" />
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    header: {
        paddingTop: 60,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: "#e7e7e7",
    },
    headerText: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: 'center',
        letterSpacing: 1
    },
    footer: {
        height: 100, 
        backgroundColor: 'white', 
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: 'center',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderColor: "#E7E7E7"
    },
})