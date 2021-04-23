import React,{useContext} from 'react';
import {Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Main from '~/Screen/Main';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const MainScreenTab = () => {
    return (
        <Stack.Navigator headerMode='none'>
            <Stack.Screen name='mainScreen' component={Main}/>
        </Stack.Navigator>
    )
}


const MainNavigatorTab = () => {
    return (
        <BottomTab.Navigator
            tabBarOptions={{showLabel:false}}>
            <BottomTab.Screen 
                name='MainScreenTab'            
                component={MainScreenTab}                  
            />
        </BottomTab.Navigator>
    )
}

const Navigator = () => {
    return (
        <NavigationContainer>
            <MainNavigatorTab />
        </NavigationContainer>
    );
}


export default Navigator;
