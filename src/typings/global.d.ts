import '@react-navigation/native';
import {ColorThemeProps} from '../assets/theme/colors';

// Override the theme in react native navigation to accept custom theme props.
declare module '@react-navigation/native' {
  export type ExtendedTheme = {
    dark: boolean;
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      border: string;
      notification: string;
      customColors: ColorThemeProps;
    };
  };
  export function useTheme(): ExtendedTheme;
}
