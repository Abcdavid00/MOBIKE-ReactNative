import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  MARKETPLACE_NAVIGATOR,
  NOTIFICATIONS,
  PROFILE_NAVIGATOR,
  YOUR_POSTS_NAVIGATOR,
} from '../constants/routeNames';
import Icon from 'react-native-vector-icons/Ionicons';
import MarketplaceNavigator from './MarketplaceNavigator';
import YourPostsNavigator from './YourPostsNavigator';
import ProfileNavigator from './ProfileNavigator';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {ThemeState} from '../redux/slice/themeSlice';
import colors from '../assets/theme/colors';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const color = theme == 'light' ? colors.lightTheme : colors.darkTheme;
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
          if (focused) {
            return (
              <Icon
                name={iconName}
                size={size}
                color={
                  theme == 'light'
                    ? colors.lightTheme.onBackground
                    : colors.darkTheme.onBackground
                }
              />
            );
          } else
            return (
              <Icon
                name={iconName}
                size={size}
                color={
                  theme == 'light'
                    ? colors.lightTheme.onBackground_light
                    : colors.darkTheme.onBackground_light
                }
              />
            );
        },
        tabBarActiveTintColor: color.onBackground,
        tabBarInactiveTintColor: color.onBackground_light,
        tabBarItemStyle: {marginBottom: 10},
        tabBarIconStyle: {marginBottom: -5},
        tabBarLabelStyle: {fontSize: 12},
        tabBarStyle: {
          backgroundColor:
            theme == 'light' ? color.background_bottomNav : '#3d4146',
          height: 56,
        },
        tabBarHideOnKeyboard: true,
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
