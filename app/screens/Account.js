import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import FooterButton from '../components/FooterButton'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight, faBagShopping, faAddressCard, faLocationDot, faCreditCard, faTicket, faBell, faCircleQuestion, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { TouchableOpacity } from 'react-native'



function AccountOptionItem({item}){
    console.log(item)
    return(
        <TouchableOpacity style={{display: "flex",  flexDirection: 'row', paddingVertical: 20, paddingHorizontal: 30, borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#e7e7e7"}}>
            <View style={{ flex: 0.2 }}>
                <FontAwesomeIcon icon={item.icon}   size={20} />
            </View>
            <View style={{ flex: 0.7}}>
                <Text style={{fontSize: 16, fontWeight: 500}}>{item.text}</Text>
            </View>
            <View style={{ flex: 0.1}}>
                <FontAwesomeIcon icon={faChevronRight} />
            </View>
        </TouchableOpacity>
    )
}

export default function Account() {

    const portraitWidth = 100

    var options = [
        {icon: faBagShopping, text: "Orders"},
        {icon: faAddressCard, text: "My Details"},
        {icon: faLocationDot, text: "Delivery Address"},
        {icon: faCreditCard, text: "Payment Method"},
        {icon: faTicket, text: "Promo"},
        {icon: faBell, text: "Notifications"},
        {icon: faCircleQuestion, text: "Helps"},
        {icon: faCircleInfo, text: "About"},
    ]

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}>
                <View style={{display: "flex", flexDirection: 'row', marginHorizontal: 30, marginBottom: 25}}>
                    <View style={{backgroundColor: "#53B175", width: portraitWidth, height: portraitWidth, display: "flex", justifyContent: 'center', alignItems: "center", borderRadius: portraitWidth/2, overflow: 'hidden', borderWidth: 1, borderColor: "#53B175"}}>
                        <Image style={{width: (portraitWidth-4) , height: (portraitWidth-4), borderRadius: (portraitWidth-4)/2}} source={{uri: "https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/512/Person-Red-Hair-3d-Default-icon.png"}} />
                    </View>
                    <View style={{paddingHorizontal: 20, alignSelf: 'center'}}>
                        <Text style={{fontSize: 18}}>Name Name Name</Text>
                        <Text style={{fontSize: 12, color: "#7C7C7C"}}>EmailEmail@gmail.com</Text>
                    </View>
                </View>

                {options.map((item, idx)=>(<AccountOptionItem key = {idx}  item = {{...item}} />))}

            </ScrollView>

            <View style={styles.footer}>
                <FooterButton text="Log Out" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        position: 'relative',
        display: "flex",
        flexDirection: 'column',
        flex: 1,
        backgroundColor: "white"
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