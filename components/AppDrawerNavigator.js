import * as React from 'react';
import {Text,View,TouchableOpacity} from 'react-native';
import {createDrawerNavigator} from 'react-navigation-drawer';
import CustomSideBarMenu from '../components/CustomSideBarMenu';
import AppTabNavigator from '../components/AppTabNavigator';
import firebase from 'firebase';

export const AppDrawerNavigator=createDrawerNavigator({
    Home:{
        screen:AppTabNavigator
    },
    Setting:{
        screen:SettingScreen
    },

},
{contentComponent:CustomSideBarMenu},
{initialRouteName:'Home'}
)