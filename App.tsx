// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PreviewScreen from './screens/PreviewScreen';
import UploadScreen from './screens/UploadScreen';
import ComposeScreen from './screens/ComposeScreen';
import { View, StyleSheet, Text, ActivityIndicator  } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Font from 'expo-font';
// import AppNavigator from './AppNavigator'; // if you moved the nav logic out
import { useState, useEffect } from 'react';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Handwriting: require('./assets/fonts/Corynewfont.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 20 }}>Loading handwriting font...</Text>
      </View>
    );
  }
  return (
    <NavigationContainer>
    <Tab.Navigator initialRouteName="Upload">
      <Tab.Screen name="Upload" component={UploadScreen} />
      <Tab.Screen name="Compose" component={ComposeScreen} />
      <Tab.Screen name="Preview" component={PreviewScreen} />
    </Tab.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
