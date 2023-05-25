import {View, ScrollView, ViewStyle} from 'react-native';
import React from 'react';

type ContainerProps = {
  styleWrapper?: ViewStyle;
  styleScrollView?: ViewStyle;
  keyboardShouldPersistTaps?: 'always' | 'never' | 'handled';
  children: React.ReactNode;
};

const Container: React.FC<ContainerProps> = ({
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
      <View style={styleWrapper}>{children}</View>
    </ScrollView>
  );
};

export default Container;
