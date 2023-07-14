/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {StatusBar, LogBox, StyleSheet, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import AppNavContainer from './src/navigations';
import {getThemeState} from './src/services/ThemeStorage';
import {useDispatch, useSelector} from 'react-redux';
import {ThemeState, setTheme} from './src/redux/slice/themeSlice';
import {
  MD3LightTheme as DefaultTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import store, {RootState} from './src/redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TokenStorage from './src/services/TokenStorage';
import ChatDrawer from './src/services/ChatDrawer';
import ClientDatabase from './src/services/ClientDatabase';
import {setLoading} from './src/redux/slice/loadingSlice';
import HttpRequest from './src/backendAPI/HttpRequest';
import {sendMessage} from './src/services/ChatDrawer';
import {getThemeColor} from './src/utils/getThemeColor';
import {CreateRoom} from './src/backendAPI';

LogBox.ignoreAllLogs();

const theme_light = {
  ...DefaultTheme,
  colors: {
    primary: '#90B4D3',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(203, 230, 255)',
    onPrimaryContainer: 'rgb(0, 30, 48)',
    secondary: 'rgb(80, 96, 111)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(211, 228, 246)',
    onSecondaryContainer: 'rgb(12, 29, 41)',
    tertiary: 'rgb(101, 88, 123)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(235, 220, 255)',
    onTertiaryContainer: 'rgb(33, 22, 52)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(252, 252, 255)',
    onBackground: 'rgb(26, 28, 30)',
    surface: 'rgb(252, 252, 255)',
    onSurface: 'rgb(26, 28, 30)',
    surfaceVariant: 'rgb(221, 227, 234)',
    onSurfaceVariant: 'rgb(65, 71, 77)',
    outline: 'rgb(114, 120, 126)',
    outlineVariant: 'rgb(193, 199, 206)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(46, 49, 51)',
    inverseOnSurface: 'rgb(240, 240, 243)',
    inversePrimary: 'rgb(142, 205, 255)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(239, 244, 250)',
      level2: 'rgb(232, 240, 246)',
      level3: 'rgb(224, 235, 243)',
      level4: 'rgb(222, 234, 242)',
      level5: 'rgb(217, 231, 240)',
    },
    surfaceDisabled: 'rgba(26, 28, 30, 0.12)',
    onSurfaceDisabled: 'rgba(26, 28, 30, 0.38)',
    backdrop: 'rgba(43, 49, 55, 0.4)',
  },
};

const theme_dark = {
  ...DefaultTheme,
  colors: {
    primary: 'rgb(142, 205, 255)',
    onPrimary: 'rgb(0, 52, 79)',
    primaryContainer: 'rgb(0, 75, 113)',
    onPrimaryContainer: 'rgb(203, 230, 255)',
    secondary: 'rgb(184, 200, 217)',
    onSecondary: 'rgb(34, 50, 63)',
    secondaryContainer: 'rgb(57, 73, 86)',
    onSecondaryContainer: 'rgb(211, 228, 246)',
    tertiary: 'rgb(208, 192, 232)',
    onTertiary: 'rgb(54, 43, 74)',
    tertiaryContainer: 'rgb(77, 65, 98)',
    onTertiaryContainer: 'rgb(235, 220, 255)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(26, 28, 30)',
    onBackground: 'rgb(226, 226, 229)',
    surface: 'rgb(26, 28, 30)',
    onSurface: 'rgb(226, 226, 229)',
    surfaceVariant: 'rgb(65, 71, 77)',
    onSurfaceVariant: 'rgb(193, 199, 206)',
    outline: 'rgb(139, 145, 152)',
    outlineVariant: 'rgb(65, 71, 77)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(226, 226, 229)',
    inverseOnSurface: 'rgb(46, 49, 51)',
    inversePrimary: 'rgb(0, 100, 148)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(32, 37, 41)',
      level2: 'rgb(35, 42, 48)',
      level3: 'rgb(39, 48, 55)',
      level4: 'rgb(40, 49, 57)',
      level5: 'rgb(42, 53, 62)',
    },
    surfaceDisabled: 'rgba(226, 226, 229, 0.12)',
    onSurfaceDisabled: 'rgba(226, 226, 229, 0.38)',
    backdrop: 'rgba(43, 49, 55, 0.4)',
  },
};

function App(): JSX.Element {
  useEffect(() => {
    console.log('Main');

    const sandbox = async () => {
      try {
        // let r = CreateRoom(2, [6, 152]);
        // let r = await HttpRequest.PostRequest('/chat/room/create', {postId: 2, users: [6, 152]});
        // let r = await CreateRoom(2, [6, 152]);
        // console.log('Sandbox: ', JSON.stringify(r));
        // setTimeout(() => {
        //   console.log('Sending message')
        //   sendMessage("649214af6b1d361ba85359f1", "Hello World")
        // }, 10000)
        // Count to 10 every minutes and send message
        // const countOrSend = (current) => {
        //   if (current <= 0) {
        //     console.log('Creating Room');
        // const room = await CreateRoom(1, [6, 142]);
        // console.log('Create room: ' + JSON.stringify(room));
        //     return;
        //   }
        //   console.log('Waiting before send message: ' + current);
        //   setTimeout(() => {
        //     countOrSend(current - 1);
        //   }, 1000)
        // }
        // countOrSend(10);
        // sendMessage("6495bf4a2f559fe339e2b8b2", "Hi Hi")
        // const messages = store.getState().message;
        // console.log("Messages: " + JSON.stringify(messages));
      } catch (error) {
        console.log('Sandbox error: ' + error);
      }
    };

    const Init = async () => {
      // await AsyncStorage.clear();
      await TokenStorage.init();
      await ClientDatabase.init();
      await ChatDrawer.init();
      // TokenStorage.print();
      // ClientDatabase.print();
      dispatch(setLoading(false));
      sandbox();
    };

    Init();
  }, []);

  useEffect(() => {
    const getThemeFromAsyncStorage = async () => {
      const theme = await getThemeState();
      if (theme) {
        dispatch(setTheme(theme == 'light' ? 'light' : 'dark'));
      }
    };
    getThemeFromAsyncStorage();
  }, []);

  const dispatch = useDispatch();

  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const color = getThemeColor(theme);

  return (
    <PaperProvider theme={theme == 'light' ? theme_light : theme_dark}>
      <StatusBar
        backgroundColor={color.background}
        barStyle={theme == 'light' ? 'dark-content' : 'light-content'}
      />
      <AppNavContainer />
    </PaperProvider>
  );
}

export default App;
