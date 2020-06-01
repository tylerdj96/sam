import {createDrawerNavigator, createStackNavigator, DrawerActions, createMaterialTopTabNavigator} from 'react-navigation'
import React from 'react';
import { StyleSheet, Text, View, Button, Image, Picker, TouchableOpacity, Icon } from 'react-native';

import HomeScreen from '../screens/homeScreen.js'
import characterDetailScreen from '../screens/characterDetailScreen.js'
import talentScreen from '../screens/talentScreen.js'
import achievementScreen from '../screens/achievementScreen.js'

//Drawers for Char->Other
import mountGridScreen from '../screens/mountGridScreen.js'
import mountScreen from '../screens/mountScreen.js'

//Tab navigators
import {twosTabC, threesTabC, rbgTabC} from '../screens/pvpDetailsTabs.js'

export const pvpTabs = createMaterialTopTabNavigator({
    '2v2': {
        screen: twosTabC
    },  
    '3v3': {
        screen: threesTabC
    },
    RBG: {
        screen: rbgTabC
    }},
    {
        initialRouteName: '2v2',
        tabBarPosition: 'bottom'
    }
);

export const Drawer = createDrawerNavigator({
    Character: {
        screen: characterDetailScreen,
    },
    PvP: {
        screen: pvpTabs
    },
    Mounts: {
        screen: mountScreen
    },
    Talents: {
        screen: talentScreen
    },
    Achievements: {
        screen: achievementScreen
    },
    MountGrid: {
        screen: mountGridScreen
    },
    },
{
    initialRouteName: 'Character',
    drawerPosition: 'right'
    }

);



export const Stack = createStackNavigator({
        Home: {
            screen: HomeScreen
        },
        Drawer: {
            screen : Drawer,
        },
    },
    {
        initialRouteName: 'Home',
        navigationOptions:{header: null}

        }
        );


