import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Grid from './app/components/Grid';
import StackNav from './StackNav';

export default function App() {
  var data = [
    {id: 1, src: require("./app/assets/groceries/fruit_and_vegetable.png"), title: "Frash Fruits & Vegetable", color : "53B175", r: 83, g: 177, b: 177, a:0.1},
    {id: 2, src: require("./app/assets/groceries/fruit_and_vegetable.png"), title: "Frash Fruits & Vegetable", color : "53B175", r: 83, g: 177, b: 177, a:0.1},
    {id: 3, src: require("./app/assets/groceries/fruit_and_vegetable.png"), title: "Frash Fruits & Vegetable", color : "53B175", r: 83, g: 177, b: 177, a:0.1},
    {id: 4, src: require("./app/assets/groceries/fruit_and_vegetable.png"), title: "Frash Fruits & Vegetable", color : "53B175", r: 83, g: 177, b: 177, a:0.1},
  ]


  console.log("App component")
  return (
// <WelcomeScreen />
    //<MainContainer />
  // <SafeAreaView>
  //   <ScrollView>
      
      
  //   </ScrollView>
  //  </SafeAreaView>
  <StackNav />
  // <MainContainer />

  //<Grid data = {data} type='grocery' />
  );
}

const styles = StyleSheet.create({
});
