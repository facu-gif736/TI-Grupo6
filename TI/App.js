import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import Registro from './src/screens/Registro';
import MainTab from './src/components/HomeMenu';

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        
        <Stack.Screen name="MainTab" component={MainTab} options={{ headerShown: false }} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}