import { ImageBackground, StyleSheet, Image, Text, View } from 'react-native'
import React from 'react'

export default function WelcomeScreen() {

    const handlePress = () =>{ console.log("PRess"); }

    return (
        <ImageBackground 
            style = {styles.background} 
            source={require('../assets/imgs/welcome-bg.png')} >
                <View style={styles.container}>

                    <Image 
                        style = {styles.logo}
                        source = {require('../assets/imgs/carrot.png')}>

                    </Image>

                    <Text style={styles.textHeader}>Welcome{'\n'}to our store</Text>

                    <Text style={styles.subtext}>Get your groceries in as fast as one hour</Text>

                    <Text onPress={handlePress} style = {styles.button}>Get Started</Text>

                </View>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        textAlign: 'center',
        justifyContent: "flex-end"
    },
    container: {
        paddingBottom: 100,
        justifyContent: "flex-end",
        alignItems: 'center',
        resizeMode: 'cover',
        width: "80%",
        marginHorizontal: "10%"
    },
    button: {
        height: 44,
        lineHeight: 44,
        color: "#fff",
        backgroundColor: "#53B175",
        paddingHorizontal: 12,
        width: "100%",
        marginTop: 12,
        borderRadius: 12,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    textHeader: {
        color: '#fff',
        fontSize: 24,
        textAlign: 'center'
    },
    subtext: {
        color: "#fff",
        textAlign: "center",
        fontSize: 10
        
    },
    logo: {
        width: 30,
        height: 30,
        marginVertical: 10
      },
})