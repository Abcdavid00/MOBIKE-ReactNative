import {View, ScrollView, ViewStyle} from 'react-native';
import React from 'react';

type ContainerProps = React.ComponentProps<typeof ScrollView> & {
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
  ...restOfProp
}) => {
  return (
    <ScrollView
      style={styleScrollView}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      {...restOfProp}>
      <View style={styleWrapper}>{children}</View>
    </ScrollView>
  );
};

export default Container;
