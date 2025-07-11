import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/SplashScreen';
import WelcomeScreen1 from './src/WelcomeScreen1';
import WelcomeScreen2 from './src/WelcomeScreen2';
import WelcomeScreen3 from './src/WelcomeScreen3';
import LiveLocationMap from './src/LiveLocationMap';

import ManualLocation from './src/ManualLocation';
import WelcomeScreen4 from './src/WelcomeScreen4';
import SelectedLocation from './src/SelectedLocation';


import Screen4 from './src/Screen4';
import Screen5 from './src/Screen5';


import Screen1 from './src/Screen1';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="WelcomeScreen1" component={WelcomeScreen1} />
        <Stack.Screen name="WelcomeScreen2" component={WelcomeScreen2} />
        <Stack.Screen name="WelcomeScreen3" component={WelcomeScreen3} />
        <Stack.Screen name="LiveLocationMap" component={LiveLocationMap} />

        <Stack.Screen name="LocationSearch" component={ManualLocation} />
        <Stack.Screen name="WelcomeScreen4" component={WelcomeScreen4} />
        <Stack.Screen name="SelectedLocation" component={SelectedLocation} />

        
        <Stack.Screen name="Screen4" component={Screen4} />
        <Stack.Screen name="Screen5" component={Screen5} />



        <Stack.Screen name="Screen1" component={Screen1} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
