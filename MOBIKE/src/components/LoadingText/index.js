import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';

const LoadingText = () => {
  const [loadingText, setLoadingText] = useState('On the way');
  useEffect(() => {
    setTimeout(() => {
      if (loadingText == 'On the way...') {
        setLoadingText('On the way');
      } else {
        setLoadingText(prevState => prevState + '.');
      }
    }, 1000);
  }, [loadingText]);
  return <Text style={{marginBottom: 15}}>{loadingText}</Text>;
};

export default LoadingText;
