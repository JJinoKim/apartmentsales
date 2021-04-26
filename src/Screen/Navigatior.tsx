import React,{useContext} from 'react';
import {Image,useColorScheme } from 'react-native';
import {NavigationContainer,DefaultTheme,DarkTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Main from '~/Screen/Main';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

const MainScreenTab = () => {
    return (
        <Stack.Navigator headerMode='none' >
            <Stack.Screen name='mainScreen' component={Main}  />
        </Stack.Navigator>
    )
}

const MyTheme = {
    dark: false,
    colors: {
      primary: 'rgb(255, 45, 85)',
      background: 'rgb(242, 242, 242)',
      card: 'rgb(255, 255, 255)',
      text: 'rgb(28, 28, 30)',
      border: 'rgb(199, 199, 204)',
      notification: 'rgb(255, 69, 58)',
    },
  };

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
    const scheme = useColorScheme();
    return (
        <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
            <MainNavigatorTab />
        </NavigationContainer>
    );
}


export default Navigator;
