import {DarkTheme, DefaultTheme, ExtendedTheme} from '@react-navigation/native';

const colors: ColorProps = {
  primary: '#90B4D3',
  secondary: '#C0DAF1',
  text: '#3B8AD3',
  textRed: '#BC2424',
  accent: '#3BB4D1',
  danger: '#f72585',
  succes: '#4cc9f0',
  grey: '#adb5bd',
  white: '#ffffff',
  black: '#000000',

  background: '#E9EDF0',
  boldText: '#3C3C3C',
  normalText: '#686868',
  lightText: '#646E82',

  lightTheme: {
    background: '#E9EDF0',
    onBackground: '#3C3C3C',
    onBackground_light: '#686868',
    onBackground_disabled: '#646E8255',

    background_bottomNav: '#EDF8FF',
    onUnselectd: '#747474',

    divider: '#d8d8d8',

    surface: '#fff',
    onSurface: '#3C3C3C',

    primary: '#90B4D3',
    onPrimary: '#FFFFFF',
    secondary: '#C0DAF1',
    onSecondary: '#686868',

    error: '#BA1A1A',
    onError: '#FFFFFF',

    text: '#3B8AD3',

    popupError: '#FF6C68',
    popupWarning: '#FECA6E',
    popupSuccess: '#56EFC5',
  },

  darkTheme: {
    background: '#2C3036',
    onBackground: '#FFFFFFDE',
    onBackground_light: '#FFFFFF99',
    onBackground_disabled: '#FFFFFF61',

    background_bottomNav: '#3d4146',
    onUnselectd: '#777A7D',

    divider: '#4b4b4b',

    surface: '#2C3036',
    onSurface: '#fff',

    primary: '#BFDCEF',
    onPrimary: '#4b4b4b',
    secondary: '#C0DAF1',
    onSecondary: '#686868',

    error: '#FFB4AB',
    onError: '#690005',

    text: '#48A7FF',

    popupError: '#FF6C68',
    popupWarning: '#FECA6E',
    popupSuccess: '#56EFC5',
  },
};

export type ColorProps = {
  primary: string;
  secondary: string;
  text: string;
  textRed: string;
  accent: string;
  danger: string;
  succes: string;
  grey: string;
  white: string;
  background: string;
  boldText: string;
  normalText: string;
  lightText: string;
  black: string;
  lightTheme: ColorThemeProps;
  darkTheme: ColorThemeProps;
};

export type ColorThemeProps = {
  background: string;
  onBackground: string;
  onBackground_light: string;
  onBackground_disabled: string;
  background_bottomNav: string;
  onUnselectd: string;

  divider: string;

  surface: string;
  onSurface: string;

  primary: string;
  onPrimary: string;
  secondary: string;
  onSecondary: string;

  error: string;
  onError: string;

  text: string;

  popupError: string;
  popupWarning: string;
  popupSuccess: string;
};

export const MyLightTheme: ExtendedTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.lightTheme.background,
    customColors: {
      ...colors.lightTheme,
    },
  },
};

export const MyDarkTheme: ExtendedTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.darkTheme.background,
    customColors: {
      ...colors.darkTheme,
    },
  },
};

export default colors;
