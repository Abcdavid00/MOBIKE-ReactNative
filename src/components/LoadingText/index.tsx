import {Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTheme} from '@react-navigation/native';
import {POPPINS_REGULAR} from '../../assets/fonts';

type LoadingTextProps = {
  text: string;
};

const LoadingText: React.FC<LoadingTextProps> = ({text}) => {
  const [loadingText, setLoadingText] = useState(text);
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
        color: 'black',
        fontFamily: POPPINS_REGULAR,
        fontSize: 14,
      }}>
      {' '}
      {loadingText}
    </Text>
  );
};

export default LoadingText;
