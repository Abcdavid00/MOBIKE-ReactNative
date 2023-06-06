import {Pressable, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../redux/store';
import {ThemeState} from '../../../redux/slice/themeSlice';
import colors from '../../../assets/theme/colors';
import {Shadow} from 'react-native-shadow-2';
import {POPPINS_SEMI_BOLD} from '../../../assets/fonts';

type ShadowWrapperProp = {
  children: React.ReactNode;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  onPress?: () => void;
};

const ShadowWrapper: React.FC<ShadowWrapperProp> = ({
  children,
  style,
  contentStyle,
  onPress,
}) => {
  const theme = useSelector<RootState, ThemeState>(state => state.theme);
  const color = theme == 'light' ? colors.lightTheme : colors.darkTheme;

  const _renderContent = () => (
    <View
      style={[
        {
          width: 100,
          height: 100,
          borderRadius: 16,
          backgroundColor: color.background,
          borderColor: theme == 'light' ? '#FEFEFF' : color.background,
          borderWidth: 0.5,
        },
        style,
      ]}
    />
  );
  if (theme == 'light') {
    return (
      <Pressable
        style={[{justifyContent: 'center', alignItems: 'center'}, style]}
        onPress={onPress}>
        <Shadow distance={10} startColor={'#A6B4C84D'} offset={[10, 10]}>
          {_renderContent()}
        </Shadow>
        <Shadow
          distance={20}
          startColor={'#FFFFFF66'}
          offset={[-12, -12]}
          containerStyle={{position: 'absolute'}}>
          {_renderContent()}
        </Shadow>
        <View
          style={[
            {position: 'absolute', width: '100%', height: '100%'},
            contentStyle,
          ]}>
          {children}
        </View>
      </Pressable>
    );
  } else {
    return (
      <Pressable
        style={[{justifyContent: 'center', alignItems: 'center'}, style]}
        onPress={onPress}>
        <Shadow distance={10} startColor={'#1F2427AA'} offset={[7, 7]}>
          {_renderContent()}
        </Shadow>
        <Shadow
          distance={10}
          startColor={'#48505777'}
          offset={[-4, -4]}
          containerStyle={{position: 'absolute'}}>
          {_renderContent()}
        </Shadow>
        <View
          style={[
            {position: 'absolute', width: '100%', height: '100%'},
            contentStyle,
          ]}>
          {children}
        </View>
      </Pressable>
    );
  }
};

export default ShadowWrapper;

const styles = StyleSheet.create({
  text: {
    position: 'absolute',
    fontSize: 16,
    fontFamily: POPPINS_SEMI_BOLD,
  },
});
