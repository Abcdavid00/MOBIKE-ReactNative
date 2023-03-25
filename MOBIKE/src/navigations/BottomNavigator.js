import {View, Text} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  MARKETPLACE,
  MARKETPLACE_NAVIGATOR,
  NOTIFICATIONS,
  PROFILE,
  PROFILE_NAVIGATOR,
  YOU,
  YOUR_POSTS_NAVIGATOR,
} from '../constants/routeNames';
import Marketplace from '../screens/Marketplace';
import Notifications from '../screens/Notifications';
import Profile from '../screens/Profile';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderSearch from '../components/HeaderSearch';
import MarketplaceNavigator from './MarketplaceNavigator';
import YourPostsNavigator from './YourPostsNavigator';
import ProfileNavigator from './ProfileNavigator';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === MARKETPLACE_NAVIGATOR) {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === YOUR_POSTS_NAVIGATOR) {
            iconName = focused ? 'browsers-outline' : 'browsers-outline';
          } else if (route.name === NOTIFICATIONS) {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (route.name === PROFILE_NAVIGATOR) {
            iconName = focused ? 'person' : 'person-outline';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#384653',
        tabBarInactiveTintColor: '#8D8D8D',
        tabBarItemStyle: {marginBottom: 10},
        tabBarIconStyle: {marginBottom: -5},
        tabBarLabelStyle: {fontSize: 12},
        tabBarStyle: {backgroundColor: '#EDF8FF', height: 56},
        tabBarHideOnKeyboard: true,
        tabBarActiveBackgroundColor: '#EDF8FF',
        tabBarInactiveBackgroundColor: '#EDF8FF',
        headerShown: false,
      })}>
      <Tab.Screen
        name={MARKETPLACE_NAVIGATOR}
        component={MarketplaceNavigator}
        options={{tabBarLabel: 'Marketplace'}}
      />
      <Tab.Screen
        name={YOUR_POSTS_NAVIGATOR}
        component={YourPostsNavigator}
        options={{tabBarLabel: 'Your posts'}}
      />
      {/* <Tab.Screen
        name={NOTIFICATIONS}
        component={Notifications}
        options={{tabBarLabel: 'Notifications'}}
      /> */}
      <Tab.Screen
        name={PROFILE_NAVIGATOR}
        component={ProfileNavigator}
        options={{tabBarLabel: 'Profile'}}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
