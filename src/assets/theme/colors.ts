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

    surface: '#E9EDF0',
    onSurface: '#3C3C3C',

    primary: '#90B4D3',
    onPrimary: '#3C3C3C',
    secondary: '#C0DAF1',
    onSecondary: '#212121',

    error: '#BA1A1A',
    onError: '#FFFFFF',

    text: '#3B8AD3',
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
    onPrimary: '#fff',
    secondary: '#C0DAF1',
    onSecondary: '#fff',

    error: '#FFB4AB',
    onError: '#690005',

    text: '#48A7FF',
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
};

export default colors;
//BEFORE

// export default {
//   primary: '#90B4D3',
//   secondary: '#C0DAF1',
//   text: '#3B8AD3',
//   textRed: '#BC2424',
//   accent: '#3BB4D1',
//   danger: '#f72585',
//   succes: '#4cc9f0',
//   grey: '#adb5bd',
//   white: '#ffffff',

//   background: '#E9EDF0',
//   boldText: '#3C3C3C',
//   normalText: '#686868',
//   lightText: '#646E82',

//   lightTheme: {
//     background: '#E9EDF0',
//     onBackground: '#3C3C3C',
//     onBackground_light: '#686868',
//     onBackground_disabled: '#646E8255',

//     background_bottomNav: '#EDF8FF',
//     onUnselectd: '#747474',

//     divider: '#d8d8d8',

//     surface: '#E9EDF0',
//     onSurface: '#3C3C3C',

//     primary: '#90B4D3',
//     onPrimary: '#3C3C3C',
//     secondary: '#C0DAF1',
//     onSecondary: '##212121',

//     error: '#BA1A1A',
//     onError: '#FFFFFF',
//   },

//   darkTheme: {
//     background: '#2C3036',
//     onBackground: '#FFFFFFDE',
//     onBackground_light: '#FFFFFF99',
//     onBackground_disabled: '#FFFFFF61',

//     background_bottomNav: '##3d4146',
//     onUnselectd: '#777A7D',

//     divider: '#4b4b4b',

//     surface: '#2C3036',
//     onSurface: '#fff',

//     primary: '#BFDCEF',
//     onPrimary: '#fff',
//     secondary: '#C0DAF1',
//     onSecondary: '#fff',

//     error: '#FFB4AB',
//     onError: '#690005',
//   },
// };
