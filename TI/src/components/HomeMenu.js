import React from 'react';
import { createBottomTabNavigator } from 'export-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Home from '../screens/Home';
import Perfil from '../screens/Perfil';
import CrearPosteo from '../screens/CrearPosteo';

const Tab = createBottomTabNavigation();

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
                component={NewPost} 
                options={{ tabBarIcon: () => <FontAwesome name="plus-square" size={24} color="black" /> }}
            />
            
            <Tab.Screen 
                name="Profile" 
                component={Profile} 
                options={{ tabBarIcon: () => <FontAwesome name="user" size={24} color="black" /> }}
            />

        </Tab.Navigator>
    );
}