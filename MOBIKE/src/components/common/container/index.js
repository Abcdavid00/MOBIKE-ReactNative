import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import styles from './styles';

const Container = ({
  styleWrapper,
  styleScrollView,
  keyboardShouldPersistTaps,
  children,
}) => {
  return (
    <ScrollView
      style={styleScrollView}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.wrapper, styleWrapper]}>{children}</View>
    </ScrollView>
  );
};

export default Container;
