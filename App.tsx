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
import { useState, useEffect } from 'react';
import { Icon } from './components/Icons';
import { useAppTheme, useThemeProvider } from './utils/useAppTheme';
import { FlutterProvider } from './context/FlutterContext';
import { observer } from 'mobx-react';
import fontUploadScreen from './screens/fontUploadScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = observer(function TabNavigator() {
  const { theme } = useAppTheme();

  return (
    <Tab.Navigator initialRouteName="Upload">
      <Tab.Screen 
        name="Upload" 
        component={UploadScreen} 
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Icon 
              icon="dollar" 
              color={focused ? theme.colors.tint : theme.colors.tintInactive} 
              size={30} 
            />
          ),
        }} 
      />
      <Tab.Screen 
        name="FontUpload" 
        component={fontUploadScreen} 
        options={{ 
          tabBarIcon: ({ focused }) => (
            <Icon 
              icon="check" 
              color={focused ? theme.colors.tint : theme.colors.tintInactive} 
              size={30} 
            />
          ),
        }} 
      />
      
      <Tab.Screen 
        name="Compose" 
        component={ComposeScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon 
              icon="chatBubble" 
              color={focused ? theme.colors.tint : theme.colors.tintInactive} 
              size={30} 
            />
          ),
        }}
      />
      <Tab.Screen 
        name="Preview" 
        component={PreviewScreen} 
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon 
              icon="view" 
              color={focused ? theme.colors.tint : theme.colors.tintInactive} 
              size={30} 
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
});

export const AppNavigator = observer(function AppNavigator() {
  const { themeScheme, navigationTheme, setThemeContextOverride, ThemeProvider } = useThemeProvider();
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
    <ThemeProvider value={{ themeScheme, setThemeContextOverride }}>
      <FlutterProvider>
        <NavigationContainer theme={navigationTheme}>
          <TabNavigator />
        </NavigationContainer>
      </FlutterProvider>
    </ThemeProvider>
  );
});

export default function App() {
  return <AppNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
