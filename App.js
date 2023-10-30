import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Grid from './app/components/Grid';
import StackNav from './StackNav';
import Toast from 'react-native-toast-message';
import { Image } from 'react-native';
import Login from './app/screens/Login';
import { LogBox } from 'react-native';

export default function App() {

  LogBox.ignoreLogs(['Warning: ...']);
  LogBox.ignoreAllLogs()
  
  const toastConfig = {
    AddToCartSuccess: (props)=>{
      return (
        <View style={{ height: 100, marginTop: 20, borderLeftWidth: 5, borderColor: "#F3603F", width: '100%', backgroundColor: '#53B175', display: 'flex', justifyContent: "flex-start", flexDirection: "row", alignItems: 'center', flex: 1 }}>
          <View style={{flex: 0.2, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Image style={{width: 28, height: 32}} source={require("./app/assets/imgs/carrot.png")} />
          </View>
          <View style={{flex: 0.8}}>
            <View>
              <Text style={{color: 'white', fontWeight: "bold", fontSize: 20}}>{props.text1}</Text>
            </View>

            <View>
              <Text style={{color: 'white'}}>{props.text2}</Text>
            </View>
          </View>

        </View>
      )
    }
  }
  

  return (
// <WelcomeScreen />
    //<MainContainer />
  // <SafeAreaView>
  //   <ScrollView>
      
      
  //   </ScrollView>
  //  </SafeAreaView>



  <>
    <StackNav />
    <Toast config={toastConfig} />
  </>



  // <MainContainer />

  //<Grid data = {data} type='grocery' />
  );
}

const styles = StyleSheet.create({
});
