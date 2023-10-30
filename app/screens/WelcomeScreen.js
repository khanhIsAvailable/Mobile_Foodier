import { ImageBackground, StyleSheet, Image, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function WelcomeScreen() {

    const navigation = useNavigation()

    const handlePress = () =>{ 
        navigation.navigate("Login")
     }

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

                    <TouchableOpacity onPress={handlePress} style={styles.button}>
                        <Text style={{color: "white", letterSpacing: 1}}>Get Started</Text>
                    </TouchableOpacity>

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
        color: "#fff",
        backgroundColor: "#53B175",
        paddingHorizontal: 50,
        width: "100%",
        marginTop: 12,
        borderRadius: 12,
        paddingVertical: 16,
        textAlign: 'center',
        fontWeight: 'bold',
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
        width: 28,
        height: 32,
        marginVertical: 10
      },
})