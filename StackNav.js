import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Shop from './app/screens/Shop'
import ProductDetails from "./app/components/ProductDetails"
import MainContainer from './MainContainer'

const Stack = createStackNavigator()

const StackNav = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator >
            <Stack.Screen name="MainContainer" component={MainContainer}  options={{headerShown: false}} />
            <Stack.Screen name="ProductDetails" component={ProductDetails} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNav