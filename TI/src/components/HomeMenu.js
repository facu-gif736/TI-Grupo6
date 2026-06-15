import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Home from '../screens/Home';
import Perfil from '../screens/Perfil';
import CrearPosteo from '../screens/CrearPosteo';

const Tab = createBottomTabNavigator();

export default function HomeMenu() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            
            <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{ tabBarIcon: () => <FontAwesome name="home" size={24} color="black" /> }}
            />
            
            <Tab.Screen 
                name="NewPost" 
                component={CrearPosteo} 
                options={{ tabBarIcon: () => <FontAwesome name="plus-square" size={24} color="black" /> }}
            />
            
            <Tab.Screen 
                name="Profile" 
                component={Perfil} 
                options={{ tabBarIcon: () => <FontAwesome name="user" size={24} color="black" /> }}
            />

        </Tab.Navigator>
    );
}