import colors from '../../assets/theme/colors';
import {ThemeState} from '../../redux/slice/themeSlice';

export const getThemeColor = (theme: ThemeState) => {
  if (theme == 'light') return colors.lightTheme;
  else return colors.darkTheme;
};
