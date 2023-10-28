import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Shop from './app/screens/Shop'
import ProductDetails from "./app/components/ProductDetails"
import MainContainer from './MainContainer'
import ListProducts from './app/components/ListProducts'

const Stack = createStackNavigator()

const StackNav = () => {

  const navStyle = {
    headerTransparent: true,
    headerStyle: {
      height: 80,
    }, 
    headerTintColor: '#F3603F',
    headerTitleStyle: {
      fontWeight: 'bold',
      color: "white",
      fontSize: 12,
      letterSpacing: 1
    },

  }

  return (
    <NavigationContainer>
        <Stack.Navigator >
            <Stack.Screen name="MainContainer" component={MainContainer}  options={{headerShown: false, ...navStyle, title:"Back"}} />
            <Stack.Screen name="ProductDetails" component={ProductDetails}  
              options={{ 
                title: '',  
                ...navStyle
                }}/>
            <Stack.Screen name="ListProducts" component={ListProducts}  
              options={{ 
                title: '',  
                ...navStyle,
                headerBackTitle: "Explore"
                }}
                />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNav