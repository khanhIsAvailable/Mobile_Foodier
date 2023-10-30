import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Shop from './app/screens/Shop'
import ProductDetails from "./app/components/ProductDetails"
import MainContainer from './MainContainer'
import ListProducts from './app/components/ListProducts'
import Login from './app/screens/Login'
import WelcomeScreen from './app/screens/WelcomeScreen'
import Register from './app/screens/Register'
import CheckOut from './app/screens/CheckOut'

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


  const [isSignIn, setIsSignIn] = useState(false)

  return (
    <NavigationContainer>
        <Stack.Navigator >
          {!isSignIn ? 
            <>
              <Stack.Screen name="WelcomeScreen" component={WelcomeScreen}  options={{headerShown: false}} />
              <Stack.Screen name="Register" component={Register} options={{headerShown: false}} />
              <Stack.Screen name="Login" initialParams={{setIsSignIn}} component={Login}  options={{headerShown: false}} />
            </>
            :
            <>
            <Stack.Screen initialParams = {{setIsSignIn}} name="MainContainer"  screenOptions={{gestureEnabled: false}} component={MainContainer}  options={{headerShown: false, ...navStyle, title:"Back"}} />
            <Stack.Screen name="ProductDetails" component={ProductDetails}  
              options={{ 
                title: '',  
                ...navStyle
                }}/>
            <Stack.Screen name="ListProducts" component={ListProducts}  
              options={{ 
                title: '',  
                ...navStyle,
                }}
                />

            <Stack.Screen name="CheckOut"  component={CheckOut}  options={{headerShown: false, ...navStyle}} />
            </>
          }
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNav