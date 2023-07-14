import {Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {POPPINS_REGULAR} from '../../assets/fonts';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {ThemeState} from '../../redux/slice/themeSlice';
import colors from '../../assets/theme/colors';

type LoadingTextProps = {
  text: string;
};

const LoadingText: React.FC<LoadingTextProps> = ({text}) => {
  const [loadingText, setLoadingText] = useState(text);
  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const color = theme == 'light' ? colors.lightTheme : colors.darkTheme;
  useEffect(() => {
    setTimeout(() => {
      if (loadingText == text + '...') {
        setLoadingText(text);
      } else {
        setLoadingText(prevState => prevState + '.');
      }
    }, 1000);
  }, [loadingText]);
  return (
    <Text
      style={{
        marginBottom: 15,
        color: color.onBackground,
        fontFamily: POPPINS_REGULAR,
        fontSize: 14,
        textAlign: 'center',
      }}>
      {' '}
      {loadingText}
    </Text>
  );
};

export default LoadingText;
