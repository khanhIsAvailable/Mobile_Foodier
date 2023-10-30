import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Shop from './app/screens/Shop'
import WelcomeScreen from './app/screens/WelcomeScreen'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCartShopping, faHeart, faList, faShop, faUser } from '@fortawesome/free-solid-svg-icons'
import Cart from './app/screens/Cart'
import Account from './app/screens/Account'
import Explore from './app/screens/Explore'
import AsyncStorage from '@react-native-async-storage/async-storage'
const Tab = createBottomTabNavigator()

const TabItemName = {
    Shop: "Shop",
    Explore: 'Explore',
    Cart: 'Cart',
    Favourite: 'Favourite',
    Account: 'Account',
    ProductDetails: "ProductDetails"
}

const MainContainer = ({route}) => {
  const {setIsSignIn} = route.params
  return (
        <Tab.Navigator 
            initialRouteName= {TabItemName.Shop}

            tabBarOptions={{
              activeTintColor: '#53B175',
              inactiveTintColor: '#181725',
              labelStyle: { paddingBottom: 5, fontSize: 10 },
              style: { height: 70, paddingTop: 20},
            }}

            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  let rn = route.name;
      
                  if (rn === TabItemName.Shop) {
                    iconName = faShop
                  } else if (rn === TabItemName.Explore) {
                    iconName = faList;
                  } else if (rn === TabItemName.Cart) {
                    iconName = faCartShopping;
                  } else if (rn === TabItemName.Favourite) {
                    iconName = faHeart;
                  } else if (rn === TabItemName.Account) {
                    iconName = faUser;
                  }
                  return <FontAwesomeIcon icon= {iconName} style={{color: focused ? "#53B175" : "#181725"}} />
                },
                headerShown: false,
                
              })}

            
        >

            <Tab.Screen name={TabItemName.Shop} component={Shop} />
            <Tab.Screen name={TabItemName.Explore} component={Explore} />
            <Tab.Screen name={TabItemName.Cart} component={Cart} />
            <Tab.Screen name={TabItemName.Account} initialParams={{setIsSignIn}} component={Account} />
        </Tab.Navigator>
  )
}

export default MainContainer

const styles = StyleSheet.create({})