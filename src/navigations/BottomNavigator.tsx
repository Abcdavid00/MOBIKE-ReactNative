import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  CHAT_NAVIGATOR,
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
import {POPPINS_REGULAR} from '../assets/fonts';
import {getFontSize} from '../utils/fontSizeResponsive';
import {StyleSheet} from 'react-native';
import ChatNavigator from './ChatNavigator';
import {useTheme} from '@react-navigation/native';

export type BottomTabParamsList = {
  [MARKETPLACE_NAVIGATOR]: undefined;
  [YOUR_POSTS_NAVIGATOR]: undefined;
  [CHAT_NAVIGATOR]: undefined;
  [PROFILE_NAVIGATOR]: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamsList>();

const BottomNavigator = () => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const color = useTheme().colors.customColors;
  useEffect(() => {
    console.log('Render Bottom Tab');
  }, [theme]);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName: string = '';

          if (route.name === MARKETPLACE_NAVIGATOR) {
            iconName = focused ? 'cart' : 'cart-outline';
          } else if (route.name === YOUR_POSTS_NAVIGATOR) {
            iconName = focused ? 'browsers' : 'browsers-outline';
          } else if (route.name === CHAT_NAVIGATOR) {
            iconName = focused ? 'chatbox' : 'chatbox-outline';
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
                    ? colors.lightTheme.primary
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
                    ? colors.lightTheme.onUnselectd
                    : colors.darkTheme.onUnselectd
                }
              />
            );
        },
        tabBarActiveTintColor:
          theme == 'light' ? color.text : color.onBackground,
        tabBarInactiveTintColor: color.onUnselectd,
        tabBarItemStyle: {marginBottom: 4},
        tabBarIconStyle: {marginBottom: -8},
        tabBarLabelStyle: {fontSize: 12},
        tabBarStyle: {
          backgroundColor: color.background_bottomNav,
          height: 56,
        },
        tabBarHideOnKeyboard: true,
        headerShown: false,
      })}>
      <Tab.Screen
        name={MARKETPLACE_NAVIGATOR}
        component={MarketplaceNavigator}
        options={{
          tabBarLabel: 'Marketplace',
          tabBarLabelStyle: styles.styleLabel,
        }}
      />
      <Tab.Screen
        name={YOUR_POSTS_NAVIGATOR}
        component={YourPostsNavigator}
        options={{
          tabBarLabel: 'Your posts',
          tabBarLabelStyle: styles.styleLabel,
        }}
      />
      <Tab.Screen
        name={CHAT_NAVIGATOR}
        component={ChatNavigator}
        options={{tabBarLabel: 'Chat', tabBarLabelStyle: styles.styleLabel}}
      />
      <Tab.Screen
        name={PROFILE_NAVIGATOR}
        component={ProfileNavigator}
        options={{tabBarLabel: 'Profile', tabBarLabelStyle: styles.styleLabel}}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({
  styleLabel: {
    fontFamily: POPPINS_REGULAR,
    fontSize: getFontSize(12),
  },
});
